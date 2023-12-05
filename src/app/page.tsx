import Plant from "../../components/plant"
import ListBttn from "../../components/listBttn";
import Link from "next/link";

const URL =""

export default function Home() {
  return (
  <>
  <section className="main">
  <h1>Habitap</h1>
  <Plant />
  <p>Habit progress</p>
  <Link href="/myList"><ListBttn/></Link>
  </section>
  </>)

}
