import Plant from "../../components/plant"
import ListBtn from "../../components/listBtn";
import Link from "next/link";

const URL =""

export default function Home() {
  return (
  <>
  <h1>Habitap</h1>
  <Plant />
  <p>Habit progress</p>
  <Link href="/myList"><ListBtn/></Link>
  </>)
}
