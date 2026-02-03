import { useState } from 'react';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

const StartPage = ({ onStartGame, backgroundImage }) => {
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
    onStartGame();
  }

  return (
    <div className="page-container start-page" style={pageStyle}>
      <h1 className='start-page-title'>{cfg.strings?.startTitle || 'Memory'}</h1>
      <button 
      className="image-button start-button-center" 
      onMouseEnter={() => setButtonScale(1.1)}
      onMouseLeave={() => setButtonScale(1)}
      style={{transform: `translate(-50%, -50%) scale(${buttonScale})`}}
      onClick={handleClick}>
        <img src={cfg.images?.btnStart || 'images/start.png'} alt="Start Game" />
        <span className="start-button-text">Start</span>
      </button>
    </div>
  );
};

export default StartPage;
