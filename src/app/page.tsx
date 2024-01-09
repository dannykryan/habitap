"use client"

import ButtonBar from "./components/ButtonBar";
import Home from "./components/Home";
import EndingPopup from "./components/popups/EndingPopup";
import Prompt from "./components/Prompt";
import { useAppContext } from "./context";
import { Habit } from "../../types/types";
import { useRouter } from "next/navigation";

export default function Page() {

  const {
      habitData,
      setHabitData,
      tenDaysPassed,
      showGrowth,
      setShowGrowth,
      user,
      setUser,
  } = useAppContext();

  const router = useRouter();

  

  const handleShowGrowthBtn = () => {
    if (showGrowth === "normal") {
      setShowGrowth("growth");
    } else if (showGrowth === "growth") {
      setShowGrowth("max");
    } else {
      setShowGrowth("normal");
    }

    setTimeout(() => {
      setShowGrowth("normal");
    }, 30000);
  };


  // Function to simulate advancing time by 10 days
  const endRoutine = () => {
    if (habitData) {
      const updatedHabitData = habitData.map((habit: Habit) => {
        const newStartDate = new Date(habit.created_at);
        newStartDate.setDate(newStartDate.getDate() - 10);
        return { ...habit, created_at: newStartDate.toISOString() };
      });
      setHabitData(updatedHabitData);
    }
  };

  console.log("This is page USER ID: ", user?.id)

  if (typeof window !== 'undefined' && window.location !== undefined) {
  if (user?.id === undefined || user?.id === null) {
    router.push("/login")
  }
}

  return (
    <>
      <Prompt />
        <>
        <div id="main-plant-container">
          <Home />
          {tenDaysPassed && (
            // Render EndingPopup component when ten days have passed
            <EndingPopup />
          )}
          </div>
          <div className="dev-btn-container">
            {/* Button to show maximum plant growth for 10 seconds */}
            <button id="showGrowthBtn" onClick={handleShowGrowthBtn}></button>
            {/* Button to simulate advancing time by 10 days */}
            <button id="endRoutineBtn" onClick={endRoutine}></button>
          </div>
        </>
      <ButtonBar />
    </>
  );
}
