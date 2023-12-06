import Image from "next/image";
import plusIcon from "../../public/icons/empty-list-plus-icon.svg";
import styles from "../emptyListItem/emptyListItem.module.css";
import { useState } from "react";

export default function EmptyListItem({ addNewData, taskData }: any) {
  const [add, setAdd] = useState(true);
  const [inputValue, setInputValue] = useState(null);

  // updating the state of the edit to display the input
  function handleAdd() {
    setAdd(!add);
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
    }
  }

  return add ? (
    <div className={styles.emptyListItem} onClick={handleAdd}>
      <Image src={plusIcon} alt="Plus-icon" height={15} />
    </div>
  ) : (
    <input
      className={styles.listInput} // it suppose to be the class "listInput"
      type="text"
      onChange={handleInputValue}
      onKeyDown={handleEnterKey}
      placeholder="Please enter your habit"
    />
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
