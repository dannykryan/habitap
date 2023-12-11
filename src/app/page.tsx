"use client";

import React from "react";
import Home from "../../components/homepage/index";
import MyList from "../../components/myList/index";
import { useState } from "react";
import MainBtn from "../../components/MainBtn";

export default function Parent() {
  // const [btn, setBtn] = useState(<Home></Home>);
  // const handleBtn= () => {
  //   setBtn(<MyList></MyList>);
  // };

  const [isMyListVisible, setIsMyListVisible] = useState(false);

  const handleMainBtnClick = () => {
    setIsMyListVisible(!isMyListVisible);
  };

  // here will be the state and based on the state change the homepage will be rendered or the MyList
  // as default it will be the homepage(then changed with login page)
  //onclick of the MainBttn the state changes to MyList
  return (
    <>
      {isMyListVisible ? <MyList /> : <Home />}
      <MainBtn isMyListPage={isMyListVisible} onClick={handleMainBtnClick} />
    </>
  );
}
