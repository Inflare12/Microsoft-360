import { useEffect } from 'react';

const CORE: Record<string, string> = {
  word: 'Writer',
  excel: 'Sheets',
  powerpoint: 'Slides',
};

const HUB: Record<string, string> = {
  outlook: 'Mail',
  onenote: 'Notes',
  onedrive: 'Files',
  teams: 'Mail',
  loop: 'Notes',
  planner: 'Planner',
  todo: 'To Do',
  forms: 'Forms',
  lists: 'Lists',
  whiteboard: 'Whiteboard',
  clipchamp: 'Media',
  sway: 'Designer',
  visio: 'Diagram',
  project: 'Planner',
  access: 'Database',
  powerbi: 'Analytics',
  powerapps: 'Automation',
  automate: 'Automation',
  sharepoint: 'Files',
  designer: 'Designer',
  stream: 'Media',
  search: 'Dashboard',
  copilot: 'Dashboard',
  settings: 'Dashboard',
};

function clickText(text: string) {
  const buttons = [...document.querySelectorAll('button')];
  const button = buttons.find((element) => element.textContent?.trim() === text);
  button?.click();
}

export default function M365Bridge() {
  useEffect(() => {
    const open = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;

      if (CORE[id]) {
        clickText(CORE[id]);
        return;
      }

      const hub = document.querySelector('.wh-launch') as HTMLButtonElement | null;
      if (!hub) return;

      hub.click();
      const target = HUB[id] ?? 'Dashboard';
      window.setTimeout(() => clickText(target), 40);
    };

    window.addEventListener('m365:open-app', open);
    return () => window.removeEventListener('m365:open-app', open);
  }, []);

  return null;
}
