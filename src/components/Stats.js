import './Stats.css';

const statsData = [
  { number: '10K+', label: 'ACTIVE LEARNERS' },
  { number: '50+', label: 'COURSES' },
  { number: '100+', label: 'EXPERT MENTORS' },
];

const Stats = () => {
  return (
    <section className="stats">
      <div className="container stats-container">
        {statsData.map((stat, index) => (
          <div className="stat-item" key={index}>
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;