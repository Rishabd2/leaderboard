import React, { useEffect, useState } from 'react';
import { fetchAttendeesPoints } from '../api';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  
  useEffect(() => {
    const limit = 10;

    fetchAttendeesPoints(limit)
      .then(data => {
        if (data !== null) {
          setLeaderboardData(data);
        } else {
          console.log('Failed to fetch leaderboard data');
        }
      })
      .catch(error => {
        console.error(error);
      });


  }, []);
  

  const scoreBoard = leaderboardData.map((player, index) => ({
    name: player.discord,
    viewCount: `${player.points} points`,
    image: 'src\components\discord-profile-pictures-xk3qyllfj1j46kte.jpg'
  }));
  const buttonClick = (value) => {
    console.log(`Button clicked: ${value}`);
  };

  return (
    <div className="container">
      <div className="frame">
      <header className="heading">Hack Illinois</header> 
        <header>Leaderboard</header>
        {/* <div className="button-group" data-left="4px">
          <button onClick={() => buttonClick('4px')}>Last 30 days</button>
          <button onClick={() => buttonClick('50%')}>All time</button>
        </div> */}
       
        <div className="score-card">
          {scoreBoard.map((item, index) => (
            <div className="leader" key={index}>
              <div className="user">
                <div className="number">{index+1}</div>
                <div className="user-pic"></div>
              </div>
              <div className="user-info">
                <div className="user-name">{item.name}</div>
                <div className="view-count">{item.viewCount}</div>
              </div>
              <div className="gallery">
                 {[1, 2, 3].map((item, index) => (
                   <div className="gallery-item" key={index}></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="cta-primary">View everyone</button>
      </div>
    </div>
  );
                };  

export default Leaderboard;
export { fetchAttendeesPoints };