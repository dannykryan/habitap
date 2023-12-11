"use client";

import React from "react";
import Home from "../../components/homepage/index";
import MyList from "../../components/myList/index";
import { useState, useEffect } from "react";
import MainBtn from "../../components/MainBtn";
import { supabase } from "../../lib/initSupabase";
import { Database } from "../../lib/supabase";

// interface Habit {
//   habit_id: string;
//   habit_name: string;
//   created_at: string;
//   completed: boolean;
// }
type Habit = Database["public"]["Tables"]["habit_table"]["Row"];

export default function Parent() {
  const [habitTable, setHabitTable] = useState<Habit[] | null>(null);
  const [isMyListVisible, setIsMyListVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchHabits = async () => {
      const { data: habit_table, error } = await supabase
        .from("habit_table")
        .select("*");

      if (error) console.log("error", error);
      else setHabitTable(habit_table);
    };

    fetchHabits();
  }, [habitTable]);

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
