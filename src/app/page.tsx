"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ButtonBar from "../../components/ButtonBar";
import ActiveList from "../../components/ActiveList";
import NewRoutineForm from "../../components/NewRoutineForm";
import Home from "../../components/homepage/index";
import EndingPopup from "../../components/EndingPopup";
import Prompt from "../../components/prompt/index";
import supabase from "../../lib/initSupabase";
import { HabitLog, Habit } from "../../types/types";

export default function Parent() {
  const currentDate = new Date();
  const [habitData, setHabitData] = useState<Habit[] | null>(null);
  const [isCommitted, setisCommitted] = useState<boolean>(false);
  const [date, setDate] = useState<boolean>(false);
  const [habitLogsArray, setHabitLogsArray] = useState<HabitLog[] | null>(null);
  const [goodLuck, setGoodLuck] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("list"); // Default to "list"
  const [showGrowth, setShowGrowth] = useState<string>("normal");

  let router = useRouter();

  function toggleGoodLuck() {
    setGoodLuck(!goodLuck);
  }

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("habit_table")
        .select("*")
        .eq("user_id", "1");
      setHabitData(data);
    };
    getData();
  }, [activePage]);

  // Function to handle List Btn click (for button bar)
  const handleListBtnClick = () => {
    setActivePage("list");
  };

  // Function to handle Flower Btn click(for button bar)
  const handleFlowerBtnClick = () => {
    setActivePage("flower");
    console.log(activePage)
  };

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

  // Calculate the current score, max score, and percentage completion
  let tenDaysPassed = false;
  let currentScore = habitLogsArray?.length ?? 0;
  let maxScore = habitData?.length ? habitData.length * 10 : 0;
  let percentageDecimal = maxScore ? (currentScore / maxScore) : 0;

  // Function to toggle commitment status
  function toggleIsCommitted() {
    setisCommitted(!isCommitted);
  }

  // Function to toggle date (It seems you're not using this function)
  function toggleDate() {
    setDate(!date);
  }

  // Effect hook to fetch data from the "habit_log" table when isMyListVisible changes
  useEffect(() => {
    const getHabitLogs = async () => {
      const { data: habitLogs, error: habitLogsError } = await supabase
        .from("habit_log")
        .select("*");
      setHabitLogsArray(habitLogs);
    };
    getHabitLogs();
  }, [activePage]);

  // Check if habitData is available and calculate tenDaysPassed
  if (habitData) {
    const startDate = new Date(habitData[0]?.created_at);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 10);
    tenDaysPassed = currentDate >= endDate;
  }

  // Function to simulate advancing time by 10 days
  const endRoutine = () => {
    if (habitData) {
      const updatedHabitData = habitData.map((habit) => {
        const newStartDate = new Date(habit.created_at);
        newStartDate.setDate(newStartDate.getDate() - 10);
        return { ...habit, created_at: newStartDate.toISOString() };
      });
      setHabitData(updatedHabitData);
    }
  };

  const clearDatabase = async () => {
    // Delete all records from habit_log
    const { error: deleteLogError } = await supabase
      .from("habit_log")
      .delete()
      .eq("user_id", "1");
    if (deleteLogError) {
      console.error("Error deleting habit_log records:", deleteLogError);
      return;
    }

    // Delete records from habit_table
    const { error: deleteError } = await supabase
      .from("habit_table")
      .delete()
      .eq("user_id", "1");

    if (deleteError) {
      console.error("Error deleting habit_table records:", deleteError);
      return;
    }
  };

  console.log(activePage)
  console.log(isCommitted)

  useEffect(() => {
    console.log('habitData in Parent:', habitData);
  }, [habitData]);

  return (
    <>
      <Prompt
        tenDaysPassed={tenDaysPassed}
        isCommitted={isCommitted}
        maxScore={maxScore}
        currentScore={currentScore}
        percentageDecimal={percentageDecimal}
        toggleIsCommitted={toggleIsCommitted}
        activePage={activePage}
      />
      {activePage == "list" ? (
        isCommitted ? (
          <div>
            <ActiveList
              taskData={habitData}
              date={date}
              toggleDate={toggleDate}
              toggleIsCommitted={toggleIsCommitted}
            />
          </div>
        ) : (
          <div>
            <NewRoutineForm
              toggleIsCommitted={toggleIsCommitted}
              isCommitted={isCommitted}
              goodLuck={goodLuck}
              toggleGoodLuck={toggleGoodLuck}
              setActivePage={setActivePage}
              activePage={activePage}
            />
          </div>
        )
      ) : (
        <>
          <Home
            currentScore={currentScore}
            maxScore={maxScore}
            percentageDecimal={percentageDecimal}
            habitLogsArray={habitLogsArray}
            habitData={habitData}
            goodLuck={goodLuck}
            toggleGoodLuck={toggleGoodLuck}
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
              handleListBtnClick={handleListBtnClick}
              clearDatabase={clearDatabase}
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
      )}
      <ButtonBar
        handleListBtnClick={handleListBtnClick}
        handleFlowerBtnClick={handleFlowerBtnClick} // Provide the appropriate handler
      />  
    </>
  );
}
