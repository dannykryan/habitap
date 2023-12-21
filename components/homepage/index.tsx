"use client";

import Plant from "../plant/index";
import "src/app/globals.css";
import { HabitLog, Habit } from "../../src/app/page";

interface HomeProps {
  currentScore: number;
  maxScore: number;
  percentageDecimal: number;
  habitLogsArray: HabitLog[] | null;
  habitData: Habit[] | null;
  goodLuck: boolean;
  toggleGoodLuck: () => void;
}

export default function Home({
  currentScore,
  maxScore,
  percentageDecimal,
  habitLogsArray,
  habitData,
  goodLuck,
  toggleGoodLuck,
}: HomeProps) {

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
      </div>
    </>
  );
}
