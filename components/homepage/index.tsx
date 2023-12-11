"use client";

import Plant from "../../components/plant";
import { useState } from "react";

const URL = "";

export default function Home() {
  let [score, setScore] = useState(0);
  const handleClick = () => {
    setScore(score + 20);
  };
  return (
    <>
      <div id="plant-progress-container">
        <Plant score={score} />
        <p>Habit progress</p>
      </div>
      <button onClick={handleClick}>Click</button>
    </>
  );
}
