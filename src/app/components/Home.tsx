"use client";

import Plant from "./Plant";
import "../globals.css";
import { useAppContext } from "../context";

export default function Home() {

  const {
    toggleTenDaysPassed,
    goodLuck,
    toggleGoodLuck,
} = useAppContext();

  function handleOkayBtn() {
    toggleGoodLuck();
    toggleTenDaysPassed();
  }

  // This is the home page of the application where the habit plant lives. The popup is only displayed only when the user first commits to some habits by selecting 'commit' on the CommitPopup.

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
        <Plant />
      </div>
    </>
  );
}
