# Microsoft-360 — Full Productivity-Suite Parity Specification

> Goal: build an independent, free, local-first productivity platform that covers the practical capabilities users expect across the Microsoft 365 ecosystem. This is an implementation specification, not a claim that Microsoft source code, proprietary services, or trademarks are being copied.

## 1. Core document apps

### Writer
- Rich text editing, styles, themes, fonts, font sizes, colors, highlighting
- Paragraph spacing, indentation, tabs, borders, columns
- Bullets, numbering, multilevel lists
- Tables: insert/delete/resize, merge/split, formatting, formulas
- Images, captions, shapes, text boxes, hyperlinks
- Headers, footers, page numbers, sections, page breaks
- Footnotes/endnotes, citations, bibliography, cross references
- Table of contents, index, glossary
- Find/replace, navigation pane, word count
- Spellcheck, grammar, accessibility checks
- Track changes, comments, compare/merge documents
- Templates, mail merge, labels
- Equations, symbols, embedded objects
- Print layout, reading mode, print/PDF export
- DOCX/ODT/HTML/TXT import and export with preservation testing
- Autosave, undo/redo, version history
- Accessibility: keyboard navigation, screen-reader semantics, high contrast

### Sheets
- Full grid with arbitrary rows/columns
- Formula engine with dependency graph and recalculation
- Arithmetic, references, ranges, named ranges
- Logical, text, date/time, lookup, math, statistical and financial functions
- Array/dynamic-array formulas
- Relative/absolute/mixed references
- Tables, filters, sorting, grouping, freeze panes
- Conditional formatting and data validation
- Charts, sparklines, pivot tables, slicers
- Import/export XLSX/XLS/CSV/ODS
- Workbook/worksheet management, protection, print areas
- Comments/notes, hyperlinks, images and shapes
- What-if analysis, goal seek, scenarios
- Formula auditing and error tracing
- External data import/connectors through pluggable adapters
- Accessibility and keyboard navigation

### Slides
- Slide layouts, masters, themes, templates
- Text, images, shapes, icons, tables, charts, SmartArt-like diagrams
- Alignment, guides, grids, grouping, layering
- Transitions and animations with timeline model
- Speaker notes, comments, presenter view
- Hyperlinks/actions and navigation
- Audio/video embedding
- Crop, mask, image formatting
- Rehearse/presentation mode and fullscreen
- PPTX import/export
- PDF/images/video export through optional local renderer
- Accessibility metadata and reading order

## 2. Communication

### Mail
- Local mailbox abstraction
- IMAP/SMTP adapters
- Accounts, folders, labels, search, threading
- Compose, drafts, attachments, signatures
- HTML/plain-text mail
- Calendar invitations and ICS
- Rules, filters, categories, flags
- Contacts/address book
- Spam/reporting hooks
- Offline queue and sync conflict handling
- Encryption/TLS through provider connections

### Calendar
- Day/week/month/agenda views
- Events, recurring events, reminders
- Time zones, attendees, invitations
- Free/busy abstraction
- Shared calendars
- Tasks and meeting links
- ICS import/export

### Contacts / People
- Contacts, groups, organizations
- Import/export vCard/CSV
- Search and merge duplicates

## 3. Collaboration

### Teams-like workspace
- Organizations/workspaces
- Teams and channels
- Direct/group messaging
- Threads, reactions, mentions
- File attachments
- Presence
- Search
- Notifications
- Audio/video meeting adapter
- Screen sharing adapter
- Meeting notes, transcripts and action items
- Bots/agents via plugin API

### Shared documents
- Real-time collaboration protocol
- Presence/cursors
- Operational transform or CRDT document model
- Comments and mentions
- Permissions and share links
- Version history and restore

## 4. Cloud/file platform

### Drive
- File/folder browser
- Upload/download
- Drag-and-drop
- Rename/move/copy/delete
- Search and metadata
- Recent/starred/shared views
- Version history
- Trash/recovery
- Share links and permissions
- Local-first cache
- Pluggable S3-compatible storage adapter

### Sync engine
- Offline queue
- Conflict detection/resolution
- Resumable uploads/downloads
- Hash-based deduplication
- Background sync
- Selective sync

## 5. Notes and knowledge

### OneNote-like notes
- Notebooks, sections, pages
- Freeform blocks/canvas
- Text, images, drawings, attachments
- Tags and search
- Checklists
- Internal links
- PDF printouts/attachments

