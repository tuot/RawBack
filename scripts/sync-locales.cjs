const fs = require('fs');
const path = require('path');

const i18nContent = fs.readFileSync(path.join(__dirname, '../utils/i18n.ts'), 'utf8');
const match = i18nContent.match(/const messages:.*= ({[\s\S]*?});/);

if (!match) {
  console.error('Failed to parse i18n.ts');
  process.exit(1);
}

const fn = new Function('return ' + match[1]);
const messages = fn();

Object.keys(messages).forEach(lang => {
  const dict = messages[lang];
  const out = {};
  Object.keys(dict).forEach(k => {
    out[k] = { message: dict[k] };
  });
  
  const dir = path.join(__dirname, '../public/_locales', lang);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(dir, 'messages.json'), JSON.stringify(out, null, 2) + '\n');
});

console.log('Successfully synced all translations to public/_locales');
