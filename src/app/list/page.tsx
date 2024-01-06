"use client"

import Prompt from "../../../components/prompt";
import ActiveList from "../../../components/ActiveList";
import NewRoutineForm from "../../../components/NewRoutineForm";
import ButtonBar from "../../../components/ButtonBar";
import { useAppContext } from "../context";

export default function List() {

  const {
    isCommitted,
    habitData,
    toggleIsCommitted,
    setActivePage,
    goodLuck,
    toggleGoodLuck,
  } = useAppContext();

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
            />
          )}
        </div>
      )}
    </div>
    
  );
}  
