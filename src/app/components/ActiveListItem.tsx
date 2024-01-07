"use client"
import React, { ReactNode } from 'react';
import { useState , useEffect } from 'react';
import Image from 'next/image';
import checkboxTicked from '../../../public/icons/checkbox-ticked.svg';
import checkboxUnticked from '../../../public/icons/checkbox-unticked.svg';
import TickPopup from './popups/checkboxPopup';
import supabase from "../../../lib/initSupabase";
import { ListItemProps } from "../../../types/types";
import { useAppContext } from "../context";


const ActiveListItem: React.FC<ListItemProps> = ({ children, todo}) => {

  const {
    habitLogsArray,
    setHabitLogsArray,
  } = useAppContext();
  
  const currentDate = new Date();
  const formattedDate = new Date().toISOString().split('T')[0];
  const [tickCheckBox, setTickCheckBox] = useState<boolean> (false);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const getHabitLog = async () => {
      const { data, error } = await supabase
        .from("habit_log")
        .select()
        .eq("habit_id", todo.habit_id)
        if (error) {
          console.error("Error fetching habit logs:", error);
          return;
        }
        // Extract values of completed_at using map
        const loggedDate = data.map((log) => log.completed_at.split('T')[0]);
        setTickCheckBox(loggedDate.includes(formattedDate))
      };
      getHabitLog();
    }, [todo.habit_id, formattedDate]);

  function closePopup() {
    setShowPopup(false);
  }

  async function handleBoxClick () {
    if (tickCheckBox === false) {
      const { data, error } = await supabase
      .from('habit_log')
      .insert([
        { habit_id: todo.habit_id, user_id: 1},
      ])
      .select()
      if (data) {
        const { data: habitLogs, error: habitLogsError } = await supabase
            .from("habit_log")
            .select("*");
            setHabitLogsArray(habitLogs);
      }
        }
        else {
          setShowPopup(true);
        }
      setTickCheckBox(true)
      }

  return ( 
  <div className="todoActive">
    {children}
    <Image 
      src={tickCheckBox ? checkboxTicked : checkboxUnticked}
      alt={tickCheckBox ? "ticked checkbox" : "unticked checkbox"}
      height={27} 
      onClick={handleBoxClick}/>
      {showPopup && <TickPopup closePopup={closePopup}/>}
    </div>
  )
};

export default ActiveListItem;