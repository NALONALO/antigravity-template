import fs from 'fs';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

const jsdom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>');
Object.defineProperty(globalThis, 'window', { value: jsdom.window, writable: true, configurable: true });
Object.defineProperty(globalThis, 'document', { value: jsdom.window.document, writable: true, configurable: true });
Object.defineProperty(globalThis, 'navigator', { value: jsdom.window.navigator, writable: true, configurable: true });

class CSSStyleSheet {
  constructor() {
    this.cssRules = [];
  }
  replaceSync() {}
  insertRule(rule, index) {
    this.cssRules.splice(index || 0, 0, rule);
  }
}
globalThis.CSSStyleSheet = CSSStyleSheet;
globalThis.window.CSSStyleSheet = CSSStyleSheet;

const DOMPurifyInstance = createDOMPurify(globalThis.window);
for (const key of Object.getOwnPropertyNames(DOMPurifyInstance)) {
  const value = DOMPurifyInstance[key];
  if (typeof value === "function") {
    createDOMPurify[key] = value.bind(DOMPurifyInstance);
  } else {
    Object.defineProperty(createDOMPurify, key, {
      get: () => DOMPurifyInstance[key],
      set: (val) => { DOMPurifyInstance[key] = val; },
      configurable: true
    });
  }
}
Object.defineProperty(globalThis, "DOMPurify", { value: createDOMPurify, writable: true, configurable: true });

function estimateBounds(element) {
  const textContent = (element.textContent || "").trim();
  if (!textContent) return { x: 0, y: 0, width: 0, height: 0 };
  const lines = textContent.replace(/\\n/g, '\n').split('\n');
  const maxLineLength = Math.max(...lines.map(l => l.trim().length), 0);
  const fontSize = parseFloat(element.getAttribute('font-size') || '20');
  return {
    x: 0,
    y: 0,
    width: Math.max(15, maxLineLength * fontSize * 0.75),
    height: Math.max(15, lines.length * fontSize * 1.5)
  };
}

globalThis.window.SVGElement.prototype.getBBox = function () {
  const tagName = this.tagName.toLowerCase();
  if (tagName === "text" || tagName === "foreignobject") {
    return estimateBounds(this);
  } else if (tagName === "rect") {
    return {
      x: parseFloat(this.getAttribute("x") || 0),
      y: parseFloat(this.getAttribute("y") || 0),
      width: parseFloat(this.getAttribute("width") || 0),
      height: parseFloat(this.getAttribute("height") || 0)
    };
  } else if (tagName === "g") {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const child of this.children) {
      if (child.getBBox) {
        const box = child.getBBox();
        if (box.width === 0 && box.height === 0) continue;
        minX = Math.min(minX, box.x);
        minY = Math.min(minY, box.y);
        maxX = Math.max(maxX, box.x + box.width);
        maxY = Math.max(maxY, box.y + box.height);
      }
    }
    if (minX === Infinity) return { x: 0, y: 0, width: 0, height: 0 };
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  }
  return { x: 0, y: 0, width: 10, height: 10 };
};

globalThis.window.Element.prototype.getBoundingClientRect = function() {
  if (this.getBBox) {
    const box = this.getBBox();
    return {
      x: box.x, y: box.y, width: box.width, height: box.height,
      top: box.y, left: box.x, right: box.x + box.width, bottom: box.y + box.height
    };
  }
  const tagName = this.tagName.toLowerCase();
  if (tagName === "div" || tagName === "span") {
    const box = estimateBounds(this);
    return {
      x: box.x, y: box.y, width: box.width, height: box.height,
      top: box.y, left: box.x, right: box.x + box.width, bottom: box.y + box.height
    };
  }
  return { x: 0, y: 0, width: 10, height: 10, top: 0, left: 0, right: 10, bottom: 10 };
};

if (!globalThis.window.SVGPathElement) {
  globalThis.window.SVGPathElement = function() {};
}
globalThis.window.SVGPathElement.prototype.getTotalLength = function() {
  return 100;
};
globalThis.window.SVGPathElement.prototype.getPointAtLength = function(pos) {
  return { x: pos, y: pos };
};

import { parseMermaidToExcalidraw } from '@excalidraw/mermaid-to-excalidraw';

async function test() {
  const mermaidSyntax = `graph TD
  A[Client] -->|HTTP GET| B(Load Balancer)
  B --> C{Service Gateway}
  C -->|/api/v1| D[API Server]
  C -->|/auth| E[Auth Server]
  D --> F[(Database)]
  E --> F`;
  
  const { elements } = await parseMermaidToExcalidraw(mermaidSyntax, { fontSize: 20 });
  
  // Just print the elements that have a label
  for (const el of elements) {
    if (el.label) {
      if (el.type === 'arrow') {
        console.log(JSON.stringify(el, null, 2));
      }
    }
  }
}
test();
