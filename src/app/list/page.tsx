"use client"

import Prompt from "../../../components/prompt";
import ActiveList from "../../../components/ActiveList";
import NewRoutineForm from "../../../components/NewRoutineForm";
import React, { useState, useEffect } from "react";
import supabase from "../../../lib/initSupabase";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import ButtonBar from "../../../components/ButtonBar";
import { HabitLog, Habit } from "../../../types/types";
import { useAppContext } from "../context";

export default function List() {

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

  // function toggleGoodLuck() {
  //   setGoodLuck(!goodLuck);
  // }

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data, error } = await supabase
  //       .from("habit_table")
  //       .select("*")
  //       .eq("user_id", "1");
  //     setHabitData(data);
  //   };
  //   getData();
  // }, []);

  // useEffect(() => {
  //   // Update isCommitted when habitData changes
  //   if (habitData !== null) {
  //     setIsCommitted(habitData.length > 0);
  //   }
  // }, [habitData]);

  // // Effect hook to fetch data from the "habit_log" table when isMyListVisible changes
  // useEffect(() => {
  //   const getHabitLogs = async () => {
  //     const { data: habitLogs, error: habitLogsError } = await supabase
  //       .from("habit_log")
  //       .select("*");
  //     setHabitLogsArray(habitLogs);
  //   };
  //   getHabitLogs();
  // }, [isCommitted]);

  return (
    <div>
      <Prompt
        tenDaysPassed={tenDaysPassed}
        isCommitted={isCommitted}
        maxScore={maxScore}
        currentScore={currentScore}
        percentageDecimal={percentageDecimal}
      />
      <ButtonBar />
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
              setActivePage={setActivePage}
            />
          )}
        </div>
      )}
    </div>
    
  );
}  
