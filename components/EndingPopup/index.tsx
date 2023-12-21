import Image from "next/image";
import supabase from "../../lib/initSupabase";

interface EndingPopupProps {
  tenDaysPassed: boolean;
  maxScore: number;
  currentScore: number;
  percentageDecimal: number;
  toggleIsCommitted: () => void;
  handleMainBtnClick: () => void;
  clearDatabase: () => void;
}

export default function EndingPopup({
  tenDaysPassed,
  maxScore,
  currentScore,
  percentageDecimal,
  toggleIsCommitted,
  handleMainBtnClick,
  clearDatabase,
}: EndingPopupProps) {

  async function handleReadyButton() {
      // Delete all records from habit_log
      const { error: deleteLogError } = await supabase
      .from("habit_log")
      .delete()
      .eq("user_id", "1");

    if (deleteLogError) {
      console.error("Error deleting habit_log records:", deleteLogError);
      return;
    }

    // Delete records from habit_table
    const { error: deleteError } = await supabase
      .from("habit_table")
      .delete()
      .eq("user_id", "1");

    if (deleteError) {
      console.error("Error deleting habit_table records:", deleteError);
      return;
    }
    console.log("ready button clicked");
    toggleIsCommitted();
    handleMainBtnClick();
    tenDaysPassed = false;  
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
        <div className={"midBtn"} onClick={handleReadyButton}>
          Okay
        </div>
      </div>
    </div>
  );
}
