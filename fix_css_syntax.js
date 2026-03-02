const fs = require('fs');
const path = require('path');

const cssFiles = [
    'src/components/About.css',
    'src/components/Footer.css',
    'src/components/RedTeamBlueTeam.css',
    'src/components/Stats.css',
    'src/pages/Career.css',
    'src/pages/Courses.css',
    'src/pages/Gadgets.css',
    'src/pages/Websites.css',
    'src/components/Header.css',
    'src/pages/AdminDashboard.css',
    'src/components/Hero.css',
    'src/components/ContactModal.css'
];

cssFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let initialLength = content.length;

        // Remove literal "\n" strings that were accidentally inserted
        content = content.replace(/\\n/g, '');

        if (content.length !== initialLength) {
            fs.writeFileSync(filePath, content);
            console.log('Fixed syntax error in ' + file);
        }
    }
});
