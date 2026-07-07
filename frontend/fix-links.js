const fs = require('fs');
const path = require('path');

const walk = function(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            results.push(file);
        }
    });
    return results;
};

const processFile = (filePath) => {
    if (!filePath.endsWith('.jsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace <Link to="..."> with <Link href="...">
    // and <Link to={...}> with <Link href={...}>
    const originalContent = content;
    content = content.replace(/<Link([^>]+)to=/g, '<Link$1href=');
    
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated Link in: ${filePath}`);
    }
};

const pagesDir = path.join(__dirname, 'src', 'pages');
const compDir = path.join(__dirname, 'src', 'components');
const appDir = path.join(__dirname, 'app');

const files = [...walk(pagesDir), ...walk(compDir), ...walk(appDir)];
files.forEach(processFile);
console.log('Link migration complete!');
