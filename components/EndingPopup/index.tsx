import styles from "./InstructionPopup.module.css";
import Image from "next/image";
import supabase from "../../lib/initSupabase";

export default function EndingPopup({
  tenDaysPassed,
  maxScore,
  currentScore,
  percentageDecimal,
  toggleIsCommitted,
  handleMainBtnClick,
}: any) {

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
      return "Zero percent? Don't worry, everyone starts somewhere!";
    } else if (percentageDecimal <= 0.3) {
      return "Well, it's a start! Keep it up!";
    } else if (percentageDecimal <= 0.5) {
      return "Halfway there! You're doing great!";
    } else if (percentageDecimal <= 0.7) {
      return "Impressive! You're almost there!";
    } else if (percentageDecimal <= 0.9) {
      return "Wow! You're doing fantastic!";
    } else {
      return "Incredible! You're a superstar! 🌟";
    }
  };

  return (
    <div
      className={styles.popup}
      style={{ display: tenDaysPassed ? "flex" : "none" }}
    >
      <h3>Times Up!</h3>
      <p>
        Congratulations, you have reached the end of your 10-day challenge. Out of a possible {maxScore || 0} habits, you managed to tick off {currentScore || 0}!
      </p>
      <p>
      {getMessage()} Now, are you ready to do it all over again?
      </p>
      <div className={styles.popupBtnContainer}>
        <div className={styles.midBtn} onClick={handleReadyButton}>
          I&apos;m ready, let&apos;s go!
        </div>
      </div>
    </div>
  );
}
