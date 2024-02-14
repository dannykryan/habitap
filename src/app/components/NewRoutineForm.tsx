"use client";

import "src/app/globals.css";
import NewRoutineList from "./NewRoutineList";
import { useState } from "react";
import Popup from "./popups/CommitPopup";
import supabase from "../../../lib/initSupabase";
import InstructionPopup from "./popups/InstructionPopup";
import { Task, NewRoutineFormProps } from "../../../types/types";

// Store original task data for reference
let taskDataOriginal: Task[] = [];

// NewRoutineForm is a foirm used to create a new routine by adding tasks to a list and committing to them. Those tasks that are added will be stored in the habit_table.

export default function NewRoutineForm({
  toggleIsCommitted,
  goodLuck,
  toggleGoodLuck,
  setActivePage,
  setHabitData,
  user,
  setUser,
}: NewRoutineFormProps) {
  // State variables for task data and toggling instructions and confirmation popups
  const [taskData, setTaskData] = useState<Task[]>(taskDataOriginal);
  const [toggleData, setToggleData] = useState<boolean>(false);
  const [toggleInstructions, setToggleInstructions] = useState<boolean>(true);

  // Function to add new task data
  const addNewData = (todo: Task) => {
    setTaskData([...taskData, todo]);
  };

  // Function to confirm data submission
  function confirmData() {
    setToggleData(!toggleData);
  }

  // Function to confirm instructions visibility
  function confirmInstructions() {
    setToggleInstructions(!toggleInstructions);
  }

  // Function to link to the user's list upon data submission
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

  // Function to delete task data by ID
  const deleteData = (id: number) => {
    const newArray = taskData.filter((task) => task.id !== id);
    setTaskData(newArray);
  };

  // Render components including instruction popup, confirmation popup, and new routine list
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
      {/* Button container for committing tasks */}
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
