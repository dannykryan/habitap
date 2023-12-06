// import EmptyListItem from "../emptyListItem";

// export default function List() {
//   return (
//     <>
//     <EmptyListItem />
//     <EmptyListItem />
//     <EmptyListItem />
//     <EmptyListItem />
//     <EmptyListItem />
//     </>
//   );
// }
import { useState } from "react";
import Image from "next/image";
import EmptyListItem from "../emptyListItem";
import ListItem from "../listItem"
import styles from './list.module.css'
import checkboxTicked from '../../public/icons/checkbox-ticked.svg';
import checkboxUnticked from '../../public/icons/checkbox-unticked.svg';


export default function List({taskData , addNewData} : any) {
  const maxTasks = 5; // Maximum number of tasks to display

  //write a function that changes the completed bit




  return (
    <ul className={styles.myList}>
      {taskData.map((todo : any, index : number) => ( // Look at the types and change them
        <li key={todo.id}>
          <ListItem className={index < taskData.length ? "todoActive" : "todoInactive"} todo={todo}>
            {todo.title}
            {/* <Image 
              src={todo.completed ? checkboxTicked : checkboxUnticked}
              alt="Trash-icon"
              height={27} */}
              {/* /> */}
          </ListItem>
        </li>
      ))}
      {/* Render additional inactive items if there are less than maxTasks */}
      {maxTasks > taskData.length &&
        <li>
            <EmptyListItem addNewData={addNewData} taskData={taskData}/>
        </li>
      }
    </ul>
  );
}
