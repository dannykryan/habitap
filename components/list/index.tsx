import ListItem from "../listItem"
import styles from './list.module.css'

// This is the list of commited habits (after commiting) and you can tick off everyday

export default function List({taskData} : any) {
  return (
    <ul className={styles.myList}>
      {taskData.map((todo : any) => ( // typescript to review: look at the types and change them
        <li key={todo.habit_id}>
          <ListItem todo={todo}>
            {todo.habit_name}
          </ListItem>
        </li>
      ))}
    </ul>
  );
}
