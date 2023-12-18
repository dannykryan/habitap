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
  toggleVariable,
  variable,
  habitData,
  handleMainBtnClick,
  toggleNumber,
  number
}: any) {
  const [taskData, setTaskData] = useState<Habit[]>(habitData);

  // const addNewData = (todo: Habit) => {
  //   setTaskData([...taskData, todo]);
  // };

  return variable ? (
    <>
      <div>
        <List
          taskData={taskData}
          toggleVariable={toggleVariable}
          number={number}
          toggleNumber={toggleNumber}
          // addNewData={addNewData}
        />
      </div>
      <div className="btn-container"></div>
    </>
  ) : (
    <RoutineForm
      toggleVariable={toggleVariable}
      variable={variable}
      handleMainBtnClick={handleMainBtnClick}
    />
  );
}
