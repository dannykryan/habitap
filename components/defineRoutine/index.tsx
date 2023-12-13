"use client";
import DelToDoBtn from "../delToDo";
import MainBtn from "../MainBtn";
import List from "../routine";
import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import supabase from "../../lib/initSupabase";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

let taskDataOriginal: Task[] = [];

export default function RoutineForm({ toggleVariable, variable }: any) {
  let router = useRouter();

  const [taskData, setTaskData] = useState<Task[]>(taskDataOriginal);
  const [toggleData, setToggleData] = useState<any>(true);

  const addNewData = (todo: Task) => {
    setTaskData([...taskData, todo]);
  };

  function confirmData() {
    setToggleData(!toggleData);
    console.log(taskData);
  }

  async function linkToMyList() {

    // const { error: deleteError } = await supabase
    // .from('habit_table')
    // .delete()
  
    const tasks : any = taskData.map(task => ({habit_name: task.title}))
    const { data, error: insertError } = await supabase
    .from("habit_table")
    .insert(tasks);

    // console.log(data);
    setTimeout(()=> {toggleVariable()}, 10000);
  }

  const deleteData = (id: any) => {
    const newArray = taskData.filter((task) => task.id !== id);
    setTaskData(newArray);
  };

  return (
    <>
      <div>
        {/* pass down the armDelete to DelToDo */}
        <div
          className="pop-up"
          style={{
            display: toggleData && "none",
            position: "absolute",
            background: "grey",
            border: "2px solid black",
            marginLeft: "15%",
          }}
        >
          Are you Sure?
          <button className={styles.mainBtn} onClick={linkToMyList}>
            Yes
          </button>
          <button className={styles.mainBtn} onClick={confirmData}>
            No
          </button>
        </div>

        <List
          taskData={taskData}
          addNewData={addNewData}
          deleteData={deleteData}
        />
      </div>
      <div className="btn-container" style={{ justifyContent: "center" }}>
        {/* <MainBtn />
  <DelToDoBtn /> */}
        <button className={styles.mainBtn} onClick={confirmData}>
          Commit
        </button>
      </div>
    </>
  );
}
