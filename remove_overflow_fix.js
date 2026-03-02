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

const block1 = `/* ===== GLOBAL MOBILE OVERFLOW FIX ===== */
@media (max-width: 480px) {
  .container, 
  [class*="-container"], 
  section,
  .hero,
  .footer,
  .cyber-battle,
  .about {
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: hidden !important;
    box-sizing: border-box !important;
  }
}`;

const block2 = `/* ===== GLOBAL MOBILE OVERFLOW FIX ===== */
@media (max-width: 480px) {
  .container, 
  [class*="-container"], 
  section,
  .hero,
  .footer,
  .cyber-battle,
  .about {
    width: 100% !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
    box-sizing: border-box !important;
  }
}`;

cssFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let initialLength = content.length;

        // Remove the block
        content = content.replace(block1, '');
        content = content.replace(block2, '');
        content = content.replace(/\/\* ===== GLOBAL MOBILE OVERFLOW FIX ===== \*\/[\s\S]*?\}\s*\}/g, '/* Removed global overflow fix */');

        if (content.length !== initialLength) {
            fs.writeFileSync(filePath, content);
            console.log('Cleaned up ' + file);
        }
    }
});
