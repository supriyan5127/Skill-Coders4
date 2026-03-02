const fs = require('fs');
const path = require('path');

const filePaths = [
    'src/pages/Career.css',
    'src/pages/Courses.css',
    'src/pages/Gadgets.css',
    'src/pages/Websites.css',
];

filePaths.forEach((f) => {
    let filePath = path.join(__dirname, f);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Fix the grid-template-columns forcing 300px+ width which causes overflow on < 350px screens
        content = content.replace(/grid-template-columns: repeat\(auto-fit, minmax\([0-9]{3}px, 1fr\)\);/g, 'grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));');

        // Allow cards to shrink
        content = content.replace(/min-width: 250px;/g, 'min-width: 100%;');

        fs.writeFileSync(filePath, content);
        console.log('Fixed grid and min-width in ' + f);
    }
});
