import LivynProfile, { metadata } from './profile.js';

console.log(metadata.get(LivynProfile, 'framework.ui.ascii'));
console.log(metadata.get(LivynProfile, 'framework.ui.banner'));
process.exit(0);
