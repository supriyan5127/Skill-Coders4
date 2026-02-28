import React, { useState } from 'react';
import './Career.css';
import EnrollModal from './EnrollModal';
const jobsData = [
  {
    id: 1,
    title: 'Frontend Development Instructor',
    category: 'Frontend',
    location: 'Remote',
    type: 'Full-time',
    salary: '₹10,000 - ₹30,000',
    experience: '3-5 years',
    description: 'Lead and inspire students in mastering modern frontend technologies including React, TypeScript, and modern CSS frameworks.',
    responsibilities: [
      'Develop comprehensive curriculum for frontend development courses',
      'Conduct live coding sessions and workshops',
      'Mentor students and provide code reviews'
    ],
    requirements: [
      'Expert knowledge in React, TypeScript, HTML5, CSS3',
      '3+ years of professional frontend development experience',
      'Previous teaching or mentoring experience preferred'
    ],
    icon: '🎨'
  },
  {
    id: 2,
    title: 'Backend Development Teacher',
    category: 'Backend',
    location: 'Hybrid',
    type: 'Full-time',
    salary: '₹10,000 - ₹30,000',
    experience: '5-7 years',
    description: 'Educate and guide students through server-side development, databases, APIs, and cloud infrastructure.',
    responsibilities: [
      'Design and deliver backend development curriculum',
      'Teach Node.js, Python, databases, and API design',
      'Guide students through real-world backend projects'
    ],
    requirements: [
      'Strong experience with Node.js, Python, or similar',
      'Deep understanding of databases (SQL and NoSQL)',
      'Experience with RESTful APIs and GraphQL'
    ],
    icon: '⚙️'
  },
  {
    id: 3,
    title: 'Cybersecurity Instructor',
    category: 'Cybersecurity',
    location: 'On-site',
    type: 'Full-time',
    salary: '₹10,000 - ₹30,000',
    experience: '5-7 years',
    description: 'Train the next generation of cybersecurity professionals in ethical hacking, network security, and threat analysis.',
    responsibilities: [
      'Develop cybersecurity training programs and labs',
      'Teach ethical hacking, penetration testing, and security auditing',
      'Create hands-on security exercises and CTF challenges'
    ],
    requirements: [
      'Professional certifications (CEH, OSCP, CISSP, etc.)',
      '5+ years in cybersecurity or related field',
      'Experience with security tools and frameworks'
    ],
    icon: '🔒'
  },
  {
    id: 4,
    title: 'Full Stack Development Mentor',
    category: 'Frontend/Backend',
    location: 'Remote',
    type: 'Part-time',
    salary: '₹10,000 - ₹30,000',
    experience: '3-5 years',
    description: 'Support students learning full-stack development through one-on-one mentoring and project guidance.',
    responsibilities: [
      'Provide personalized mentoring sessions',
      'Review student projects and provide feedback',
      'Help debug and troubleshoot code issues'
    ],
    requirements: [
      'Full-stack development experience',
      'Strong problem-solving skills',
      'Patience and excellent communication'
    ],
    icon: '🧑‍🏫'
  },
  {
    id: 5,
    title: 'Cloud & DevOps Instructor',
    category: 'Backend/DevOps',
    location: 'Remote',
    type: 'Full-time',
    salary: '₹10,000 - ₹30,000',
    experience: '5-7 years',
    description: 'Teach cloud architecture, containerization, CI/CD pipelines, and infrastructure as code to aspiring DevOps engineers.',
    responsibilities: [
      'Create comprehensive DevOps curriculum',
      'Teach Docker, Kubernetes, and cloud services',
      'Guide students through CI/CD implementation'
    ],
    requirements: [
      'Experience with AWS/Azure/GCP',
      'Strong knowledge of Docker and Kubernetes',
      'CI/CD pipeline expertise'
    ],
    icon: '☁️'
  },
  {
    id: 6,
    title: 'Network Security Teacher',
    category: 'Cybersecurity',
    location: 'Hybrid',
    type: 'Full-time',
    salary: '₹10,000 - ₹30,000',
    experience: '5-7 years',
    description: 'Educate students on network security fundamentals, firewalls, VPNs, and advanced threat detection.',
    responsibilities: [
      'Develop network security curriculum',
      'Teach network protocols and security measures',
      'Conduct lab exercises on firewalls and IDS/IPS'
    ],
    requirements: [
      'Network security certifications (CCNP Security, etc.)',
      'Deep understanding of TCP/IP, routing, and switching',
      'Experience with security appliances and SIEM tools'
    ],
    icon: '🌐'
  }
];

const Career = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // State for the modal
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredJobs = jobsData.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleApplyNow = (job) => {
    // Create a course-like object with title from job.title
    const courseLike = { title: job.title };
    setSelectedJob(courseLike);
    setIsModalOpen(true);
  };

  return (
    <div className="career-page">
      {/* Hero Section */}
      <section className="career-hero">
        <div className="container">
          <h1>Join Our Teaching Team</h1>
          <p>Shape the future of tech education. Inspire students and grow your career as an instructor in Frontend, Backend, or Cybersecurity.</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">6</span>
              <span className="stat-label">Open Positions</span>
            </div>
            <div className="stat">
              <span className="stat-number">🌍</span>
              <span className="stat-label">Remote & Hybrid</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Search positions..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <span className="search-count">Showing {filteredJobs.length} positions</span>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="jobs-section">
        <div className="container">
          <div className="jobs-grid">
            {filteredJobs.map(job => (
              <div className="job-card" key={job.id}>
                <div className="job-header">
                  <span className="job-icon">{job.icon}</span>
                  <h2>{job.title}</h2>
                </div>
                <div className="job-meta">
                  <span className="meta-item">📄 {job.category}</span>
                  <span className="meta-item">📍 {job.location}</span>
                  <span className="meta-item">⚙️ {job.type}</span>
                </div>
                <p className="job-description">{job.description}</p>
                
                <div className="job-details">
                  <h3>Key Responsibilities</h3>
                  <ul>
                    {job.responsibilities.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  
                  <h3>Requirements</h3>
                  <ul>
                    {job.requirements.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="job-footer">
                  <div className="salary">
                    <span className="salary-label">Salary Range</span>
                    <span className="salary-value">{job.salary}</span>
                    <span className="experience">{job.experience}</span>
                  </div>
                  <button className="apply-btn" onClick={() => handleApplyNow(job)}>
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Application CTA */}
      <section className="general-cta">
        <div className="container">
          <h2>Don't see the right role?</h2>
          <p>We're always looking for talented educators. Send us your resume and we'll keep you in mind for future opportunities.</p>
          <button className="general-btn">Send General Application</button>
        </div>
      </section>

      {/* Render the modal when a job is selected */}
      {isModalOpen && (
        <EnrollModal
          course={selectedJob}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Career;