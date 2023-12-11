"use client"
import DelToDoBtn from "../../../components/delToDo";
import MainBtn from "../../../components/MainBtn";
import List from "../../../components/routine";
import {useState} from "react"
import styles from './page.module.css'

interface Task {
  id: number,
  title: string,
  completed: boolean
}

let taskDataOriginal: Task[] = [
  
]; 

// interface DeleteBtnProps {
//   armDelete: boolean;
// }

// let deleteState = {
//   armDelete: false
// }


export default function MyList() {

  const [taskData, setTaskData] = useState<Task[]>(taskDataOriginal)

  const addNewData = (todo: Task) => {
    setTaskData([...taskData, todo])
  }
//   // Set state of armDelete - default false
//       const [armDelete, setArmDelete] = useState(false)
  
//      // Handle the state of armDelete, set to true or false 
//     const handleArmDelete = () => {
//       setArmDelete(!armDelete)
//       console.log(armDelete)
//     }

const deleteData = (id : any) => {
  const newArray = taskData.filter(task => task.id !== id)
  setTaskData(newArray)
}

  return <>
    <div>
      {/* pass down the armDelete to DelToDo */}
    <List taskData={taskData} addNewData={addNewData} deleteData={deleteData} />
  </div>
  <div className="btn-container" style={{justifyContent: "center"}}>
  {/* <MainBtn />
  <DelToDoBtn /> */}
  <button className={styles.mainBtn}>
      Commit
    </button>
  </div>
</>;
}