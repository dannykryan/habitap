import DelToDoBtn from "../../../components/delToDo";
import MainBtn from "../../../components/MainBtn";
import List from "../../../components/list";


export default function MyList() {
  return <>
  <section className="main">
    <h1 id="habitap-header">Habitap</h1>
  <div>
    <List />
  </div>
  <div className="btn-container">
  <MainBtn />
  <DelToDoBtn />
  </div>
</section>
</>;
}
