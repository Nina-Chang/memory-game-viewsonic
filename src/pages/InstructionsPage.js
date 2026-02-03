import { useState } from 'react';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

const InstructionsPage = ({ navigateTo, backgroundImage }) => {
  const [buttonScale, setButtonScale] = useState(1);
  const pageStyle = { 
    backgroundImage: `url(${backgroundImage})`,
    width:'1920px',
    height:'1080px',
    loading:'eager'
  };

  const handleClick=async()=>{
    setButtonScale(0.9);
    await new Promise(resolve => setTimeout(resolve, 100));
    setButtonScale(1);
    await new Promise(resolve => setTimeout(resolve, 300));
    navigateTo('cards')
  }

  return (
    <div className="page-container" style={pageStyle}>
      <span className="sticker-text">How to play</span>
      <div className="instructions-text">
        <p>1. Players take turns flipping two cards.</p>
        <p>2. Earn 1 point for each matching pair.</p>
        <p>3. Player with the most points wins.</p>
      </div>
      <div className="continue-button loop-animation">
        <button 
        onMouseEnter={() => setButtonScale(1.1)}
        onMouseLeave={() => setButtonScale(1)}
        style={{transform: `scale(${buttonScale})`}}
        className="image-button" 
        onClick={() => handleClick()}>
          <img src={cfg.images?.btnNext || 'images/object/doodle_matching_next_button.png'} alt="Continue" />
        </button>
      </div>
    </div>
  );
};

export default InstructionsPage;
