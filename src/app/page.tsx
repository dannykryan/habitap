"use client";

import Plant from "../../components/plant";
import ListBtn from "../../components/listBtn";
import Link from "next/link";
import { useState } from "react";

const URL = "";

export default function Home() {
  let [score, setScore] = useState(0);
  const handleClick = () => {
    setScore(score + 20);
  };
  return (
    <>
      <h1 id="habitap-header">Habitap</h1>
      <Plant score={score} />
      <p>Habit progress</p>
      <Link href="/myList">
        <ListBtn />
      </Link>
      <button onClick={handleClick}>Click</button>
    </>
  );
}
