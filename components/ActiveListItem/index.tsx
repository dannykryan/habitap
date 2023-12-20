"use client"
import React, { ReactNode, use } from 'react';
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

  const [showCheckbox, setShowCheckbox] = useState<boolean> (false);
  const [isCompleted, setIsCompleted] = useState<any> ();
  // we need todays date variable
  const currentDate = ((new Date()).toISOString()).toLocaleString();
  // we need a habitlog.date variable
  useEffect(() => {
    async function getHabitLogs() {
      let {data: completedAt, error} = await supabase .from('habit_log') .select('completed_at') .eq('user_id', '7506eca4-97d0-4f21-80f1-d3040e212549');
      console.log(currentDate)
      console.log(completedAt)
      setIsCompleted(completedAt);
    };
    getHabitLogs();
  }, [date, currentDate, todo.habit_id])


  // needs work as seconds and minutes are not being taken into account
  function checkDate() {
      // if todays date is equal to habitlog.date render the ticked checkbox
    if (currentDate === isCompleted) {
      setShowCheckbox(true);
    }
    // if habitlog.date is null or does not match then render the unticked checkboxthen
    else {
      setShowCheckbox(false);
    }
  }
  const [showPopup, setShowPopup] = useState(false);

  function closePopup() {
    setShowPopup(false);
  }

  const [check, setCheck] = useState (todo.completed);

  async function handleBoxClick () {
    if (check === false) {
      const { data, error } = await supabase
  .from('habit_log')
  .insert([
    { habit_id: todo.habit_id, user_id: 1},
  ])
    }
    else {
      setShowPopup(true);
    }
  setCheck(true)
  console.log(todo)
  checkDate();
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
      src={showCheckbox ? checkboxTicked : checkboxUnticked}
      alt={showCheckbox ? "ticked isCompletedbox" : "unticked isCompletedbox"}
      height={27} 
      onClick={handleBoxClick}/>
      {showPopup && <TickPopup closePopup={closePopup}/>}
    </div>
  )
};

export default ActiveListItem;