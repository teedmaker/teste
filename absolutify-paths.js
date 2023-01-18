const fs = require('fs');

fs.rmdirSync('../like-for-money/app', { recursive: true });
fs.mkdirSync('../like-for-money/app');
fs.mkdirSync('../like-for-money/app/assets');
fs.mkdirSync('../like-for-money/app/assets/css');
fs.mkdirSync('../like-for-money/app/assets/images');

// get all file inside dist folder and subfolders
const getFiles = (dir, files_) => {
  files_ = files_ || [];
  const files = fs.readdirSync(dir);
  for (let i in files) {
    const name = dir + '/' + files[i];
    if (fs.statSync(name + '').isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
};

getFiles('./dist').forEach((filePath) => {
  const newFilePath = filePath.replace('./dist', '../like-for-money/app');
  fs.copyFileSync(filePath, newFilePath);
});

getFiles('./src/assets').forEach((filePath) => {
  const newFilePath = filePath.replace('./src/assets', '../like-for-money/app/assets');
  fs.copyFileSync(filePath, newFilePath);
});

// create a .htaccess file to redirect all requests to index.html
fs.writeFileSync('../like-for-money/app/.htaccess', `RewriteEngine On

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]`);


if (!fs.existsSync('../like-for-money/app/.env')) {
  fs.copyFileSync('./.env.example', '../like-for-money/app/.env');
}

// on file index.html change icon from ./favicon.ico to /favicon.ico
const indexHtml = fs.readFileSync('../like-for-money/app/index.html', 'utf8');
fs.writeFileSync('../like-for-money/app/index.html', indexHtml.replace('./favicon.ico', '/favicon.ico'));
