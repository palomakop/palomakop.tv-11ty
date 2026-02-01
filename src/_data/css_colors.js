import postcss from 'postcss';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function() {
  const results = {};
  const seen = new Set();

  // Process style.css
  const cssPath = path.join(__dirname, '../css/style.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const root = postcss.parse(cssContent);

  root.walkRules(rule => {
    rule.walkDecls(decl => {
      const value = decl.value.trim();
      let type = null;

      // Check if it's a gradient
      if (value.match(/gradient\(/)) {
        if (value.match(/#[0-9a-fA-F]{3,6}(?![0-9a-fA-F])/)) {
          type = 'gradient';
        }
      }
      // Check if it's a plain hex color (3 or 6 digits, no alpha)
      else if (value.match(/^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/)) {
        type = 'color';
      }

      if (type && !seen.has(value)) {
        seen.add(value);

        const selector = rule.selector;
        const property = decl.prop;

        // Initialize selector object if it doesn't exist
        if (!results[selector]) {
          results[selector] = {};
        }

        results[selector][property] = { type, value };
      }
    });
  });

  // Process now_style.css
  const nowCssPath = path.join(__dirname, '../css/now_style.css');
  const nowCssContent = fs.readFileSync(nowCssPath, 'utf8');
  const nowRoot = postcss.parse(nowCssContent);

  results.now = {};
  const nowSeen = new Set();

  nowRoot.walkRules(rule => {
    rule.walkDecls(decl => {
      const value = decl.value.trim();
      let type = null;

      // Check if it's a gradient
      if (value.match(/gradient\(/)) {
        if (value.match(/#[0-9a-fA-F]{3,6}(?![0-9a-fA-F])/)) {
          type = 'gradient';
        }
      }
      // Check if it's a plain hex color (3 or 6 digits, no alpha)
      else if (value.match(/^#[0-9a-fA-F]{3}$|^#[0-9a-fA-F]{6}$/)) {
        type = 'color';
      }

      if (type && !nowSeen.has(value)) {
        nowSeen.add(value);

        const selector = rule.selector;
        const property = decl.prop;
        const key = `${selector} ${property}`;

        results.now[key] = { type, value };
      }
    });
  });

  return results;
}
