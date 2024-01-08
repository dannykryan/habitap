"use client"

import Prompt from "../components/Prompt";
import ActiveList from "../components/ActiveList";
import NewRoutineForm from "../components/NewRoutineForm";
import ButtonBar from "../components/ButtonBar";
import { useAppContext } from "../context";
import { useRouter } from 'next/navigation'


export default function List() {



  const {
    isCommitted,
    habitData,
    toggleIsCommitted,
    setActivePage,
    goodLuck,
    toggleGoodLuck,
    setHabitData,
    user,
    setUser,
  } = useAppContext();

  const router = useRouter();

  if (typeof window !== 'undefined' && window.location !== undefined) {
  if (user?.id === undefined || user?.id === null) {
    router.push("/login")
  }
}

  return (
    <div>
      <Prompt />
      <ButtonBar />
      {isCommitted ? (
        <div id="list-container">
          <ActiveList
            taskData={habitData}
            toggleIsCommitted={toggleIsCommitted}
          />
        </div>
      ) : (
        // Render NewRoutineForm only if habitData is not present
        <div>
          {!isCommitted && (
            <NewRoutineForm
              toggleIsCommitted={toggleIsCommitted}
              isCommitted={isCommitted}
              goodLuck={goodLuck}
              toggleGoodLuck={toggleGoodLuck}
              setActivePage={setActivePage}
              setHabitData={setHabitData}
              user={user}
              setUser={setUser}
            />
          )}
        </div>
      )}
    </div>
    
  );
}  
