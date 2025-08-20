import Metadata from '@livyn/metadata'

export const cache = new Metadata.CacheStore();
export const metadata = new Metadata.MetaStore(cache);

class LivynProfile {}

metadata.define(LivynProfile, 'framework', {
  name: 'livyn',
  version: '1.0.0',
  codename: 'Garuda',
  author: '@livyn',
  license: 'MIT',
  description: 'A lightweight metadata management system for JavaScript/Node.js, supporting TTL, freeze, overwrite, merge, and runtime queries.',
  repository: 'https://github.com/yourusername/livyn',
  type: 'framework',
  ui: {
    ascii: `
 _ _                   
| (_)_   ___   _ _ __  
| | \\ \\ / / | | | '_ \\ 
| | |\\ V /| |_| | | | |
|_|_| \\_/  \\__, |_| |_|
           |___/       
    `,
    banner: '• @livyn v1.0.0 — Garuda Edition •'
  }
}, { freeze: true });

export default LivynProfile;
