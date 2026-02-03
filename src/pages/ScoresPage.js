import React, { useEffect,useState } from 'react';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

const ScoresPage = ({ players,setPlayers,bgmAudio, navigateTo, backgroundImage }) => {
  const [buttonScale, setButtonScale] = useState({home:1, again:1});

  const pageStyle = { 
    backgroundImage: `url(${backgroundImage})`,
    width:'1920px',
    height:'1080px',
    loading:'eager'
  };

  // 分數排序
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  useEffect(() => {
    if(bgmAudio && !bgmAudio.paused){
      bgmAudio.pause();
    }
    const audioPlayer =new Audio(cfg.sounds.congrats || './sounds/congrats.mp3');
    audioPlayer.play().catch((error)=>{console.log("Audio failed",error)});
  }, []);

  const handleHomeButtonClick=async()=>{
    setButtonScale(prev => ({...prev, home:0.9}));
    await new Promise(resolve => setTimeout(resolve, 100));
    setButtonScale(prev => ({...prev, home:1}));
    await new Promise(resolve => setTimeout(resolve, 300));
    handleAfterClickingHomeButton();
  }

  const handleAgainButtonClick=async()=>{
    setButtonScale(prev => ({...prev, again:0.9}));
    await new Promise(resolve => setTimeout(resolve, 100));
    setButtonScale(prev => ({...prev, again:1}));
    await new Promise(resolve => setTimeout(resolve, 300));
    handleAfterClickingAgainButton();
  }

  const handleAfterClickingHomeButton = () => {
    navigateTo('start')
    setPlayers(cfg.players || []);
  }

  const handleAfterClickingAgainButton = () => {
    navigateTo('cards')
    setPlayers(cfg.players || []);
  }

  return (
    <div className="page-container" style={pageStyle}>
      <img className="scores-frame" src={'images/object/doodle_memory_result_frame.png'} alt="Result Frame" />
      <h1 className="scores-title">{cfg.strings?.scoresTitle || 'Scores'}</h1>
      <ol className="scores-list">
        {sortedPlayers.map((player) => (
          <li key={player.id}>
            <img src={(cfg.images?.finchPlayers?.[player.id-1]) || `images/object/doodle_memory_finch_0${player.id}.png`} alt={player.name} />
            <img className="score-item-frame" src={"images/object/doodle_memory_point_frame.png"} alt={"point frame"} />
            <span>{player.score}</span>
            {sortedPlayers[0].score === player.score && player.score !== 0 && (
              <img className='trophy-img' src={cfg.images?.trophy || 'images/stage_jeopardy_trophy.png'} alt='Champion' />
            )}
          </li>
        ))}
      </ol>
      <div className="scores-buttons-container">
        <button className="image-button" 
        onMouseEnter={() => setButtonScale(prev => ({...prev, home:1.1}))}
        onMouseLeave={() => setButtonScale(prev => ({...prev, home:1}))}
        style={{transform: `scale(${buttonScale.home})`}}
        onClick={handleHomeButtonClick}>
          <img src={cfg.images?.btnHome || 'images/object/doodle_memory_home_button.png'} alt="Back to Home" />
        </button>
        <button className="image-button"
        onMouseEnter={() => setButtonScale(prev => ({...prev, again:1.1}))}
        onMouseLeave={() => setButtonScale(prev => ({...prev, again:1}))}
        style={{transform: `scale(${buttonScale.again})`}}
        onClick={handleAgainButtonClick}>
          <img src={cfg.images?.btnAgain || 'images/object/doodle_memory_again_button.png'} alt="Reset Scores" />
        </button>
      </div>

    </div>
  );
};

export default ScoresPage;
