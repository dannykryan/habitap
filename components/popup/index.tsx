import Image from "next/image";
import { PopupProps } from "../../types/types";

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
      className={"popup ready-popup"}
      style={{ display: toggleData ? "flex" : "none" }}
    >
      <h3>Ready to commit?</h3>
      <p>You&apos;re committing to {taskData.length} habits for 10 days.</p>
      <div className={"popupBtnContainer"}>
      <div className={"midBtn"} onClick={handleYesButtonClick}>
          Yes
        </div>
        <div className={"midBtn"} onClick={confirmData}>
          No
        </div>
      </div>
    </div>
  );
};

export default Popup;
