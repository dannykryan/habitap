"use client"

import React from "react";
import Home from "../../components/homepage/index";
import MyList from "../../components/myList/index";
import { useState } from "react";

export default function Parent() {

  const [btn, setBtn] = useState(<Home></Home>);
  const handleBtn= () => {
    setBtn(<MyList></MyList>);
  };


  // here will be the state and based on the state change the homepage will be rendered or the MyList
  // as default it will be the homepage(then changed with login page)
  //onclick of the MainBttn the state changes to MyList
  return (
    <>
      <Home handleBtn={handleBtn}></Home>
    </>
  );
}
