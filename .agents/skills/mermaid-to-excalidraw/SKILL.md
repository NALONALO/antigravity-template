---
name: mermaid-to-excalidraw
description: A skill to programmatically compile Mermaid syntax into standard, uncompressed .excalidraw JSON files.
---

# Mermaid to Excalidraw Skill

This skill provides a Node.js script to compile Mermaid diagrams into standard `.excalidraw` JSON files. It runs completely headlessly without needing a browser.

## Usage

To compile a Mermaid file to an Excalidraw file, invoke the `compile.js` script inside the `scripts` directory of this skill.

> [!IMPORTANT]
> **Dependency Setup**: Because this is an agent skill in a template project, `node_modules` is not tracked by Git. Before running the `compile.js` script, you MUST check if the `.agents/skills/mermaid-to-excalidraw/scripts/node_modules` directory exists. If it does not exist, run `pnpm install && pnpm rebuild` inside the `.agents/skills/mermaid-to-excalidraw/scripts` directory first to ensure Puppeteer downloads its required browser binaries.

```bash
node .agents/skills/mermaid-to-excalidraw/scripts/compile.js <input.mmd> <output.excalidraw>
```

- `<input.mmd>`: The path to the input Mermaid syntax file.
- `<output.excalidraw>`: The path to the desired output `.excalidraw` file.
