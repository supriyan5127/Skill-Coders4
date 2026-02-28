import React, { useState } from 'react';
import './Gadgets.css';
import EnrollModal from './EnrollModal';
const gadgetsData = [
  // USB Devices
  {
    id: 1,
    name: 'USB Rubber Ducky',
    description: 'Keystroke injection tool for penetration testing',
    category: 'USB Devices',
    originalPrice: 8000,
    discountedPrice: 4000,
    discount: '50% OFF',
    image: '/assests/Ducky.png' // placeholder, replace later
  },
  {
    id: 2,
    name: 'Bash Bunny',
    description: 'Multi-function USB attack and automation platform',
    category: 'USB Devices',
    originalPrice: 20000,
    discountedPrice: 10000,
    discount: '50% OFF',
    image: '/assests/Bluetooth.png' // placeholder
  },
  {
    id: 3,
    name: 'KeyGrabber USB Keylogger',
    description: 'Hardware keylogger for security assessments',
    category: 'USB Devices',
    originalPrice: 12000,
    discountedPrice: 6000,
    discount: '50% OFF',
    image: '/assests/Bunny.png'
  },
  // Network Tools
  {
    id: 4,
    name: 'Wi-Fi Pineapple',
    description: 'Wireless auditing and penetration testing platform',
    category: 'Network Tools',
    originalPrice: 20000,
    discountedPrice: 10000,
    discount: '50% OFF',
    image: '/assests/Flipper.png'
  },
  {
    id: 5,
    name: 'LAN Turtle',
    description: 'Covert network implant for remote access',
    category: 'Network Tools',
    originalPrice: 15000,
    discountedPrice: 7500,
    discount: '50% OFF',
    image: '/assests/Lan.png' // placeholder
  },
  {
    id: 6,
    name: 'ESP8266/ESP32',
    description: 'Wi-Fi and Bluetooth microcontroller modules',
    category: 'Network Tools',
    originalPrice: 2000,
    discountedPrice: 1000,
    discount: '50% OFF',
    image: '/assests/Usb.png'
  },
  // Multi-Tools
  {
    id: 7,
    name: 'Flipper Zero',
    description: 'Multi-tool device for hackers and geeks',
    category: 'Multi-Tools',
    originalPrice: 30000,
    discountedPrice: 15000,
    discount: '50% OFF',
    image: '/assests/Flipper.png'
  },
  {
    id: 8,
    name: 'Proxmark3',
    description: 'RFID research and penetration testing tool',
    category: 'Multi-Tools',
    originalPrice: 35000,
    discountedPrice: 17500,
    discount: '50% OFF',
    image: '/assests/promarks.png' // use your actual image
  },
  // SDR Tools
  {
    id: 9,
    name: 'HackRF One',
    description: 'Software-defined radio platform for RF analysis',
    category: 'SDR Tools',
    originalPrice: 50000,
    discountedPrice: 25000,
    discount: '50% OFF',
    image: '/assests/Flipper.png'
  },
  {
    id: 10,
    name: 'Bluetooth Jammer',
    description: 'Signal disruption device for security testing',
    category: 'SDR Tools',
    originalPrice: 25000,
    discountedPrice: 12500,
    discount: '50% OFF',
    image: '/assests/Bluetooth.png'
  },
  // IoT Devices
  {
    id: 11,
    name: 'Raspberry Pi Zero W',
    description: 'Compact wireless-enabled single-board computer',
    category: 'IoT Devices',
    originalPrice: 3000,
    discountedPrice: 1500,
    discount: '50% OFF',
    image: '/assests/Promark.png'
  }
];


const categories = [...new Set(gadgetsData.map(gadget => gadget.category))];

const Gadgets = () => {
  // State for the modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // (Optional) If you still want a cart, keep this – otherwise you can remove it
  // const [cart, setCart] = useState([]);

  const handleAddToCart = (gadget) => {
    // Create a course-like object with title from gadget.name
    // This allows reusing the same EnrollModal component
    const courseLike = { title: gadget.name };
    setSelectedItem(courseLike);
    setIsModalOpen(true);
    // If you want to also add to cart, uncomment the next line:
    // setCart([...cart, gadget]);
  };

  return (
    <div className="gadgets-page">
      <section className="gadgets-hero">
        <div className="container">
          <h1>Premium Hacking Gadgets</h1>
          <p>Professional penetration testing tools at <span className="highlight">50% OFF</span></p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">Pro-Grade</span>
              <span className="stat-label">Tools</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.7</span>
              <span className="stat-label">Average Rating</span>
            </div>
            <div className="stat">
              <span className="stat-number">50%</span>
              <span className="stat-label">OFF Today</span>
            </div>
          </div>
        </div>
      </section>

      {categories.map(category => (
        <section key={category} className="category-section">
          <div className="container">
            <h2 className="category-title">{category}</h2>
            <div className="gadgets-grid">
              {gadgetsData
                .filter(gadget => gadget.category === category)
                .map(gadget => (
                  <div className="gadget-card" key={gadget.id}>
                    <div className="gadget-image">
                      <img src={gadget.image} alt={gadget.name} />
                    </div>
                    <div className="gadget-info">
                      <h3>{gadget.name}</h3>
                      <p className="gadget-description">{gadget.description}</p>
                      <div className="price-section">
                        <span className="original-price">₹{gadget.originalPrice}</span>
                        <span className="discounted-price">₹{gadget.discountedPrice}</span>
                        <span className="discount-badge">{gadget.discount}</span>
                      </div>
                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(gadget)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ))}

      {/* Render the modal when a gadget is selected */}
      {isModalOpen && (
        <EnrollModal
          course={selectedItem}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Gadgets;