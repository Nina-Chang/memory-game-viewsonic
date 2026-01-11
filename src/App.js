import './App.css';
import { useState, useEffect, useRef } from 'react';
import StartPage from './pages/StartPage';
import InstructionsPage from './pages/InstructionsPage';
import CardsPage from './pages/CardsPage';
import ScoresPage from './pages/ScoresPage';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

const backgroundImages = {
  start: cfg.images?.bgStart || './images/background/doodle_matching_01_FHD.png',
  instructions: cfg.images?.bgInstructions || './images/background/doodle_matching_02_FHD.png',
  cards: cfg.images?.bgCards || './images/background/doodle_matching_03_FHD.png', 
  scores: cfg.images?.bgScores || './images/background/doodle_matching_06_FHD.png',
};

function App() {
  const [page, setPage] = useState('start');
  const [players, setPlayers] = useState(cfg.players || []);
  const [scale, setScale] = useState(1);
  const audioRef=useRef(null)

  const navigateTo = (pageName) => setPage(pageName);

  const gameStyle = { 
    transform: `scale(${scale})`,
  };

  const handleStartGame=()=>{
    if(audioRef.current && audioRef.current.paused){
      audioRef.current.volume=0.5
      audioRef.current.currentTime = 0; // 從頭開始播放
      audioRef.current.play().catch((error)=>{
        console.log("Audio failed",error)
      })
    }
    navigateTo('instructions')
  }

  useEffect(() => {
    // 視窗縮放
    const handleResize = () => {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      setScale(Math.min(scaleX, scaleY));
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="game-viewport">
      <div style={gameStyle}>
        {page === 'start' && (<StartPage navigateTo={navigateTo} onStartGame={handleStartGame} backgroundImage={backgroundImages.start}/>)}
        {page === 'instructions' && (<InstructionsPage navigateTo={navigateTo} backgroundImage={backgroundImages.instructions}/>)}
        {page === 'cards' && (<CardsPage bgmAudio={audioRef.current} navigateTo={navigateTo} players={players} setPlayers={setPlayers} backgroundImage={backgroundImages.cards}/>)}
        {page === 'scores' && (<ScoresPage players={players} setPlayers={setPlayers} bgmAudio={audioRef.current} navigateTo={navigateTo} backgroundImage={backgroundImages.scores}/>)}
      </div>

      <audio ref={audioRef} src={cfg.sounds?.bgm || './sounds/funny-cartoon-no-copyright-music.mp3'} loop preload='auto'/>
    </div>
  );
}

export default App;
