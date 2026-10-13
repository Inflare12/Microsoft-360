# Microsoft-360

A free, independent, local-first productivity workspace. It is designed as an independent implementation, not a copy of Microsoft's proprietary source code.

## Included

### Core Office editors
- **Writer** — rich text, headings, lists, alignment, formatting, local autosave, DOCX import/export, text import and print/PDF workflow.
- **Sheets** — multiple worksheets, cell editing, formula bar, A1 references, arithmetic, `SUM()` ranges, rows/columns, XLSX/XLS/CSV import and XLSX export.
- **Slides** — multiple slides, add/delete/duplicate, title/body, notes, themes, presentation mode and PPTX export.

### Local productivity apps
The **More Apps** workspace is available from the floating button or `Ctrl+Shift+M` and adds browser-local implementations of the functionality that does not require a proprietary cloud service:

- Notes — notebooks, pages and autosave
- To Do — tasks, completion and due dates
- Calendar — local events and agenda
- Mail — compose messages and hand off through the installed mail provider
- People — contacts/address book
- Planner — Kanban plans with Todo/Doing/Done workflow
- Forms — form/question builder and local response storage
- Lists — searchable structured records with status, owner, due date and notes
- Whiteboard — pointer drawing, clear and PNG export
- Files — local file inventory
- Database — local structured records and query workspace
- Media — browser image/video/audio preview

### Built-in AI
- No account required
- Bring your own API key
- OpenAI-compatible APIs
- OpenRouter
- Google Gemini
- Anthropic
- Custom OpenAI-compatible endpoint
- User-selectable model
- Current document/workbook/slide context
- Draft, rewrite, summarize, explain, analyze and formula-generation workflows
- API configuration stored locally in the browser

### Platform
- Responsive UI
- Light/dark mode
- Browser-local persistence
- PWA metadata
- Offline service-worker shell
- No mandatory backend
- No mandatory login, signup or subscription

## Important architecture boundary
Microsoft 365 includes cloud services such as Exchange, OneDrive, SharePoint, Teams, Microsoft Graph and enterprise identity/security. Those services require network infrastructure and/or external providers; a browser-only offline application cannot reproduce the actual Microsoft-hosted service. Microsoft itself describes Microsoft 365 as a collection of applications and web/cloud services. The project therefore implements the functionality that can genuinely run locally and uses explicit provider hand-offs where an external service is inherently required.

## Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

The repository includes a GitHub Actions build workflow for `npm run build`.

## File compatibility

The project uses independently implemented libraries for common Office Open XML formats such as `.docx`, `.xlsx`, and `.pptx`. Compatibility is not guaranteed for every advanced Office feature.

## Security model

The no-login BYOK architecture means API keys are held by the user's browser and sent to the provider selected by the user. Users should not save sensitive API keys on shared or untrusted computers.

## License

See `LICENSE`.
