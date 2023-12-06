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

import Image from "next/image";
import EmptyListItem from "../emptyListItem";
import ListItem from "../listItem"
import styles from './list.module.css'
import checkboxTicked from '../../public/icons/checkbox-ticked.svg';
import checkboxUnticked from '../../public/icons/checkbox-unticked.svg';

let taskData = [
  { id: 1, title: "20 minutes yoga session", completed: true },
  { id: 2, title: "meditate", completed: true },
  { id: 3, title: "gratitude journal", completed: false },
];

export default function List() {
  const maxTasks = 5; // Maximum number of tasks to display

  return (
    <ul className={styles.myList}>
      {taskData.map((todo, index) => (
        <li key={todo.id}>
          <ListItem className={index < taskData.length ? "todoActive" : "todoInactive"}>
            {todo.title}
            <Image 
              src={todo.completed ? checkboxTicked : checkboxUnticked}
              alt="Trash-icon"
              height={27}
              />
          </ListItem>
        </li>
      ))}
      {/* Render additional inactive items if there are less than maxTasks */}
      {Array.from({ length: Math.max(0, maxTasks - taskData.length) }).map((_, index) => (
        <li key={`empty-${index}`}>
            <EmptyListItem />
        </li>
      ))}
    </ul>
  );
}
