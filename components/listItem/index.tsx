"use client"
import React, { ReactNode } from 'react';
import { useState } from 'react';
import styles from '../listItem/listItem.module.css';
import Image from 'next/image';
import checkboxTicked from '../../public/icons/checkbox-ticked.svg';
import checkboxUnticked from '../../public/icons/checkbox-unticked.svg';

interface ListItemProps {
  children: ReactNode;
  className?: string;
  todo: any
}

const ListItem: React.FC<ListItemProps> = ({ children, className, todo } : any) => {

  const [check, setcheck] = useState (todo.completed)
  function handleClick () {
  setcheck(!check)
  // todo.completed = !todo.completed
  //  console.log(todo)
  }
  return <div className={`${styles.todoActive} ${className}`}>
    {children}
    <Image 
      src={check ? checkboxTicked : checkboxUnticked}
      alt="Trash-icon"
      height={27} 
      onClick={handleClick}/>
    </div>;
};

export default ListItem;