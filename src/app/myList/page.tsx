import DelToDoBtn from "../../../components/delToDo";
import MainBtn from "../../../components/MainBtn";
import List from "../../../components/list";
import Prompt from "../../../components/prompt";


export default function MyList() {
  return <>
    <h1 id="habitap-header">Habitap</h1>
    <Prompt />
  <div>
    <List />
  </div>
  <div className="btn-container">
  <MainBtn />
  <DelToDoBtn />
  </div>
</>;
}
