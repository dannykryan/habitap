import supabase from "../../../../lib/initSupabase";
import Link from "next/link";
import { useAppContext } from "../../context";

export default function EndingPopup() {

  const {
      isCommitted,
      tenDaysPassed,
      toggleIsCommitted,
      habitData,
      habitLogsArray,
      setHabitLogsArray,
      setHabitData,
      user,
    } = useAppContext();

  let currentScore = habitLogsArray?.length ?? 0;
  let maxScore = habitData?.length ? habitData.length * 10 : 0;
  let percentageDecimal = maxScore ? currentScore / maxScore : 0;

  async function handleEndingOkayButton() {
      // Delete all records from habit_log
      const { error: deleteLogError } = await supabase
      .from("habit_log")
      .delete()
      .eq("user_id", user?.id);

    if (deleteLogError) {
      console.error("Error deleting habit_log records:", deleteLogError);
      return;
    } else {
      setHabitLogsArray([]);
    }

    // Delete records from habit_table
    const { error: deleteError } = await supabase
      .from("habit_table")
      .delete()
      .eq("user_id", user?.id);

    if (deleteError) {
      console.error("Error deleting habit_table records:", deleteError);
      return;
    } else {
      setHabitData([]);
    }
    console.log("Ending Okay button clicked");
    toggleIsCommitted();
    console.log(`The value of isCommitted is: ${isCommitted}`);
    console.log(`The value of tenDaysPassed is: ${tenDaysPassed}`);
  }

  // Function to determine the message based on percentageDecimal
  const getMessage = () => {
    if (percentageDecimal === 0) {
      return `Oh dear! 😬  Better luck next time.`;
    } else if (percentageDecimal <= 0.3) {
      return "Well, it's a start! Keep it up, I suppose! 🤷‍♂️🤷‍♀️";
    } else if (percentageDecimal <= 0.5) {
      return "That's a pretty good try! 🙂";
    } else if (percentageDecimal <= 0.7) {
      return "Well, aren't you a little beekeeper! 🐝";
    } else if (percentageDecimal <= 0.9) {
      return "You're a star! Our bees never had it so good! 🐝🐝";
    } else {
      return "Cracking Job! From now on, you shall be known as the Bee Whisperer! 🐝🐝🐝";
    }
  };

  return (
    <div
      className={"popup"}
      style={{ display: tenDaysPassed ? "flex" : "none" }}
    >
      <h3>Times Up!</h3>
      <p>
        Out of a possible {maxScore || 0} habits, you ticked off {currentScore || 0}.
      </p>  
      <p>
        {getMessage()}
      </p>
      <div className={"popupBtnContainer"}>
        <Link href="/list">
        <div className={"midBtn"} onClick={handleEndingOkayButton}>
          Okay
        </div>
        </Link>
      </div>
    </div>
  );
}
