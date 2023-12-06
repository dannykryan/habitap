"use client"
import DelToDoBtn from "../../../components/delToDo";
import MainBtn from "../../../components/MainBtn";
import List from "../../../components/list";
import Prompt from "../../../components/prompt";
import {useState} from "react"

interface Task {
  id: number,
  title: string,
  completed: boolean
}

let taskDataOriginal: Task[] = [
  { id: 1, title: "20 minutes yoga session", completed: true },
  { id: 2, title: "meditate", completed: true },
  { id: 3, title: "gratitude journal", completed: false },
]; 


export default function MyList() {

  const [taskData, setTaskData] = useState<Task[]>(taskDataOriginal)

  


  return <>
    <h1 id="habitap-header">Habitap</h1>
    <Prompt />
  <div>
    <List taskData={taskData} />
  </div>
  <div className="btn-container">
  <MainBtn />
  <DelToDoBtn />
  </div>
</>;
}
