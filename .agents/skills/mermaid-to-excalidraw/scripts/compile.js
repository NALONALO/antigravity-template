import fs from 'fs';
import puppeteer from 'puppeteer';

function generateElementId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 21; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function compile(inputFile, outputFile) {
  try {
    const mermaidSyntax = fs.readFileSync(inputFile, 'utf-8');
    const bundleScript = fs.readFileSync(new URL('./bundle.out.js', import.meta.url), 'utf-8');

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Inject the library bundle
    await page.evaluate(bundleScript);

    // Run the parsing inside the browser environment for perfect DOM measurements
    const { elements, files } = await page.evaluate(async (syntax) => {
      // Mermaid needs a container sometimes to measure sizes correctly if it's attached to DOM
      const div = document.createElement('div');
      div.id = 'mermaid-container';
      document.body.appendChild(div);
      
      const result = await window.parseMermaidToExcalidraw(syntax, {
        fontSize: 20
      });
      return result;
    }, mermaidSyntax);
    
    await browser.close();
    
    // 4. Label Finalization
    const newElements = [];
    for (const el of elements) {
      if (el.label && el.label.text) {
        const textStr = el.label.text.replace(/\\n/g, '\n');
        const textId = generateElementId();
        const timestamp = Date.now();
        
        if (!el.boundElements) {
          el.boundElements = [];
        }
        el.boundElements.push({ type: "text", id: textId });
        
        const fontSize = 20;
        const font_family = 1;
        
        const lines = textStr.split('\n');
        const maxLineLength = Math.max(...lines.map(l => l.length), 0);
        const textWidth = Math.max(10, maxLineLength * fontSize * 0.6);
        const textHeight = Math.max(10, lines.length * fontSize * 1.25);
        
        const isArrow = el.type === "arrow";
        
        const textEl = {
          id: textId,
          type: "text",
          x: isArrow ? el.x : el.x + ((el.width || 0) - textWidth) / 2,
          y: isArrow ? el.y : el.y + ((el.height || 0) - textHeight) / 2,
          width: textWidth,
          height: textHeight,
          angle: 0,
          strokeColor: el.strokeColor || "#1e1e1e",
          backgroundColor: "transparent",
          fillStyle: "solid",
          strokeWidth: 2,
          strokeStyle: "solid",
          roughness: 1,
          opacity: 100,
          groupIds: el.groupIds || [],
          frameId: null,
          index: "a1",
          roundness: null,
          seed: Math.floor(Math.random() * 2000000000),
          version: 1,
          versionNonce: Math.floor(Math.random() * 2000000000),
          isDeleted: false,
          boundElements: [],
          updated: timestamp,
          link: null,
          locked: false,
          text: textStr,
          fontSize: fontSize,
          fontFamily: font_family,
          textAlign: "center",
          verticalAlign: "middle",
          containerId: el.id,
          originalText: textStr,
          autoResize: false,
          lineHeight: 1.25,
          hasTextLink: false,
          rawText: textStr
        };
        
        newElements.push(textEl);
        delete el.label;
      }
    }
    
    elements.push(...newElements);
    
    const excalidraw_data = {
      type: "excalidraw",
      version: 2,
      source: "mermaid-to-excalidraw-skill",
      elements: elements,
      appState: {
        theme: "light",
        viewBackgroundColor: "#ffffff",
        currentItemStrokeColor: "#1e1e1e",
        currentItemBackgroundColor: "transparent",
        currentItemFillStyle: "solid",
        currentItemStrokeWidth: 2,
        currentItemStrokeStyle: "solid",
        currentItemRoughness: 1,
        currentItemOpacity: 100,
        currentItemFontFamily: 1,
        currentItemFontSize: 20,
        currentItemTextAlign: "left",
        currentItemStartArrowhead: null,
        currentItemEndArrowhead: "arrow",
        currentItemArrowType: "round",
        currentItemFrameRole: null,
        scrollX: 0,
        scrollY: 0,
        zoom: { value: 1.0 },
        currentItemRoundness: "round",
        gridSize: 20,
        gridStep: 5,
        gridModeEnabled: false
      },
      files: files || {}
    };
    
    fs.writeFileSync(outputFile, JSON.stringify(excalidraw_data, null, 2), 'utf-8');
    console.log(`Successfully compiled ${inputFile} to ${outputFile}`);
  } catch (error) {
    console.error("Error compiling mermaid syntax:", error);
    process.exit(1);
  }
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error("Usage: node compile.js <input.mmd> <output.excalidraw>");
  process.exit(1);
}

compile(inputFile, outputFile);
