import styles from "./InstructionPopup.module.css";
import Image from "next/image";

export default function InstructionPopup({
  toggleInstructions,
  confirmInstructions,
}: any) {
  return (
    // returns a popup with initial instructions
    <div
      className={styles.popup}
      style={{ display: toggleInstructions ? "flex" : "none" }}
    >
      <h3>Welcome to Habitap!</h3>
      <p>
        This is the app that will help you to commit to your habits. The better
        you are at sticking to them, the more your Habitap plant will grow. So,
        if you&apos;re ready, commit to a maximum of 5 habits now and start
        tracking your progress.
      </p>
      <div className={styles.popupBtnContainer}>
        <div className={styles.midBtn} onClick={confirmInstructions}>
          Let&apos;s start growing!
        </div>
      </div>
    </div>
  );
}
