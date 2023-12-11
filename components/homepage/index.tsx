"use client";

import Plant from "../../components/plant";
import Link from "next/link";

import Prompt from "../../components/prompt"
import { useState } from "react";
import MainBtn from "../../components/MainBtn";

const URL = "";

export default function Home( { handleBtn } ) {
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
        <MainBtn onClick={handleBtn} />
      <button onClick={handleClick}>Click</button>
    </>
  );
}
