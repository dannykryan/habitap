import ListItem from "../listItem"
import styles from './list.module.css'
import { useEffect } from "react";

// This is the list of commited habits (after commiting) and you can tick off everyday

export default function List({taskData, toggleNumber, number} : any) {

  useEffect(() => {
    console.log("List component re-rendered"); // Agrega este log
  }, [number]);

  return (
    <ul className={styles.myList}>
      {taskData.map((todo : any, index : number) => ( // typescript to review: look at the types and change them
        <li key={index}>
          <ListItem todo={todo} number={number}>
            {todo.habit_name}
          </ListItem>
        </li>
      ))}
      <button onClick={toggleNumber}>Refresh</button>
    </ul>
  );
}
