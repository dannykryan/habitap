"use client"

import { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import supabase from '../../../lib/initSupabase';
import { HabitLog, Habit } from "../../../types/types";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children } : {
    children: React.ReactNode;
}) {
    const currentDate = new Date();
    const [isCommitted, setIsCommitted] = useState<boolean>(false);
    const [habitData, setHabitData] = useState<Habit[] | null>(null);
    const [habitLogsArray, setHabitLogsArray] = useState<HabitLog[] | null>(null);
    const [activePage, setActivePage] = useState<string>("flower");
    const [goodLuck, setGoodLuck] = useState<boolean>(false);
    const [showGrowth, setShowGrowth] = useState<string>("normal");

    // Calculate the current score, max score, and percentage completion
    let [tenDaysPassed, setTenDaysPassed] = useState<boolean>(false);

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

      useEffect(() => {
        const getHabitLogs = async () => {
          const { data: habitLogs, error: habitLogsError } = await supabase
            .from("habit_log")
            .select("*");
          setHabitLogsArray(habitLogs);
        };
        getHabitLogs();
      }, []);

      if (habitData) {
        const startDate = new Date(habitData[0]?.created_at);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 10);
        tenDaysPassed = currentDate >= endDate;
      }

    // Function to toggle commitment status
    function toggleIsCommitted() {
        setIsCommitted(!isCommitted);
    };

    function toggleTenDaysPassed() {
      setTenDaysPassed(!tenDaysPassed);
  };

    return (
        <AppContext.Provider value={{
          currentDate,
          isCommitted,
          setIsCommitted,
          habitData,
          setHabitData,
          habitLogsArray,
          setHabitLogsArray,
          tenDaysPassed,
          toggleTenDaysPassed,
          toggleIsCommitted,
          activePage,
          setActivePage,
          goodLuck,
          toggleGoodLuck,
          useAppContext,
          showGrowth,
          setShowGrowth,
      }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}