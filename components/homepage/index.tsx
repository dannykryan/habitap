"use client";

import Plant from "../../components/plant";
import "src/app/globals.css";
import { useState } from "react";

const URL = "";

export default function Home({
  habitLogsArray,
  habitData,
  goodLuck,
  toggleGoodLuck,
}: any) {
  // count items in the array to set as current score
  let currentScore = habitLogsArray.length;
  // count habits in habit table to calculate maxScore
  let maxScore = habitData.length * 10;
  console.log(maxScore);
  // calculate percentage decimal
  let percentageDecimal = currentScore / maxScore;

  // const increaseScore = () => {
  //   setScore(score + 1);
  // };
  // const decreaseScore = () => {
  //   setScore(score - 1);
  // };

  return (
    <>
      <div className="popup" style={{ display: goodLuck ? "flex" : "none" }}>
        <h3>Your journey starts here!</h3>
        <p>
          Check back here as your plant grows every time you tick off a habit.
          Good Luck!
        </p>
        <div className="popupBtnContainer">
          <div className="midBtn" onClick={toggleGoodLuck}>
            OK
          </div>
        </div>
      </div>
      <div id="plant-progress-container">
        <Plant percentageDecimal={percentageDecimal} />
        <p>Habit progress</p>
      </div>
      {/* <button onClick={increaseScore}>Increase</button>
      <button onClick={decreaseScore}>Decrease</button> */}
    </>
  );
}
