"use client";
import React from "react";
import Home from "../../components/homepage/index";
import NewRoutineForm from "../../components/NewRoutineForm";
import ActiveList from "../../components/ActiveList";
import { useState, useEffect } from "react";
import MainBtn from "../../components/MainBtn";
import supabase from "../../lib/initSupabase";
import { useRouter } from "next/navigation";

// import Login from "../../lib/auth/login";

interface Habit {
  habit_id: string;
  habit_name: string;
  created_at: string;
  completed: boolean;
  current_score: number;
  max_score: number;
  user_id: number;
}

interface HabitLog {
  habit_id: string;
  completed_at: string;
  user_id: number;
}

export default function Parent() {
  const [habitData, setHabitData] = useState<Habit[] | null>(null);
  const [isMyListVisible, setIsMyListVisible] = useState<boolean>(true);

  const [isCommitted, setisCommitted] = useState(false);
  const [date, setDate] = useState(false);
  const [habitLogsArray, setHabitLogsArray] = useState<HabitLog[] | null>(null);
  const [goodLuck, setGoodLuck] = useState<any>(false);
  const [routeVariable, setRouteVariable] = useState(false);

  let router = useRouter();

  useEffect(() => {
    // setRouteVariable(!routeVariable);
    router.push("/authentication");
  }, [routeVariable]);

  function toggleGoodLuck() {
    setGoodLuck(!goodLuck);
  }

  // const [something, setSomething] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("habit_table").select("*");
      setHabitData(data);

      // setisCommitted(!isCommitted);
    };
    getData();
  }, [isMyListVisible]);

  const handleMainBtnClick = () => {
    setIsMyListVisible((prevValue) => !prevValue);
  };

  function toggleIsCommitted(): any {
    setisCommitted(!isCommitted);
  }

  function toggleDate(): any {
    setDate(!date);
  }

  // Pull data from habit log table into a score variable
  useEffect(() => {
    const getHabitLogs = async () => {
      const { data: habitLogs, error: habitLogsError } = await supabase
        .from("habit_log")
        .select("*");
      // console.log({ habitLogs, habitLogsError });
      setHabitLogsArray(habitLogs);
    };
    getHabitLogs();
  }, [isMyListVisible]);

  // function toggleSomething() : any{
  //   setSomething(!something)
  // }
  return (
    <>
      {isMyListVisible ? (
        isCommitted ? (
          <div>
            <ActiveList
              taskData={habitData}
              date={date}
              toggleDate={toggleDate}
              toggleIsCommitted={toggleIsCommitted}
            />
          </div>
        ) : (
          <div>
            <NewRoutineForm
              toggleIsCommitted={toggleIsCommitted}
              isCommitted={isCommitted}
              handleMainBtnClick={handleMainBtnClick}
              goodLuck={goodLuck}
              toggleGoodLuck={toggleGoodLuck}
            />
          </div>
        )
      ) : (
        <Home
          habitLogsArray={habitLogsArray}
          habitData={habitData}
          goodLuck={goodLuck}
          toggleGoodLuck={toggleGoodLuck}
        />
      )}
      <MainBtn isMyListPage={isMyListVisible} onClick={handleMainBtnClick} />
      {/* <Login /> */}
    </>
  );
}
// here will be the state and based on the state change the homepage will be rendered or the MyList
// as default it will be the homepage(then changed with login page)
//onclick of the MainBttn the state changes to MyList

// type Habit = Database["public"]["Tables"]["habit_table"]["Row"];
