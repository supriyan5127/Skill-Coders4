import React, { useState } from 'react';
import './Websites.css';
import EnrollModal from './EnrollModal';
const templatesData = [
  {
    id: 1,
    name: 'E-Commerce Pro',
    description: 'Full-featured online store with cart, checkout, and payment integration',
    features: ['Responsive Design', 'Payment Gateway', 'Admin Dashboard', 'Product Management'],
    originalPrice: 9999,
    discountedPrice: 8999,
    discount: 'Save 10%',
    image: '/assests/E-Commerce.png' // replace with actual images
  },
  {
    id: 2,
    name: 'Business Elite',
    description: 'Professional corporate website with CMS and contact forms',
    features: ['CMS Integration', 'Contact Forms', 'SEO Optimized', 'Blog Section'],
    originalPrice: 8889,
    discountedPrice: 7999,
    discount: 'Save 10%',
    image: '/assests/Elite.png'
  },
  {
    id: 3,
    name: 'Portfolio Studio',
    description: 'Creative portfolio with gallery, animations, and project showcase',
    features: ['Gallery System', 'Smooth Animations', 'Project Showcase', 'Contact Integration'],
    originalPrice: 6221,
    discountedPrice: 5599,
    discount: 'Save 10%',
    image: '/assests/Portfolio.png'
  },
  {
    id: 4,
    name: 'Restaurant Plus',
    description: 'Menu display, online ordering, and reservation system',
    features: ['Menu Management', 'Online Orders', 'Reservations', 'Location Maps'],
    originalPrice: 27778,
    discountedPrice: 25000,
    discount: 'Save 10%',
    image: '/assests/Restaurant.png'
  },
  {
    id: 5,
    name: 'Blog Master',
    description: 'Modern blog platform with categories, tags, and commenting',
    features: ['Rich Text Editor', 'Categories & Tags', 'Comments System', 'RSS Feed'],
    originalPrice: 9999,
    discountedPrice: 8999,
    discount: 'Save 10%',
    image: '/assests/Blog.png'
  },
  {
    id: 6,
    name: 'Landing Genius',
    description: 'High-converting landing page with analytics and A/B testing',
    features: ['A/B Testing', 'Analytics', 'Lead Capture', 'Mobile First'],
    originalPrice: 14443,
    discountedPrice: 12999,
    discount: 'Save 10%',
    image: '/assests/Genius.png'
  }
];


const Websites = () => {
  // State for the modal
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // (Optional) If you still want a cart, keep this – otherwise you can remove it
  // const [cart, setCart] = useState([]);

  const handleBuyNow = (template) => {
    // Create a course-like object with title from template.name
    const courseLike = { title: template.name };
    setSelectedTemplate(courseLike);
    setIsModalOpen(true);
    // If you want to also add to cart, uncomment the next line:
    // setCart([...cart, template]);
  };

  return (
    <div className="websites-page">
      {/* Hero with limited-time banner */}
      <section className="websites-hero">
        <div className="container">
          <div className="limited-banner">
            <span className="blink">🎉 LIMITED TIME: 10% OFF ON ALL WEBSITES 🎉</span>
          </div>
          <h1>Premium Website Templates</h1>
          <p>Professional, responsive templates ready to launch. Save time and get online faster.</p>
          <div className="tech-stack">
            <span>Built with:</span>
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" title="React" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" title="Next.js" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" title="TypeScript" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" title="Node.js" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" title="Python" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" alt="Django" title="Django" />
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" title="PHP" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">🧹</span>
              <h3>Clean Code</h3>
              <p>Well-structured & documented</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <h3>Fast Performance</h3>
              <p>Optimized for speed</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <h3>Modern Design</h3>
              <p>Beautiful UI/UX</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <h3>Secure</h3>
              <p>Best practices applied</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <h3>Responsive</h3>
              <p>Works on all devices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="templates-section">
        <div className="container">
          <h2 className="section-title">Our Templates</h2>
          <div className="templates-grid">
            {templatesData.map(template => (
              <div className="template-card" key={template.id}>
                <div className="template-image">
                  <img src={template.image} alt={template.name} />
                </div>
                <div className="template-info">
                  <h3>{template.name}</h3>
                  <p className="template-description">{template.description}</p>
                  <ul className="feature-list">
                    {template.features.map((feature, idx) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                  <div className="price-section">
                    <span className="original-price">₹{template.originalPrice}</span>
                    <span className="discounted-price">₹{template.discountedPrice}</span>
                    <span className="discount-badge">{template.discount}</span>
                  </div>
                  <button className="buy-now-btn" onClick={() => handleBuyNow(template)}>
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Website CTA */}
      <section className="custom-cta">
        <div className="container">
          <h2>Need a Custom Website?</h2>
          <p>Contact us for a tailored solution that perfectly fits your business needs.</p>
          <button className="cta-btn">Get Custom Quote</button>
        </div>
      </section>

      {/* Render the modal when a template is selected */}
      {isModalOpen && (
        <EnrollModal
          course={selectedTemplate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Websites;