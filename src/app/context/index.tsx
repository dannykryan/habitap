"use client"
import { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import supabase from '../../../lib/initSupabase';
import { HabitLog, Habit } from "../../../types/types";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children } : {
    children: React.ReactNode;
}) {
    let [name, setName] = useState("Danny");

    const currentDate = new Date();

    const [isCommitted, setIsCommitted] = useState<boolean>(false);

    const [habitData, setHabitData] = useState<Habit[] | null>(null);
    const defaultActivePage = habitData ? "list" : "plant";
    const [activePage, setActivePage] = useState<string>(defaultActivePage);

    const [habitLogsArray, setHabitLogsArray] = useState<HabitLog[] | null>(null);

    // Calculate the current score, max score, and percentage completion
    let tenDaysPassed = false;
    let currentScore = habitLogsArray?.length ?? 0;
    let maxScore = habitData?.length ? habitData.length * 10 : 0;
    let percentageDecimal = maxScore ? currentScore / maxScore : 0;

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
      }, [isCommitted]);

      if (habitData) {
        const startDate = new Date(habitData[0]?.created_at);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 10);
        tenDaysPassed = currentDate >= endDate;
      }

    return (
        <AppContext.Provider value={{
            currentDate,
            isCommitted,
            setIsCommitted,
            habitData,
            setHabitData,
            activePage,
            setActivePage,
            habitLogsArray,
            setHabitLogsArray,
            tenDaysPassed,
            currentScore,
            maxScore,
            percentageDecimal,
            name,
            setName,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}