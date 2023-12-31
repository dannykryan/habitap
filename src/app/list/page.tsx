"use client"

import Prompt from "../../../components/prompt";
import ActiveList from "../../../components/ActiveList";
import NewRoutineForm from "../../../components/NewRoutineForm";
import React, { useState, useEffect } from "react";
import supabase from "../../../lib/initSupabase";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export default function List() {
  const [habitData, setHabitData] = useState<Habit[] | null>(null);
  const [isCommitted, setIsCommitted] = useState<boolean>(false);
  const [habitLogsArray, setHabitLogsArray] = useState<HabitLog[] | null>(null);
  const [goodLuck, setGoodLuck] = useState<boolean>(false);

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
  }, []);

  useEffect(() => {
    // Update isCommitted when habitData changes
    if (habitData !== null) {
      setIsCommitted(habitData.length > 0);
    }
  }, [habitData]);

  // Effect hook to fetch data from the "habit_log" table when isMyListVisible changes
  useEffect(() => {
    const getHabitLogs = async () => {
      const { data: habitLogs, error: habitLogsError } = await supabase
        .from("habit_log")
        .select("*");
      setHabitLogsArray(habitLogs);
    };
    getHabitLogs();
  }, [isCommitted]);

  // Calculate the current score, max score, and percentage completion
  let tenDaysPassed = false;
  let currentScore = habitLogsArray?.length ?? 0;
  let maxScore = habitData?.length ? habitData.length * 10 : 0;
  let percentageDecimal = maxScore ? currentScore / maxScore : 0;

  function toggleIsCommitted() {
    setIsCommitted(!isCommitted);
  }

  return (
    <div>
      <Prompt
        tenDaysPassed={tenDaysPassed}
        isCommitted={isCommitted}
        maxScore={maxScore}
        currentScore={currentScore}
        percentageDecimal={percentageDecimal}
        toggleIsCommitted={toggleIsCommitted}
      />
      {isCommitted ? (
        <div>
          <ActiveList
            taskData={habitData}
            toggleIsCommitted={toggleIsCommitted}
          />
        </div>
      ) : (
        // Render NewRoutineForm only if habitData is not present
        <div>
          {!isCommitted && (
            <NewRoutineForm
              toggleIsCommitted={toggleIsCommitted}
              isCommitted={isCommitted}
              goodLuck={goodLuck}
              toggleGoodLuck={toggleGoodLuck}
            />
          )}
        </div>
      )}
    </div>
  );
}  
