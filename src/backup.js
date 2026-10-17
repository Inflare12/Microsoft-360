const button = document.createElement('button');
button.type = 'button';
button.textContent = 'Backup';
button.title = 'Export or restore all Microsoft-360 browser data';
button.setAttribute('aria-label', 'Backup and restore local Microsoft-360 data');
button.style.cssText = 'position:fixed;right:18px;bottom:18px;z-index:9999;border:0;border-radius:999px;padding:10px 14px;background:#315bea;color:#fff;font:600 13px system-ui,sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.22);cursor:pointer';

autoRefresh();
document.body.appendChild(button);
button.addEventListener('click', () => {
  const choice = window.prompt('Microsoft-360 Backup\n\nType EXPORT to save all local data, or IMPORT to restore a backup.');
  if (!choice) return;
  if (choice.trim().toLowerCase() === 'export') exportBackup();
  else if (choice.trim().toLowerCase() === 'import') importBackup();
  else window.alert('Please type EXPORT or IMPORT.');
});

function exportBackup() {
  const data = {};
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key) data[key] = localStorage.getItem(key);
  }
  const payload = {
    format: 'microsoft-360-local-backup-v1',
    created_at: new Date().toISOString(),
    origin: location.origin,
    local_storage: data
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `microsoft-360-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function importBackup() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    try {
      const payload = JSON.parse(await file.text());
      if (payload?.format !== 'microsoft-360-local-backup-v1' || !payload.local_storage || typeof payload.local_storage !== 'object') {
        throw new Error('Unsupported backup format.');
      }
      if (!window.confirm('Restore this backup? Existing Microsoft-360 browser data with the same keys will be replaced.')) return;
      Object.entries(payload.local_storage).forEach(([key, value]) => localStorage.setItem(key, String(value ?? '')));
      window.alert('Backup restored. Microsoft-360 will reload now.');
      location.reload();
    } catch (error) {
      window.alert(`Backup import failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  input.click();
}

function autoRefresh() {
  window.addEventListener('storage', () => {});
}
