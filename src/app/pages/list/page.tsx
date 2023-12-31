import Prompt from "../../../../components/prompt";
import ActiveList from "../../../components/ActiveList";
import NewRoutineForm from "../../../../components/NewRoutineForm";



export default function List() {
    return (
        <div>
        <Prompt
        tenDaysPassed={tenDaysPassed}
        isCommitted={isCommitted}
        maxScore={maxScore}
        currentScore={currentScore}
        percentageDecimal={percentageDecimal}
        toggleIsCommitted={toggleIsCommitted}
        activePage={activePage}
      />
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
          {/* Render NewRoutineForm only if habitData is not present */}
          <div>
            {!isCommitted && (
              <NewRoutineForm
                toggleIsCommitted={toggleIsCommitted}
                isCommitted={isCommitted}
                goodLuck={goodLuck}
                toggleGoodLuck={toggleGoodLuck}
                setActivePage={setActivePage}
                activePage={activePage}
              />
            )}
          </div>
        )
        </div>
    );
}