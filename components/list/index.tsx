import ListItem from "../listItem"
import styles from './list.module.css'
import { useEffect } from "react";

// This is the list of commited habits (after commiting) and you can tick off everyday

export default function List({taskData, date, toggleDate} : any) {

  useEffect(() => {
    console.log('Page rerendered')
   }, [date])


  return (
    <ul className={styles.myList}>
      {taskData.map((todo : any, index : number) => ( // typescript to review: look at the types and change them
        <li key={index}>
          <ListItem todo={todo} date={date}>
            {todo.habit_name}
          </ListItem>
        </li>
      ))}
      <button onClick={toggleDate}>Refresh</button>
    </ul>
  );
}
