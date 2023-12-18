"use client"
import React, { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import styles from '../listItem/listItem.module.css';
import Image from 'next/image';
import checkboxTicked from '../../public/icons/checkbox-ticked.svg';
import checkboxUnticked from '../../public/icons/checkbox-unticked.svg';
import trashIconRed from '../../public/icons/trash-icon-red.svg'

interface ListItemProps {
  children: ReactNode;
  className?: string;
  todo: any,
  number: any
}

const ListItem: React.FC<ListItemProps> = ({ children, className, todo, armDelete, number } : any) => {

  const [check, setcheck] = useState (todo.completed)
  function handleBoxClick () {
  setcheck(true)
  // todo.completed = !todo.completed
  console.log(todo)
  }

  useEffect(()=> {setcheck(todo.completed)},[number])


  function handleDeleteClick() {
    alert(`Deleted ${todo.id}`)
  }

  return armDelete ? (
    <div className = {styles.deleteArmed}>
    {children}
    <Image 
      src={trashIconRed}
      alt={"Armed Delete Button"}
      height={27} 
      onClick={handleDeleteClick}/>
    </div>

  ) : ( 
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