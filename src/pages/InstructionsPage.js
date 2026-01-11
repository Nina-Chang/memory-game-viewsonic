
const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

const InstructionsPage = ({ navigateTo, backgroundImage }) => {
  const pageStyle = { 
    backgroundImage: `url(${backgroundImage})`,
    width:'1920px',
    height:'1080px',
    loading:'eager'
  };

  return (
    <div className="page-container" style={pageStyle}>
      <span className="sticker-text">How to play</span>
      <div className="instructions-text">
        <p>1. Players take turns flipping two cards.</p>
        <p>2. Earn 1 point for each matching pair.</p>
        <p>3. Player with the most points wins.</p>
      </div>
      <button className="image-button continue-button" onClick={() => navigateTo('cards')}>
        <img src={cfg.images?.btnNext || 'images/object/doodle_memory_next_button.png'} alt="Continue" />
      </button>
    </div>
  );
};

export default InstructionsPage;
