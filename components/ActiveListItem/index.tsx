"use client"
import React, { ReactNode } from 'react';
import { useState , useEffect } from 'react';
import styles from '../ActiveListItem/ActiveListItem.module.css';
import Image from 'next/image';
import checkboxTicked from '../../public/icons/checkbox-ticked.svg';
import checkboxUnticked from '../../public/icons/checkbox-unticked.svg';
import TickPopup from '../../components/tickPopup';
import supabase from "../../lib/initSupabase";


interface ListItemProps {
  children: ReactNode;
  className?: string;
  todo: any;
  date: any;
}

interface HabitLog {
  habit_id: string;
  completed_at: string;
  user_id: number;
}

const ActiveListItem: React.FC<ListItemProps> = ({ children, className, todo, date } : any) => {
  
  const currentDate = new Date().toISOString().split('T')[0];
  const [tickCheckBox, setTickCheckBox] = useState (false);
  const [showPopup, setShowPopup] = useState(false);

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
        setTickCheckBox(loggedDate.includes(currentDate))
      };
      getHabitLog();
    }, [todo.habit_id, currentDate]);

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
      console.log(todo)
        }
        else {
          setShowPopup(true);
        }
      setTickCheckBox(true)
      }

  return ( 
  <div className={styles.todoActive}>
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