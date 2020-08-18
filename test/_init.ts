import yaml from 'js-yaml';
import fs from 'fs';

try {
  const doc = yaml.safeLoad(fs.readFileSync('environment-variables.yml', 'utf8'));
  if (typeof doc === 'object') {
    process.env = {
        ...process.env,
        ...doc,
    }
  }
} catch (e) {
  console.log(e);
}