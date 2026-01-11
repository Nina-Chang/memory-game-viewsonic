import React, { useEffect } from 'react';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

const ScoresPage = ({ players,setPlayers,bgmAudio, navigateTo, backgroundImage }) => {
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

  const handleHomeButton = () => {
    navigateTo('start')
    setPlayers(cfg.players || []);
  }

  const handleAgainButton = () => {
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
        <button className="image-button" onClick={handleHomeButton}>
          <img src={cfg.images?.btnHome || 'images/object/doodle_memory_home_button.png'} alt="Back to Home" />
        </button>
        <button className="image-button" onClick={handleAgainButton}>
          <img src={cfg.images?.btnAgain || 'images/object/doodle_memory_again_button.png'} alt="Reset Scores" />
        </button>
      </div>

    </div>
  );
};

export default ScoresPage;
