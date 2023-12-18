"use client";
import React from "react";
import Home from "../../components/homepage/index";
import MyList from "../../components/myList/index";
import { useState, useEffect } from "react";
import MainBtn from "../../components/MainBtn";
import supabase from "../../lib/initSupabase";

interface Habit {
  habit_id: string;
  habit_name: string;
  created_at: string;
  completed: boolean;
  current_score: number;
  max_score: number;
  user_id: number;
}

export default function Parent() {
  const [habitData, setHabitData] = useState<Habit[] | null>(null);
  const [isMyListVisible, setIsMyListVisible] = useState<boolean>(true);
  const [variable, setVariable] = useState(false);
  const [number, setNumber] = useState(false)//
  // const [something, setSomething] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("habit_table").select("*");
      console.log({ data, error });
      setHabitData(data);
      console.log('Vamos')
      // setVariable(!variable);
    };
    getData();
  }, [isMyListVisible]);


  const handleMainBtnClick = () => {
    setIsMyListVisible((prevValue) => !prevValue);
  };

  function toggleVarible(): any {
    setVariable(!variable);
  }
  function toggleNumber() : any {
    setNumber(!number)
    
  }//
  // function toggleSomething() : any{
  //   setSomething(!something)
  // }
  return (
    <>
      {/* <pre>{JSON.stringify(habitData, null, 2)}</pre> */}
      {isMyListVisible ? (
        <MyList
          toggleVariable={toggleVarible}
          toggleNumber ={toggleNumber}
          number={number}
          variable={variable}
          habitData={habitData}
          handleMainBtnClick={handleMainBtnClick}
        />
      ) : (
        <Home />
      )}
      <MainBtn isMyListPage={isMyListVisible} onClick={handleMainBtnClick} />
    </>
  );
}
// here will be the state and based on the state change the homepage will be rendered or the MyList
// as default it will be the homepage(then changed with login page)
//onclick of the MainBttn the state changes to MyList

// type Habit = Database["public"]["Tables"]["habit_table"]["Row"];
