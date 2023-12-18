"use client";
import DelToDoBtn from "../delToDo";
import MainBtn from "../MainBtn";
import List from "../list";
import { useState } from "react";
import RoutineForm from "../defineRoutine";


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
  date,
  toggleDate,
}: any) {
  const [taskData, setTaskData] = useState<Habit[]>(habitData);

  // const addNewData = (todo: Habit) => {
  //   setTaskData([...taskData, todo]);
  // };

  return isCommitted ? (
    <>
      <div>
        <List
          taskData={taskData}
          date={date}
          toggleDate={toggleDate}
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
