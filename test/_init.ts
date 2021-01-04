import yaml from 'js-yaml';
import fs from 'fs';
import log from 'loglevel';

try {
    const doc: any = yaml.safeLoad(fs.readFileSync('environment-variables.yml', 'utf8'));
    const stage = doc.stage || {};
    process.env = {
        ...process.env,
        ...stage,
    };
} catch (e) {
    log.error(e);
}