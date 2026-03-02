const fs = require('fs');
const path = require('path');

const cssFiles = [
    'src/pages/Career.css',
    'src/pages/Courses.css',
    'src/pages/Gadgets.css',
    'src/pages/Websites.css',
];

cssFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Ensure box-sizing: border-box is applied everywhere
        if (!content.includes('*, *::before, *::after')) {
            content = `*, *::before, *::after { box-sizing: border-box; }\n` + content;
        }

        content = content.replace(/padding:\s*\d+px\s+\d+px;/g, (match) => {
            return match; // Keep existing padding
        });

        // Add a global fix for cards exceeding 100% width due to margin/padding
        const maxCardFix = `
@media (max-width: 480px) {
  .job-card, .course-card, .gadget-card, .website-card {
    width: 100% !important;
    max-width: 100vw !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    box-sizing: border-box !important;
  }
}
`;
        if (!content.includes('max-width: 100vw !important;')) {
            content += maxCardFix;
        }

        fs.writeFileSync(filePath, content);
        console.log('Fixed cards box-sizing on ' + file);
    }
});
