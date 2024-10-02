import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './App.css'; 

const socket = io('http://cricketlivescore.onrender.com'); 

function App() {
  const [score, setScore] = useState({ batting_team: 'India', runs: 0, wickets: 0 });

  useEffect(() => {
    
    const handleScoreUpdate = (updatedScore) => {
      console.log(updatedScore);
      setScore(updatedScore);
    };
    socket.on('scoreUpdate', handleScoreUpdate);
    return () => {
      socket.off('scoreUpdate', handleScoreUpdate); 
    };
  }, []); 
  
  const fetchScores = async () => {
    const batting_team = 'India';
    try {
      const response = await axios.get('http://cricketlivescore.onrender.com/scores', {
        params: { batting_team },
      });
      setScore(response.data.data);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  useEffect(() => {
    fetchScores(); 
  }, []);

  return (
    <div className="App">
      <h1>Live Score Update</h1>
      <h1>Batting Team: {score.batting_team}</h1>
      <div className="scoreboard">
        <h2>{score.runs}/{score.wickets}</h2>
      </div>
    </div>
  );
}

export default App;
