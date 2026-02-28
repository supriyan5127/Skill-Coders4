import './About.css';

const About = () => {
  return (
    <section className="about">
      {/* Scanning line across the whole section */}
      <div className="scan-line"></div>

      <div className="container">
        <h2 className="glitch" data-text="ABOUT US">ABOUT US</h2>
        <h3 className="flicker">Welcome to Skill Coders</h3>

        <div className="content-card">
          <p>
            We are a passionate community of gamers, developers, and content creators dedicated to bringing you the best gaming experience. Our platform offers cutting-edge courses, tutorials, and resources to help you level up your gaming and coding skills.
          </p>
          <p>
            From beginner-friendly guides to advanced programming techniques, we've built a comprehensive learning ecosystem where gaming meets technology. Join thousands of learners who are transforming their passion into expertise.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;