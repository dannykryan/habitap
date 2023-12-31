"use client";

import Plant from "../plant/index";
import "src/app/globals.css";
import {HomeProps} from "../../types/types";

export default function Home({
  currentScore,
  maxScore,
  percentageDecimal,
  habitLogsArray,
  habitData,
  goodLuck,
  toggleGoodLuck,
  toggleTenDaysPassed,
  showGrowth,
}: HomeProps) {

  function handleOkayBtn() {
    toggleGoodLuck();
    toggleTenDaysPassed();
  }

  return (
    <>
      <div className="popup" style={{ display: goodLuck ? "flex" : "none" }}>
        <h3>Your journey starts here!</h3>
        <p>
          Check back here as your plant grows every time you tick off a habit.
          Good Luck!
        </p>
        <div className="popupBtnContainer">
          <div className="midBtn" onClick={handleOkayBtn}>
            OK
          </div>
        </div>
      </div>
      <div id="plant-progress-container">
        <Plant percentageDecimal={percentageDecimal} showGrowth={showGrowth}/>
      </div>
    </>
  );
}
