"use client";
import React from "react";
import Home from "../../components/homepage/index";
import NewRoutineForm from "../../components/NewRoutineForm";
import ActiveList from "../../components/ActiveList";
import { useState, useEffect } from "react";
import MainBtn from "../../components/MainBtn";
import supabase from "../../lib/initSupabase";
import EndingPopup from "../../components/EndingPopup";

interface Habit {
  habit_id: string;
  habit_name: string;
  created_at: string;
  completed: boolean;
  current_score: number;
  max_score: number;
  user_id: number;
}

interface HabitLog {
  habit_id: string;
  completed_at: string;
  user_id: number;
}

export default function Parent() {
  const [habitData, setHabitData] = useState<Habit[] | null>(null);
  const [isMyListVisible, setIsMyListVisible] = useState<boolean>(true);
  const [isCommitted, setisCommitted] = useState(false);
  const [date, setDate] = useState(false); // It seems you're not using this state
  const [habitLogsArray, setHabitLogsArray] = useState<HabitLog[] | null>(null);
  const [goodLuck, setGoodLuck] = useState<any>(false); // It seems you're not using this state
  const currentDate = new Date(); // Get the current date

  // Calculate the current score, max score, and percentage completion
  let tenDaysPassed = false;
  let currentScore = habitLogsArray?.length ?? 0;
  let maxScore = habitData?.length ? habitData.length * 10 : 0;
  let percentageDecimal = maxScore ? (currentScore / maxScore) * 100 : 0;

  // Function to handle MainBtn click, toggles visibility of My List
  const handleMainBtnClick = () => {
    setIsMyListVisible((prevValue) => !prevValue);
  };

  // Function to toggle commitment status
  function toggleIsCommitted(): any {
    setisCommitted(!isCommitted);
  }

  // Function to toggle date (It seems you're not using this function)
  function toggleDate(): any {
    setDate(!date);
  }

  // Function to toggle good luck (It seems you're not using this function)
  function toggleGoodLuck() {
    setGoodLuck(!goodLuck);
  }

  // Effect hook to fetch data from the "habit_table" table when isMyListVisible changes
  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("habit_table").select("*");
      setHabitData(data);
    };
    getData();
  }, [isMyListVisible]);

  // Effect hook to fetch data from the "habit_log" table when isMyListVisible changes
  useEffect(() => {
    const getHabitLogs = async () => {
      const { data: habitLogs, error: habitLogsError } = await supabase
        .from("habit_log")
        .select("*");
      setHabitLogsArray(habitLogs);
    };
    getHabitLogs();
  }, [isMyListVisible]);

  // Check if habitData is available and calculate tenDaysPassed
  if (habitData) {
    const startDate = new Date(habitData[0]?.created_at);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 10);
    tenDaysPassed = currentDate >= endDate;
  }

  // Function to simulate advancing time by 10 days
  const advanceTime = () => {
    if (habitData) {
      const newStartDate = new Date(habitData[0]?.created_at);
      newStartDate.setDate(newStartDate.getDate() - 10); // Move back by 10 days
      setHabitData([{ ...habitData[0], created_at: newStartDate.toISOString() }]);
    }
  };

  // Render the component
  return (
    <>
      {/* Render components based on visibility state */}
      {isMyListVisible ? (
        isCommitted ? (
          <div>
            {/* Render ActiveList component */}
            <ActiveList
              taskData={habitData}
              date={date}
              toggleDate={toggleDate}
              toggleIsCommitted={toggleIsCommitted}
            />
          </div>
        ) : (
          <div>
            {/* Render NewRoutineForm component */}
            <NewRoutineForm
              toggleIsCommitted={toggleIsCommitted}
              isCommitted={isCommitted}
              handleMainBtnClick={handleMainBtnClick}
              goodLuck={goodLuck}
              toggleGoodLuck={toggleGoodLuck}
            />
          </div>
        )
      ) : (
        <>
          {/* Render Home component */}
          <Home
            currentScore={currentScore}
            maxScore={maxScore}
            percentageDecimal={percentageDecimal}
            habitLogsArray={habitLogsArray}
            habitData={habitData}
            goodLuck={goodLuck}
            toggleGoodLuck={toggleGoodLuck}
          />
          {tenDaysPassed && (
            // Render EndingPopup component when ten days have passed
            <EndingPopup
              tenDaysPassed={tenDaysPassed}
              maxScore={maxScore}
              currentScore={currentScore}
              percentageDecimal={percentageDecimal}
            />
          )}
          {/* Button to simulate advancing time by 10 days */}
          <button onClick={advanceTime}>Advance Time by 10 Days</button>
        </>
      )}
      {/* Render MainBtn component */}
      <MainBtn isMyListPage={isMyListVisible} onClick={handleMainBtnClick} />
    </>
  );
}
