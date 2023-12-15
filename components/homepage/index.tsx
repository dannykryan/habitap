"use client";

import Plant from "../../components/plant";
import { useState } from "react";

const URL = "";

export default function Home({habitLogsArray} : any) {
  // count items in the array to set as current score
  const [currentScore, setCurrentScore] = useState(habitLogsArray.length);
  
  // const increaseScore = () => {
  //   setScore(score + 1);
  // };
  // const decreaseScore = () => {
  //   setScore(score - 1);
  // };

  
  // count habits in habit table to calculate maxScore
  // calculate percentage decimal

  return (
    <>
      <div id="plant-progress-container">
        <Plant score={currentScore} />
        {/* <p>Habit progress</p> */}
      </div>
      <button onClick={() => setCurrentScore(currentScore + 1)}>Increase</button>
      <button onClick={() => setCurrentScore(currentScore - 1)}>Decrease</button>
    </>
  );
}
