"use client";

import React from "react";
import Home from "../../components/homepage/index";
import MyList from "../../components/myList/index";
import { useState, useEffect } from "react";
import MainBtn from "../../components/MainBtn";
// import { supabase } from "../../lib/initSupabase";

export default function Parent() {
  // const [habitTable, setHabitTable] = useState([]);
  const [isMyListVisible, setIsMyListVisible] = useState<boolean>(false);
  const [variable, setVariable] = useState(false)

  // const fetchHabits = async () => {
  //   const { data: habitTable } = await supabase
  //     .from("habit table")
  //     .select("*")
  //     .order("name");
  //   setHabitTable(habitTable);
  // };
  // useEffect(() => {
  //   fetchHabits();
  // }, []);

  const handleMainBtnClick = () => {
    setIsMyListVisible(!isMyListVisible);
  };
  

  function toggleVarible() : any{
    setVariable(!variable)
  }

  // here will be the state and based on the state change the homepage will be rendered or the MyList
  // as default it will be the homepage(then changed with login page)
  //onclick of the MainBttn the state changes to MyList
  return (
    <>
      {isMyListVisible ? <MyList toggleVariable={toggleVarible} variable={variable} /> : <Home />}
      <MainBtn isMyListPage={isMyListVisible} onClick={handleMainBtnClick} />
    </>
  );
}
