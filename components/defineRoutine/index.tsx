"use client";

import "src/app/globals.css";
import List from "../routine";
import { useState } from "react";
import styles from "./page.module.css";
import Popup from "../../components/popup";
import supabase from "../../lib/initSupabase";
import InstructionPopup from "../instructionPopup";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  committedDays: number;
}

let taskDataOriginal: Task[] = [];

export default function RoutineForm({
  toggleIsCommitted,
  isCommitted,
  handleMainBtnClick,
}: any) {
  const [taskData, setTaskData] = useState<Task[]>(taskDataOriginal);
  const [toggleData, setToggleData] = useState<any>(false);

  const [toggleInstructions, setToggleInstructions] = useState<any>(true);

  const addNewData = (todo: Task) => {
    setTaskData([...taskData, todo]);
  };

  function confirmData() {
    setToggleData(!toggleData);
    console.log(taskData);
  }

  async function linkToMyList() {
    // Delete all records from habit_log
    const { error: deleteLogError } = await supabase
      .from("habit_log")
      .delete()
      .eq("user_id", "1");

    if (deleteLogError) {
      console.error("Error deleting habit_log records:", deleteLogError);
      return;
    }

    // Delete records from habit_table
    const { error: deleteError } = await supabase
      .from("habit_table")
      .delete()
      .eq("user_id", "1");

    if (deleteError) {
      console.error("Error deleting habit_table records:", deleteError);
      return;
    }

    // Continue with inserting new records or other operations
    const tasks: any = taskData.map((task) => ({ habit_name: task.title }));
    const { data, error: insertError } = await supabase
      .from("habit_table")
      .insert(tasks);

    if (insertError) {
      console.error("Error inserting data:", insertError);
      return;
    }

    if (data) {
      const getData = async () => {
        const { data, error } = await supabase.from("habit_table").select("*");
        console.log({ data, error });
      };
      getData();
    }

    toggleIsCommitted();

    handleMainBtnClick();
  }

  const deleteData = (id: any) => {
    const newArray = taskData.filter((task) => task.id !== id);
    setTaskData(newArray);
  };

  return (
    <>
      <div>
        <InstructionPopup
          toggleInstructions={toggleInstructions}
          setToggleInstructions={setToggleInstructions}
        />
        <Popup
          linkToMyList={linkToMyList}
          confirmData={confirmData}
          toggleData={toggleData}
          setToggleData={setToggleData}
        />
        <List
          taskData={taskData}
          addNewData={addNewData}
          deleteData={deleteData}
        />
      </div>
      <div className="btn-container" style={{ justifyContent: "center" }}>
        <button className={styles.mainBtn} onClick={confirmData}>
          Commit
        </button>
      </div>
    </>
  );
}
