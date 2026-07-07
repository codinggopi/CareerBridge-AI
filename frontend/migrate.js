const fs = require('fs');
const path = require('path');

const walk = function(dir) {
    let results = [];
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
    let changed = false;

    // Add "use client";
    if (!content.includes('"use client";') && !content.includes("'use client';")) {
        content = '"use client";\n' + content;
        changed = true;
    }

    // Replace react-router-dom imports
    if (content.includes('react-router-dom')) {
        let newImports = [];
        
        // Check what is being imported
        const hasLink = content.includes('Link');
        const hasUseLocation = content.includes('useLocation');
        
        if (hasLink) newImports.push("import Link from 'next/link';");
        if (hasUseLocation) {
            newImports.push("import { usePathname } from 'next/navigation';");
        }
        
        // Remove the react-router-dom import line
        content = content.replace(/import\s+{.*}\s+from\s+['"]react-router-dom['"];?/g, newImports.join('\n'));
        
        // Map useLocation to usePathname
        if (hasUseLocation) {
            // A simple hack to map useLocation to usePathname so we don't need to change `location.pathname` usage
            const hookDef = `\nconst useLocation = () => ({ pathname: usePathname() });\n`;
            // Insert after imports
            const lastImportIndex = content.lastIndexOf('import ');
            const insertPosition = content.indexOf('\n', lastImportIndex) + 1;
            content = content.slice(0, insertPosition) + hookDef + content.slice(insertPosition);
        }
        
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Processed: ${filePath}`);
    }
};

const pagesDir = path.join(__dirname, 'src', 'pages');
const compDir = path.join(__dirname, 'src', 'components');

const files = [...walk(pagesDir), ...walk(compDir)];
files.forEach(processFile);
console.log('Migration complete!');
