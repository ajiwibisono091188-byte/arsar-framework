import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const tokensDir = path.resolve(__dirname, 'tokens');
const assetsCssDir = path.resolve(__dirname, '../assets/css');

/**
 * Load all design tokens and merge them into a single object
 * @returns {Object}
 */
export function getTheme() {
  const tokens = [
    'colors', 'typography', 'spacing', 'radius', 'shadow',
    'animation', 'breakpoints', 'zindex', 'opacity', 'transition', 'container'
  ];
  
  const theme = {};
  
  tokens.forEach((token) => {
    const tokenPath = path.join(tokensDir, `${token}.json`);
    if (fs.existsSync(tokenPath)) {
      theme[token] = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
    }
  });
  
  return theme;
}

/**
 * Generate CSS Custom Properties stylesheet based on tokens JSON.
 * Writes output to src/assets/css/design-tokens.css.
 */
export function generateCssTokens() {
  const theme = getTheme();
  let css = `/* Generated Design Tokens CSS variables - DO NOT EDIT DIRECTLY */\n\n:root {\n`;

  // 1. Process Colors
  // Helper to map color sub-keys
  const processColors = (obj, prefix = '--color-') => {
    for (const [key, val] of Object.entries(obj)) {
      if (typeof val === 'object') {
        processColors(val, `${prefix}${key}-`);
      } else {
        css += `  ${prefix}${key}: ${val};\n`;
      }
    }
  };
  processColors(theme.colors);

  // 2. Process Spacing
  for (const [key, val] of Object.entries(theme.spacing)) {
    css += `  --spacing-${key}: ${val};\n`;
  }

  // 3. Process Radius
  for (const [key, val] of Object.entries(theme.radius)) {
    css += `  --radius-${key}: ${val};\n`;
  }

  // 4. Process Shadows
  for (const [key, val] of Object.entries(theme.shadow)) {
    css += `  --shadow-${key}: ${val};\n`;
  }

  // 5. Process Z-Index
  for (const [key, val] of Object.entries(theme.zindex)) {
    css += `  --zindex-${key}: ${val};\n`;
  }

  // 6. Process Opacity
  for (const [key, val] of Object.entries(theme.opacity)) {
    css += `  --opacity-${key}: ${val};\n`;
  }

  // 7. Process Transition
  const processTransitions = (obj, prefix = '--transition-') => {
    for (const [key, val] of Object.entries(obj)) {
      if (typeof val === 'object') {
        processTransitions(val, `${prefix}${key}-`);
      } else {
        css += `  ${prefix}${key}: ${val};\n`;
      }
    }
  };
  processTransitions(theme.transition);

  // 8. Process Typography sizes
  for (const [key, val] of Object.entries(theme.typography.sizes)) {
    css += `  --font-size-${key}: ${val.size};\n`;
    css += `  --line-height-${key}: ${val.lineHeight};\n`;
  }

  // 9. Font Families
  for (const [key, val] of Object.entries(theme.typography.fonts)) {
    css += `  --font-${key}: ${val};\n`;
  }

  css += `}\n`;

  // Write to assets/css/design-tokens.css
  if (!fs.existsSync(assetsCssDir)) {
    fs.mkdirSync(assetsCssDir, { recursive: true });
  }
  fs.writeFileSync(path.join(assetsCssDir, 'design-tokens.css'), css, 'utf8');
  console.log('[Theme Loader] Generated src/assets/css/design-tokens.css successfully.');
}

// Auto-generate tokens style if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateCssTokens();
}
