"use client";

import Plant from "../../components/plant";
import { useState } from "react";

const URL = "";

export default function Home({habitLogsArray, habitData} : any) {
  // count items in the array to set as current score
  let currentScore = habitLogsArray.length
  // count habits in habit table to calculate maxScore
  let maxScore = habitData.length * 10
  console.log(maxScore)
  // calculate percentage decimal
  let percentageDecimal = currentScore / maxScore
  
  // const increaseScore = () => {
  //   setScore(score + 1);
  // };
  // const decreaseScore = () => {
  //   setScore(score - 1);
  // };


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
