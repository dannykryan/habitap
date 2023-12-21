import Image from "next/image";
import {InstructionPopupProps} from "../../types/types";

export default function InstructionPopup({
  toggleInstructions,
  confirmInstructions,
}: InstructionPopupProps) {
  return (
    // returns a popup with initial instructions
    <div
      className={"popup"}
      style={{ display: toggleInstructions ? "flex" : "none" }}
    >
      <h3>Welcome to Habitap!</h3>
      <p>
        This is the app that will help you to commit to your habits. The better
        you are at sticking to them, the more your Habitap plant will grow. So,
        if you&apos;re ready, commit to a maximum of 5 habits now and start
        tracking your progress.
      </p>
      <div className={"popupBtnContainer"}>
        <div className={"midBtn"} onClick={confirmInstructions}>
          Let&apos;s Go!
        </div>
      </div>
    </div>
  );
}
