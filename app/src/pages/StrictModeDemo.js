import { useEffect, useState } from "react";
import { StrictMode } from 'react';

const StrictModeDemo = () => {
  const [isHover, setIsHover] = useState(false);
  const [timer, setTimer] = useState(0);
  const [speedFactor, setSpeedFactor] = useState(1000);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer(timer + 1);
    }, speedFactor);
    return () => clearInterval(timerInterval);
  }, [speedFactor, timer]);

  const makeTimerFast = () => {
    setSpeedFactor(speedFactor / 2);
    console.log('speedFactor is now= ', speedFactor / 2);
  }

  const makeTimerSlower = () => {
    setSpeedFactor(speedFactor * 2);
    console.log('speedFactor is now= ', speedFactor * 2);
  }

  let stories = [ 
    {id: 0, label: "Ankit's Story" },
    {id: 1, label: "Taylor's Story" },
  ];
  const element = (
      <>
        <div
          style={{
            textAlign: 'center',
            marginTop: '30%',
          }}
        >
          <ul onPointerEnter={() => {setIsHover(true)}}
              onPointerLeave={() => {setIsHover(false)}}
              style={{backgroundColor: isHover ? '#ddd' : 'fff'}}>
            {stories.map(story => (
              <li key={story.id}>{story.label}</li>
            ))}
          </ul>
        </div>
        <div>
          <p>Timer</p>
          <p>
            {timer}
          </p>
        </div>
        <div>
          <span>
            <button onClick={makeTimerSlower}>Slower</button>
            <button onClick={makeTimerFast}>Faster</button>
          </span>
        </div>
      </>
  );


  return (
    <StrictMode>
      {element}
    </StrictMode>
  );
};

export default StrictModeDemo;