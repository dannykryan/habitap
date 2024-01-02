"use client"

import React, { useState, useEffect } from "react";
import ButtonBar from "../../components/ButtonBar";
import Home from "../../components/homepage/index";
import EndingPopup from "../../components/EndingPopup";
import Prompt from "../../components/prompt/index";
import { useAppContext } from "./context";
import { Habit } from "../../types/types";

export default function Page() {

  const {
      currentDate,
      isCommitted,
      setIsCommitted,
      habitData,
      setHabitData,
      habitLogsArray,
      setHabitLogsArray,
      tenDaysPassed,
      toggleTenDaysPassed,
      currentScore,
      maxScore,
      percentageDecimal,
      toggleIsCommitted,
      activePage,
      setActivePage,
      goodLuck,
      toggleGoodLuck,
  } = useAppContext();

  const [date, setDate] = useState<boolean>(false);
  const [showGrowth, setShowGrowth] = useState<string>("normal");
  const handleShowGrowthBtn = () => {
    if (showGrowth === "normal") {
      setShowGrowth("growth");
    } else if (showGrowth === "growth") {
      setShowGrowth("max");
    } else {
      setShowGrowth("normal");
    }

    setTimeout(() => {
      setShowGrowth("normal");
    }, 30000);
  };

  // Function to simulate advancing time by 10 days
  const endRoutine = () => {
    if (habitData) {
      const updatedHabitData = habitData.map((habit: Habit) => {
        const newStartDate = new Date(habit.created_at);
        newStartDate.setDate(newStartDate.getDate() - 10);
        return { ...habit, created_at: newStartDate.toISOString() };
      });
      setHabitData(updatedHabitData);
    }
  };

  return (
    <>
      <Prompt
        tenDaysPassed={tenDaysPassed}
        isCommitted={isCommitted}
        maxScore={maxScore}
        currentScore={currentScore}
        percentageDecimal={percentageDecimal}
      />
        <>
          <Home
            currentScore={currentScore}
            maxScore={maxScore}
            percentageDecimal={percentageDecimal}
            habitLogsArray={habitLogsArray}
            habitData={habitData}
            goodLuck={goodLuck}
            toggleGoodLuck={toggleGoodLuck}
            toggleTenDaysPassed={toggleTenDaysPassed}
            showGrowth={showGrowth}
          />
          {tenDaysPassed && (
            // Render EndingPopup component when ten days have passed
            <EndingPopup
              tenDaysPassed={tenDaysPassed}
              maxScore={maxScore}
              currentScore={currentScore}
              percentageDecimal={percentageDecimal}
              toggleIsCommitted={toggleIsCommitted}
              isCommitted={isCommitted}
            />
          )}
          <div className="dev-btn-container">
            {/* Button to show maximum plant growth for 10 seconds */}
            <button id="showGrowthBtn" onClick={handleShowGrowthBtn}></button>
            {/* Button to simulate advancing time by 10 days */}
            <button id="endRoutineBtn" onClick={endRoutine}></button>
          </div>
        </>
      <ButtonBar />
    </>
  );
}
