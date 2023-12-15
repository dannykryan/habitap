"use client";

import Plant from "../../components/plant";
import { useState } from "react";

const URL = "";

export default function Home({habitLogsArray} : any) {
  // count items in the array to set as current score
  let currentScore = habitLogsArray.length
  
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
        <Plant score={score} />
        {/* <p>Habit progress</p> */}
      </div>
      <button onClick={increaseScore}>Increase</button>
      <button onClick={decreaseScore}>Decrease</button>
    </>
  );
}
