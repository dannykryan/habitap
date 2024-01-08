import ActiveListItem from "./ActiveListItem"
import { Habit, ActiveListProps } from "../../../types/types";

// This is the list of commited habits (after commiting) and you can tick off everyday
export default function ActiveList({taskData} : ActiveListProps) {

  return (
    <>
      <ul className="myList">
        {taskData && taskData.map((todo: Habit, index: number) => (
          <li key={index}>
            <ActiveListItem todo={todo}>
              {todo.habit_name}
            </ActiveListItem>
          </li>
        ))}
      </ul>
    </>
  );
}
