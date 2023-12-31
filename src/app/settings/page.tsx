import Prompt from "../../../components/prompt";
import ButtonBar from "../../../components/ButtonBar";

export default function Settings() {
    return (
        <>
        <Prompt
            tenDaysPassed={tenDaysPassed}
            isCommitted={isCommitted}
            maxScore={maxScore}
            currentScore={currentScore}
            percentageDecimal={percentageDecimal}
            toggleIsCommitted={toggleIsCommitted}
        />
        <ButtonBar />
        <h1>THIS IS SETTINGS</h1>
        </>
    );
}