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

const ActiveListItem: React.FC<ListItemProps> = ({ children, className, todo, date } : any) => {

  const [isCompleted, setIsCompleted] = useState (todo.completed);
  const [showPopup, setShowPopup] = useState(false);

  function closePopup() {
    setShowPopup(false);
  }

  async function handleBoxClick () {
    if (isCompleted === false) {
      const { data, error } = await supabase
  .from('habit_log')
  .insert([
    { habit_id: todo.habit_id, user_id: 1},
  ])
    }
    else {
      setShowPopup(true);
    }
  setIsCompleted(true)
  console.log(todo)
  }

  // on each render of an activeListItem, we want to check 
   // if if there is a log for said habit in the habit log table
   // if so, render the pre-ticked checkbox, if not, render the unticked checkbox

  useEffect(()=> {
  setIsCompleted(todo.completed)},[date, todo.completed])

  return ( 
  <div className={styles.todoActive}>
    {children}
    <Image 
      src={isCompleted ? checkboxTicked : checkboxUnticked}
      alt={isCompleted ? "ticked isCompletedbox" : "unticked isCompletedbox"}
      height={27} 
      onClick={handleBoxClick}/>
      {showPopup && <TickPopup closePopup={closePopup}/>}
    </div>
  )
};

export default ActiveListItem;