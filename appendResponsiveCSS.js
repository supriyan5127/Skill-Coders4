const fs = require('fs');
const path = require('path');

const updates = [
    {
        file: 'src/components/About.css',
        css: `
/* ===== ADDITIONAL RESPONSIVE ===== */
@media (max-width: 1024px) {
  .about h3 { font-size: 36px; }
  .content-card { padding: 35px 40px; }
}
@media (max-width: 480px) {
  .about { padding: 60px 15px; }
  .about h3 { font-size: 28px; }
  .content-card { padding: 25px 15px; }
  .about p { font-size: 15px; }
}
`
    },
    {
        file: 'src/components/Footer.css',
        css: `
/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .footer-container { gap: 20px; text-align: center; }
}
@media (max-width: 480px) {
  .footer-container { grid-template-columns: 1fr; }
  .footer { padding: 40px 0 10px; }
}
`
    },
    {
        file: 'src/components/RedTeamBlueTeam.css',
        css: `
/* ===== ADDITIONAL RESPONSIVE ===== */
@media (max-width: 1024px) {
  .teams-container { gap: 30px; }
  .team { padding: 35px 20px; }
}
@media (max-width: 480px) {
  .cyber-battle { padding: 50px 15px; }
  .cyber-battle h2 { font-size: 32px; }
  .subtitle { font-size: 18px; }
  .description { font-size: 15px; }
  .team h3 { font-size: 28px; }
  .team p { font-size: 14px; }
}
`
    },
    {
        file: 'src/components/Stats.css',
        css: `
/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .stats-container { gap: 20px; }
  .stat-item h3 { font-size: 36px; }
  .stat-item p { font-size: 16px; }
}
@media (max-width: 480px) {
  .stats-container { flex-direction: column; align-items: center; }
  .stat-item h3 { font-size: 32px; }
  .stat-item p { font-size: 14px; }
}
`
    },
    {
        file: 'src/pages/Career.css',
        css: `
/* ===== ADDITIONAL RESPONSIVE ===== */
@media (max-width: 1024px) {
  .hero-stats { gap: 40px; }
  .job-card { padding: 20px; }
}
@media (max-width: 480px) {
  .career-hero { padding: 50px 0; }
  .career-hero h1 { font-size: 30px; }
  .career-hero p { font-size: 16px; }
  .stat { padding: 15px 20px; }
  .stat-number { font-size: 32px; }
  .stat-label { font-size: 14px; }
  .jobs-section { padding: 40px 15px; }
  .job-header h2 { font-size: 18px; }
  .apply-btn { width: 100%; text-align: center; margin-top: 15px; }
  .general-cta { padding: 50px 15px; }
  .general-cta h2 { font-size: 32px; }
}
`
    },
    {
        file: 'src/pages/Courses.css',
        css: `
/* ===== ADDITIONAL RESPONSIVE ===== */
@media (max-width: 1024px) {
  .hero-stats { gap: 40px; }
  .courses-grid { gap: 20px; }
}
@media (max-width: 480px) {
  .courses-hero { padding: 50px 0; }
  .courses-hero h1 { font-size: 30px; }
  .courses-hero p { font-size: 16px; }
  .stat { padding: 15px; }
  .stat-number { font-size: 32px; }
  .category-section { padding: 0 15px; }
  .category-title { font-size: 26px; }
  .course-info { padding: 15px; }
  .course-info h3 { font-size: 18px; }
  .discounted-price { font-size: 24px; }
}
`
    },
    {
        file: 'src/pages/Gadgets.css',
        css: `
/* ===== ADDITIONAL RESPONSIVE ===== */
@media (max-width: 1024px) {
  .hero-stats { gap: 40px; }
  .gadgets-grid { gap: 20px; }
}
@media (max-width: 480px) {
  .gadgets-hero { padding: 50px 0; }
  .gadgets-hero h1 { font-size: 32px; }
  .gadgets-hero p { font-size: 18px; }
  .stat { padding: 15px; }
  .stat-number { font-size: 36px; }
  .category-section { padding: 0 15px; }
  .category-title { font-size: 26px; }
  .gadget-info { padding: 15px; }
  .gadget-info h3 { font-size: 18px; }
  .discounted-price { font-size: 24px; }
}
`
    },
    {
        file: 'src/pages/Websites.css',
        css: `
/* ===== ADDITIONAL RESPONSIVE ===== */
@media (max-width: 1024px) {
  .features-grid { gap: 20px; }
  .templates-grid { gap: 20px; }
}
@media (max-width: 480px) {
  .websites-hero { padding: 50px 15px; }
  .websites-hero h1 { font-size: 32px; }
  .websites-hero p { font-size: 16px; }
  .tech-stack { gap: 10px; }
  .features-section { padding: 40px 15px; }
  .templates-section { padding: 40px 15px; }
  .section-title { font-size: 28px; }
  .template-info { padding: 15px; }
  .template-info h3 { font-size: 20px; }
  .discounted-price { font-size: 24px; }
  .custom-cta { padding: 50px 15px; }
  .custom-cta h2 { font-size: 32px; }
}
`
    },
    {
        file: 'src/components/Header.css',
        css: `
/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .nav ul { gap: 15px; }
  .nav a { font-size: 14px; }
}
@media (max-width: 480px) {
  .header-container { flex-direction: column; gap: 15px; }
  .nav ul { flex-wrap: wrap; justify-content: center; }
}
`
    },
    {
        file: 'src/pages/AdminDashboard.css',
        css: `
/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .admin-sidebar { width: 200px; padding: 20px 15px; }
  .admin-content { padding: 20px; }
  .admin-header h1 { font-size: 26px; }
}
@media (max-width: 768px) {
  .admin-dashboard { flex-direction: column; }
  .admin-sidebar { width: 100%; border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.1); flex-direction: row; flex-wrap: wrap; justify-content: center; padding: 15px; }
  .admin-sidebar h2 { margin-bottom: 0; width: 100%; text-align: center; margin-bottom: 15px; }
  .admin-content { padding: 15px; }
  .admin-header { flex-direction: column; align-items: flex-start; gap: 15px; }
  .admin-modal-content { padding: 20px; width: 95%; }
  .admin-form .form-row { flex-direction: column; gap: 0; }
}
@media (max-width: 480px) {
  .admin-header h1 { font-size: 22px; }
  .add-btn { width: 100%; }
}
`
    },
    {
        file: 'src/components/Hero.css',
        css: `
/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .hero h1 { font-size: 36px; }
  .hero p { font-size: 16px; margin-bottom: 20px; }
  .hero { padding: 60px 15px; }
}
@media (max-width: 480px) {
  .hero h1 { font-size: 30px; }
  .hero p { font-size: 15px; }
  .hero { padding: 50px 15px; }
}
`
    },
    {
        file: 'src/components/ContactModal.css',
        css: `
/* ===== ADDITIONAL RESPONSIVE ===== */
@media (max-width: 480px) {
  .modal-content { padding: 25px 15px; }
  .modal-content h2 { font-size: 24px; }
  .submit-btn { padding: 12px; font-size: 16px; }
}
`
    }
];

updates.forEach(u => {
    const filePath = path.join(__dirname, u.file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (!content.includes('480px')) {
            fs.appendFileSync(filePath, '\\n' + u.css);
            console.log('Appended to ' + u.file);
        } else {
            console.log('Skipped ' + u.file + ' (already has media queries)');
        }
    } else {
        console.log('File not found: ' + u.file);
    }
});
