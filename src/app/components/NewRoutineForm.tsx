"use client";

import "src/app/globals.css";
import NewRoutineList from "./NewRoutineList";
import { useState } from "react";
import Popup from "./popups/CommitPopup";
import supabase from "../../../lib/initSupabase";
import InstructionPopup from "./popups/InstructionPopup";
import { Task, NewRoutineFormProps } from "../../../types/types";

let taskDataOriginal: Task[] = [];

export default function NewRoutineForm({
  toggleIsCommitted,
  goodLuck,
  toggleGoodLuck,
  setActivePage,
  setHabitData,
  user,
  setUser,
}: NewRoutineFormProps) {
  const [taskData, setTaskData] = useState<Task[]>(taskDataOriginal);
  const [toggleData, setToggleData] = useState<boolean>(false);
  const [toggleInstructions, setToggleInstructions] = useState<boolean>(true);

  const addNewData = (todo: Task) => {
    setTaskData([...taskData, todo]);
  };

  function confirmData() {
    setToggleData(!toggleData);
  }

  function confirmInstructions() {
    setToggleInstructions(!toggleInstructions);
  }

  async function linkToMyList() {
    // Continue with inserting new records or other operations
    const tasks = taskData.map((task) => ({ habit_name: task.title, user_id: user.id }));
    console.log(tasks);
    const { data, error: insertError } = await supabase
      .from("habit_table")
      .insert(tasks)
      .select()

    if (insertError) {
      console.error("Error inserting data:", insertError);
      return;
    }

    console.log(`TEST DATA IS:`, data)

    if (data) {
      const getData = async () => {
        const { data, error } = await supabase.from("habit_table")
        .select("*")
        .eq("user_id", user.id);
          setHabitData(data);
      };
      getData();
    }
    toggleIsCommitted();
  }

  const deleteData = (id: number) => {
    const newArray = taskData.filter((task) => task.id !== id);
    setTaskData(newArray);
  };

  return (
    <>
      <div>
        <InstructionPopup
          toggleInstructions={toggleInstructions}
          confirmInstructions={confirmInstructions}
        />
        <Popup
          linkToMyList={linkToMyList}
          confirmData={confirmData}
          toggleData={toggleData}
          setToggleData={setToggleData}
          goodLuck={goodLuck}
          toggleGoodLuck={toggleGoodLuck}
          taskData={taskData}
          setActivePage={setActivePage}
        />
        <NewRoutineList
          taskData={taskData}
          addNewData={addNewData}
          deleteData={deleteData}
        />
      </div>
      <div className="btn-container" style={{ justifyContent: "center" }}>
        <button
          className="commitBtn"
          onClick={confirmData}
          disabled={taskData.length === 0} // Disable if taskData is empty
        >
          Commit
        </button>
      </div>
    </>
  );
}
