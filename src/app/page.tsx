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
  const [date, setDate] = useState(false);
  const [habitLogsArray, setHabitLogsArray] = useState<HabitLog[] | null>(null);
  const [goodLuck, setGoodLuck] = useState<any>(false);
  const currentDate = new Date();
  let tenDaysPassed = false;
  let currentScore = habitLogsArray?.length ?? 0;
  let maxScore = habitData?.length ? habitData.length * 10 : 0;
  let percentageDecimal = maxScore ? currentScore / maxScore : 0;

  const handleMainBtnClick = () => {
    setIsMyListVisible((prevValue) => !prevValue);
  };

  function toggleIsCommitted(): any {
    setisCommitted(!isCommitted);
  }

  function toggleDate(): any {
    setDate(!date);
  }

  function toggleGoodLuck() {
    setGoodLuck(!goodLuck);
  }

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("habit_table").select("*");
      setHabitData(data);
    };
    getData();
  }, [isMyListVisible]);

  useEffect(() => {
    const getHabitLogs = async () => {
      const { data: habitLogs, error: habitLogsError } = await supabase
        .from("habit_log")
        .select("*");
      setHabitLogsArray(habitLogs);
    };
    getHabitLogs();
  }, [isMyListVisible]);

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

  return (
    <>
      {isMyListVisible ? (
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
              handleMainBtnClick={handleMainBtnClick}
              goodLuck={goodLuck}
              toggleGoodLuck={toggleGoodLuck}
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
          />
          {tenDaysPassed && (
            <EndingPopup
              tenDaysPassed={tenDaysPassed}
              maxScore={maxScore}
              currentScore={currentScore}
            />
          )}
          {/* Button to simulate advancing time by 10 days */}
          <button onClick={advanceTime}>Advance Time by 10 Days</button>
        </>
      )}
      <MainBtn isMyListPage={isMyListVisible} onClick={handleMainBtnClick} />
    </>
  );
}
// here will be the state and based on the state change the homepage will be rendered or the MyList
// as default it will be the homepage(then changed with login page)
//onclick of the MainBttn the state changes to MyList

// type Habit = Database["public"]["Tables"]["habit_table"]["Row"];