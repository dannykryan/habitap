import EmptyListItem from "../emptyListItem";
import ListItem from "../routineItem"
import styles from './list.module.css'

export default function List({taskData , addNewData, armDelete, deleteData} : any) {
  const maxTasks = 5; // Maximum number of tasks to display

  //write a function that changes the completed bit

  return (
    <ul className={styles.myList}>
      {taskData.map((todo : any) => ( // Look at the types and change them
        <li key={todo.id}>
          <ListItem todo={todo} armDelete={armDelete} deleteData={deleteData}>
            {todo.title}
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
