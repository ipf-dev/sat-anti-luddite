import yaml from 'js-yaml';
import fs from 'fs';
import log from 'loglevel';

try {
    const doc = yaml.safeLoad(fs.readFileSync('environment-variables.yml', 'utf8'));
    if (typeof doc === 'object') {
        process.env = {
            ...process.env,
            ...doc,
        };
    }
} catch (e) {
    log.error(e);
}