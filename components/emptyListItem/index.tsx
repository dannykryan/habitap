import Image from "next/image";
import enterIcon from "../../public/icons/enter-icon-green2.svg";
import styles from "../emptyListItem/emptyListItem.module.css";
import { useState } from "react";

export default function EmptyListItem({ addNewData, taskData }: any) {
  const [add, setAdd] = useState(true);
  const [inputValue, setInputValue] = useState(""); // Change to an empty string

  // updating the state of the edit to display the input
  function handleAdd() {
    setAdd(!add);
  }

  function handleEnterIcon() {
    const element = {
      id: taskData.length + 1,
      title: inputValue,
      completed: false,
    };
    addNewData(element);
    setAdd(!add);
    setInputValue(""); // Reset the input value after adding data
  }

  function handleInputValue(e: any) {
    const { value } = e.target;
    setInputValue(value);
  }

  function handleEnterKey(e: any) {
    if (e.key === "Enter") {
      const element = {
        id: taskData.length + 1,
        title: inputValue,
        completed: false,
      };
      addNewData(element);
      setAdd(!add);
      setInputValue(""); // Reset the input value after adding data
    }
  }

  return (
    <div className={styles.emptyListItem}>
      <input
        className={styles.emptyListInput}
        type="text"
        value={inputValue}
        onChange={handleInputValue}
        onKeyDown={handleEnterKey}
        placeholder="Please enter your habit"
      />
      <Image
        src={enterIcon}
        alt="Plus-icon"
        height={27}
        onClick={handleEnterIcon}
      />
    </div>
  );
}


// return (
//   <div className={styles.emptyListItem} onClick={enterTask}>
//     {isEditing ? (
//       // Render an input field when editing
//       <input
//         className={styles.listInput}
//         type="text"
//         placeholder="Enter a task..."
//         value={newTaskTitle}
//         onChange={handleInputChange}
//         onBlur={handleBlur}
//         onKeyDown={handleKeyDown}
//       />
//     ) : (
//       // Render the plus icon when not editing
//       <Image src={plusIcon} alt="Plus-icon" height={15} />
//     )}
//   </div>
// );
