"use client";
import DelToDoBtn from "../delToDo";
import MainBtn from "../MainBtn";
import List from "../list";
import { useState } from "react";
import RoutineForm from "../defineRoutine";

// interface Task {
//   id: number;
//   title: string;
//   completed: boolean;
// }

// let taskDataOriginal: Task[] = [
//   { id: 1, title: "20 minutes yoga session", completed: true },
//   { id: 2, title: "meditate", completed: true },
//   { id: 3, title: "gratitude journal", completed: false },
// ];

// interface DeleteBtnProps {
//   armDelete: boolean;
// }

// let deleteState = {
//   armDelete: false
// }

interface Habit {
  habit_id: string;
  habit_name: string;
  created_at: string;
  completed: boolean;
}

export default function MyList({
  toggleIsCommitted,
  isCommitted,
  habitData,
  handleMainBtnClick,
}: any) {
  const [taskData, setTaskData] = useState<Habit[]>(habitData);

  // const addNewData = (todo: Habit) => {
  //   setTaskData([...taskData, todo]);
  // };
  // // Set state of armDelete - default false
  // const [armDelete, setArmDelete] = useState(false);

  // // Handle the state of armDelete, set to true or false
  // const handleArmDelete = () => {
  //   setArmDelete(!armDelete);
  //   console.log(armDelete);
  // };

  return isCommitted ? (
    <>
      <div>
        <List
          taskData={taskData}
          // addNewData={addNewData}
        />
      </div>
      <div className="btn-container"></div>
    </>
  ) : (
    <RoutineForm
      toggleIsCommitted={toggleIsCommitted}
      isCommitted={isCommitted}
      handleMainBtnClick={handleMainBtnClick}
    />
  );
}
