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

// Append an overarching mobile fix for container widths
const globalFix = `
/* ===== GLOBAL MOBILE OVERFLOW FIX ===== */
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
}
`;

cssFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (!content.includes('GLOBAL MOBILE OVERFLOW FIX')) {
            fs.appendFileSync(filePath, '\\n' + globalFix);
            console.log('Appended fix to ' + file);
        } else {
            console.log('Fix already exists in ' + file);
        }
    }
});
