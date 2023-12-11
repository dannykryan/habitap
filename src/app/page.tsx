"use client";

import React from "react";
import Home from "../../components/homepage/index";
import MyList from "../../components/myList/index";
import { useState, useEffect } from "react";
import MainBtn from "../../components/MainBtn";
import { supabase } from "../../lib/initSupabase";

interface Habit {
  habit_id: string;
  habit_name: string;
  
  completed: boolean;
}

export default function Parent() {
  const [habitTable, setHabitTable] = useState([]);
  const [isMyListVisible, setIsMyListVisible] = useState<boolean>(false);

  const fetchHabits = async () => {
    const { data: habitTable } = await supabase
      .from("habit table")
      .select("*")
      .order("name");
    setHabitTable(habitTable);
  };
  useEffect(() => {
    fetchHabits();
  }, []);

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
