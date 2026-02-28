import './RedTeamBlueTeam.css';

const RedTeamBlueTeam = () => {
  return (
    <section className="cyber-battle">
      {/* Optional scanning line (adds movement) */}
      <div className="scan-line"></div>

      <div className="container">
        <h2>RED TEAM VS BLUE TEAM</h2>
        <p className="subtitle">The Ultimate Cybersecurity Battle Arena</p>
        <p className="description">
          Join the epic showdown. Place your bid, choose your side, and compete for victory.
        </p>

        <div className="teams-container">
          <div className="team red">
            <h3>RED TEAM</h3>
            <p>Offensive hackers breach defenses using advanced attack techniques.</p>
          </div>
          <div className="team blue">
            <h3>BLUE TEAM</h3>
            <p>Defensive experts deploy security measures to counter threats.</p>
          </div>
        </div>

        <div className="prize">
          <p><strong>Win Prizes</strong> – Winners split the prize pool based on their contribution.</p>
        </div>

        {/* Button on its own line */}
        <div className="button-wrapper">
          <a href="/arena" className="btn">ENTER ARENA</a>
        </div>
      </div>
    </section>
  );
};

export default RedTeamBlueTeam;