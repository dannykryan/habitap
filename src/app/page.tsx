"use client" 
import React from "react";
import Home from "../../components/homepage/index";
import MyList from "../../components/myList/index";
import { useState, useEffect } from "react";
import MainBtn from "../../components/MainBtn";
import supabase from "../../lib/initSupabase";
import { Database } from "../../lib/supabase";

interface Habit {
  habit_id: string;
  habit_name: string;
  created_at: string;
  completed: boolean;
}

  export default function Parent() {
    const [habitData, setHabitData] = useState<Habit[] | null>(null);
    const [isMyListVisible, setIsMyListVisible] = useState<boolean>(false);
  
    useEffect(() => {
      const getData = async () => {
        const { data, error } = await supabase
          .from("habit_table")
          .select("*");
        console.log({data, error});
        setHabitData(data);
      };
      getData();
    }, []);


  const handleMainBtnClick = () => {
    setIsMyListVisible(!isMyListVisible);
  };


  return (
    <>
       {/* <pre>{JSON.stringify(habitData, null, 2)}</pre> */}
      {isMyListVisible ? <MyList /> : <Home />}
      <MainBtn isMyListPage={isMyListVisible} onClick={handleMainBtnClick} />
    </>
  );
}

  // here will be the state and based on the state change the homepage will be rendered or the MyList
  // as default it will be the homepage(then changed with login page)
  //onclick of the MainBttn the state changes to MyList

// type Habit = Database["public"]["Tables"]["habit_table"]["Row"];