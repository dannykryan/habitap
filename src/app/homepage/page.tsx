"use client";

import Plant from "../../../components/plant";
import ListBtn from "../../components/listBtn";
import Link from "next/link";

import Prompt from "../../../components/prompt";
import { useState } from "react";
import MainBtn from "../../../components/MainBtn";

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
      <Link href="/myList">
        <MainBtn text="MyList" />
      </Link>
      <button onClick={handleClick}>Click</button>
    </>
  );
}
