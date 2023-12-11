"use client"
import React, { ReactNode } from 'react';
import { useState } from 'react';
import styles from '../routineItem/listItem.module.css';
import Image from 'next/image';
import checkboxTicked from '../../public/icons/checkbox-ticked.svg';
import checkboxUnticked from '../../public/icons/checkbox-unticked.svg';
import trashIconGreen from '../../public/icons/trash-icon-green.svg';

interface ListItemProps {
  children: ReactNode;
  className?: string;
  armDelete : boolean;
  todo: any;
  deleteData: any;
}

const ListItem: React.FC<ListItemProps> = ({ children, className, todo, armDelete, deleteData } : any) => {

  const [check, setcheck] = useState (todo.completed)
  function handleBoxClick () {
  setcheck(!check)
  // todo.completed = !todo.completed
  //  console.log(todo)
  }

  function handleDeleteClick( ) {
    deleteData(todo.id)
}

  return (
    <div className = {styles.deleteArmed}>
    {children}
    <Image 
      src={trashIconGreen}
      alt={"Armed Delete Button"}
      height={27} 
      onClick={handleDeleteClick}/>
    </div>

  )
};

export default ListItem;