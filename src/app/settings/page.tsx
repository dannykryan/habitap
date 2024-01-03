import Prompt from "../../../components/prompt";
import ButtonBar from "../../../components/ButtonBar";
import { useAppContext } from "../context";

export default function Settings() {

    // const {
    //     isCommitted,
    //     tenDaysPassed,
    //     currentScore,
    //     maxScore,
    //     percentageDecimal,
    //     activePage,
    //   } = useAppContext();

    return (
        <>
        <ButtonBar />
        {/* <Prompt
            tenDaysPassed={tenDaysPassed}
            isCommitted={isCommitted}
            maxScore={maxScore}
            currentScore={currentScore}
            percentageDecimal={percentageDecimal}
            activePage={activePage}
        /> */}
        </>
    );
}