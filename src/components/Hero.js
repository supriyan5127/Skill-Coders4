import { useState } from 'react';
import ContactModal from './ContactModal';
import './Hero.css';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <h1>UNLOCK YOUR <br />POTENTIAL WITH ONLINE LEARNING</h1>
          <p>Join our community of learners and gain access to top-notch courses designed to elevate your skills. Start your journey towards success today!</p>
          <button className="btn" onClick={openModal}>CONTACT US →</button>
        </div>
      </section>
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Hero;