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

    const cardControllers = document.querySelectorAll("[data-card-controller]");

    cardControllers.forEach(controller => {
      controller.addEventListener("click", (e) => {
        const card = e.currentTarget.parentElement.parentElement;
        const isVisible = card.dataset.visible;

        if (isVisible === "false") {
          card.setAttribute("data-visible", true);
        } else {
          card.setAttribute("data-visible", false);
        }
      });
    });

    // Clean up event listeners when the component is unmounted
    return () => {
      cardControllers.forEach(controller => {
        controller.removeEventListener("click", () => {});
      });
    };
  }, []);
  

  const scoreBoard = leaderboardData.map((player, index) => ({
    name: player.discord,
    viewCount: `${player.points} points`,
  }));
  const buttonClick = (value) => {
    // Handle button click logic here
    console.log(`Button clicked: ${value}`);
  };

  return (
    <div className="container">
      <div className="frame">
      <header className="heading">My Leaderboard</header> {/* Add a heading element */}
        <header>Leaderboard</header>
        <div className="button-group" data-left="4px">
          <button onClick={() => buttonClick('4px')}>Last 30 days</button>
          <button onClick={() => buttonClick('50%')}>All time</button>
        </div>
       
        <div className="score-card">
          {scoreBoard.map((item, index) => (
            <div className="leader" key={index}>
              <div className="user">
                <div className="number">{index}</div>
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
