import Home from "./homepage/page";
import MyList from "./myList/page";

export default function Parent() {
  // here will be the state and based on the state change the homepage will be rendered or the MyList
  // as default it will be the homepage(then changed with login page)
  //onclick of the MainBttn the state changes to MyList
  return (
    <>
      <Home></Home>
      <MyList></MyList>
    </>
  );
}