### Loop-like blocks
- Reusable collaborative components
- Tables, lists, task blocks, text blocks
- Cross-document references
- Real-time sync

## 6. Tasks and planning

### To-do
- Tasks/subtasks
- Lists/groups
- Recurrence
- Reminders/due dates
- Priority
- Attachments/notes
- Smart views

### Planner/project
- Boards, buckets, cards
- Assignees
- Dependencies
- Timeline/Gantt
- Milestones
- Progress and workload
- Calendar integration
- Templates
- Reports

### Forms
- Form builder
- Question types
- Validation/branching
- Quiz mode
- Themes
- Public/private sharing
- Response collection
- Charts/export

## 7. Data / business applications

### Lists
- Structured lists
- Column types
- Views, filters, sorting, grouping
- Rules and notifications
- Forms
- Import/export

### Database / Access-like
- Tables, relationships, indexes
- Query designer and SQL mode
- Forms and reports
- Validation
- Import/export
- Local SQLite backend adapter

### BI-like analytics
- Data model
- Query transformations
- Measures
- Dashboards
- Interactive charts
- Filters/slicers
- Import CSV/XLSX/JSON/SQL
- Export PDF/images

## 8. Automation / low-code

### Power Automate-like workflows
- Trigger/action graph
- Conditions
- Loops
- Variables
- HTTP/webhook actions
- Scheduled jobs
- File/document actions
- Email/calendar actions through adapters
- AI actions
- Retry/error handling
- Secrets management

### Power Apps-like builder
- Canvas UI builder
- Data sources
- Forms/tables
- Expressions
- Navigation
- Permissions
- Publish/export

## 9. Visual / media applications

### Whiteboard
- Infinite canvas
- Sticky notes
- Shapes
- Freehand pen
- Text
- Images
- Connectors
- Templates
- Multi-user collaboration

### Sway-like stories
- Story cards
- Responsive layouts
- Media embedding
- Themes
- Public/private publishing

### Clipchamp-like editor
- Media import
- Timeline
- Trim/split/crop
- Text and captions
- Audio tracks
- Transitions
- Filters
- Export presets
- Local rendering adapter

### Designer-like graphics
- Canvas
- Templates
- Layers
- Shapes/text/images
- Background removal through optional local AI
- Image generation through BYOK AI providers

## 10. Diagramming / engineering

### Visio-like diagrams
- Flowcharts
- Network diagrams
- Org charts
- UML
- ER diagrams
- BPMN-style diagrams
- Connectors
- Shapes library
- SVG/PDF/PNG export

## 11. Search / AI

### Unified search
- Full-text index
- File metadata
- Documents
- Mail
- Calendar
- Notes
- Tasks
- Chat
- Filters and ranking

### BYOK AI
- OpenAI-compatible providers
- OpenRouter
- Gemini
- Anthropic
- Custom endpoints
- Model selector
- Per-app context
- Tool calling
- Structured output
- Streaming
- Embeddings/RAG adapter
- Local model adapter
- Prompt templates
- Privacy controls
- Key stored locally by default

### Copilot-like capabilities
- Draft/rewrite/summarize
- Document Q&A
- Spreadsheet formula assistance and analysis
- Presentation generation/editing
- Email drafting and coaching
- Meeting summarization
- Task extraction
- Cross-file search/Q&A
- Agent/tool execution with explicit user approval

## 12. Security / administration

- Local-only mode
- Optional account/server mode
- Passkeys/OAuth adapters
- Role-based permissions
- Workspace policies
- Audit log
- Encryption at rest where server storage is enabled
- TLS for network adapters
- API-key vault abstraction
- Export/delete all user data
- Backup/restore
- Recovery codes for account mode
- Session management

## 13. Platform

- Windows/macOS/Linux desktop shell
- Responsive web app
- PWA/offline mode
- Mobile responsive UI
- Keyboard shortcuts
- Command palette
- Global settings
- Themes
- Localization/i18n
- Accessibility/WCAG-oriented UI
- Plugin/extension API
- Import/export compatibility test suite

## Implementation rule

Do **not** claim 100% parity until each feature group has automated tests, a usable UI, persistence behavior, import/export tests where applicable, and documented limitations. Microsoft 365 also contains cloud services such as Exchange, SharePoint, Teams, OneDrive, Power Platform, Defender and enterprise administration; these require independent server-side equivalents rather than a purely local React implementation.
