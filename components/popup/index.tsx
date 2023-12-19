import styles from "./popup.module.css";
import Image from "next/image";

interface PopupProps {
  linkToMyList: () => void;
  confirmData: () => void;
  toggleData: boolean;
  setToggleData: (toggleData: boolean) => void;
  goodLuck: boolean;
  toggleGoodLuck: () => void;
  taskData: any;
}

const Popup: React.FC<PopupProps> = ({
  linkToMyList,
  confirmData,
  toggleData,
  setToggleData,
  toggleGoodLuck,
  taskData,
}) => {
  //a seperate function to handle multiple function calls in the yes button click
  const handleYesButtonClick = () => {
    linkToMyList();
    setToggleData(false);
    toggleGoodLuck();
  };

  return (
    // returns a popup with a message based on the users choices and two buttons
    <div
      className={styles.popup}
      style={{ display: toggleData ? "flex" : "none" }}
    >
      <h3>Ready to commit?</h3>
      <p>You&apos;re committing to {taskData.length} habits for 10 days.</p>
      <div className={styles.popupBtnContainer}>
      <div className={styles.midBtn} onClick={handleYesButtonClick}>
          Yes
        </div>
        <div className={styles.midBtn} onClick={confirmData}>
          No
        </div>
      </div>
    </div>
  );
};

export default Popup;
