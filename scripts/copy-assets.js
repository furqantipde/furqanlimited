import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('public/frames');
const destDir = path.resolve('dist/frames');

if (fs.existsSync(srcDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  fs.readdirSync(srcDir).forEach(file => {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  });
  console.log(`Successfully copied all frames to ${destDir}`);
}
