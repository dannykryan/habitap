import Plant from "../../components/plant"
import ListBtn from "../../components/listBtn";
import Link from "next/link";
import Prompt from "../../components/prompt";

const URL =""

export default function Home() {
  return (
  <>
  <div id="header-prompt-container">
    <h1 id="habitap-header">Habitap</h1>
    <Prompt />
  </div>
  <div id="plant-progress-container">
    <Plant />
    <p>Habit progress</p>
  </div>
  <Link href="/myList"><ListBtn/></Link>
  </>)
}
