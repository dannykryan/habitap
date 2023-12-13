"use client";

import Plant from "../../components/plant";
import { useState } from "react";

const URL = "";

export default function Home() {
  let [score, setScore] = useState(0);
  
  const increaseScore = () => {
    setScore(score + 1);
  };
  const decreaseScore = () => {
    setScore(score - 1);
  };
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
