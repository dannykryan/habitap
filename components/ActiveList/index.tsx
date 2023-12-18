import ActiveListItem from "../ActiveListItem"
import styles from './ActiveList.module.css'
import { useEffect } from "react";

// This is the list of commited habits (after commiting) and you can tick off everyday

export default function ActiveList({taskData, date, toggleDate} : any) {

  useEffect(() => {
    console.log('Page rerendered')
   }, [date])


  return (
    <ul className={styles.myList}>
      {taskData.map((todo : any, index : number) => ( // typescript to review: look at the types and change them
        <li key={index}>
          <ActiveListItem todo={todo} date={date}>
            {todo.habit_name}
          </ActiveListItem>
        </li>
      ))}
      <button onClick={toggleDate}>Refresh</button>
    </ul>
  );
}
