# Microsoft-360

A free, independent, local-first productivity workspace. It is designed as an independent implementation, not a copy of Microsoft's proprietary source code.

## Included

### Writer
- Rich text editing
- Headings, lists, alignment, bold/italic/underline/strike
- Local autosave
- DOCX import and export
- Plain-text import
- Browser print/PDF workflow

### Sheets
- Multiple worksheets
- Cell editing and selection
- Formula bar
- Cell references such as `A1`
- Basic arithmetic formulas
- `SUM(A1:A10)` ranges
- Add rows and columns
- XLSX/XLS/CSV import
- XLSX export
- Local autosave

### Slides
- Multiple slides
- Add, delete and duplicate slides
- Editable title/body
- Speaker notes
- Light/dark slide theme
- Presentation mode
- PPTX export
- Local autosave

### Built-in AI
- No account required
- Bring your own API key
- OpenAI-compatible APIs
- OpenRouter
- Google Gemini
- Anthropic
- Custom OpenAI-compatible endpoint
- User-selectable model
- Context from the current document, workbook or slide
- Draft, rewrite, summarize, explain, analyze and formula-generation workflows
- API configuration is stored locally in the browser

### Platform
- Responsive UI
- Light/dark mode
- Browser-local persistence
- Installable PWA metadata
- Offline service-worker shell
- No mandatory backend
- No mandatory login, signup or subscription

## Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

The repository includes a GitHub Actions build workflow for `npm run build`.

## File compatibility

The project uses independently implemented libraries for common Office Open XML formats such as `.docx`, `.xlsx`, and `.pptx`. Microsoft documents these XML-based formats as the standard formats used by Word, Excel and PowerPoint. Compatibility is not guaranteed for every advanced Office feature.

## Security model

The no-login BYOK architecture means API keys are held by the user's browser and sent to the provider selected by the user. This is intentionally different from a server-side secret-management architecture. Users should not save sensitive API keys on shared or untrusted computers.

## License

See `LICENSE`.
