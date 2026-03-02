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

        // Fix the maxCardFix to subtract container padding and margin appropriately
        content = content.replace(/width: 100% !important;/g, 'width: 100% !important;');
        content = content.replace(/max-width: 100vw !important;/g, 'max-width: 100% !important;');

        // For the container itself on mobile, reduce padding so cards have more room
        if (file.includes('Career.css')) {
            content += `
@media (max-width: 480px) {
  .jobs-section .container {
    padding: 0 10px !important; /* Reduce container padding to give cards more space */
  }
  .job-card {
    padding: 20px 15px !important; /* Reduce card internal padding so content fits better */
    margin: 10px auto !important;
  }
}
`;
        }

        fs.writeFileSync(filePath, content);
        console.log('Fixed container padding and card margins in ' + file);
    }
});
