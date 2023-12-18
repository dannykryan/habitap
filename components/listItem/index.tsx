"use client"
import React, { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import styles from '../listItem/listItem.module.css';
import Image from 'next/image';
import checkboxTicked from '../../public/icons/checkbox-ticked.svg';
import checkboxUnticked from '../../public/icons/checkbox-unticked.svg';
import supabase from "../../lib/initSupabase";


interface ListItemProps {
  children: ReactNode;
  className?: string;
  todo: any,
  number: any
}

const ListItem: React.FC<ListItemProps> = ({ children, className, todo, number } : any) => {

  const [check, setcheck] = useState (todo.completed)

  async function handleBoxClick () {
    if (check === false) {
      const { data, error } = await supabase
  .from('habit_log')
  .insert([
    { habit_id: todo.habit_id, user_id: 1},
  ])
    }
  setcheck(true)
  console.log(todo)
  }

  

  useEffect(()=> {setcheck(todo.completed)},[number])


  function handleDeleteClick() {
    alert(`Deleted ${todo.id}`)
  }

  return ( 
  <div className={styles.todoActive}>
    {children}
    <Image 
      src={check ? checkboxTicked : checkboxUnticked}
      alt={check ? "ticked checkbox" : "unticked checkbox"}
      height={27} 
      onClick={handleBoxClick}/>
    </div>
  )
};

export default ListItem;