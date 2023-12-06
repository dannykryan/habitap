import Image from "next/image";
import plusIcon from "../../public/icons/empty-list-plus-icon.svg";
import styles from "../emptyListItem/emptyListItem.module.css";
import { useState } from "react";

export default function EmptyListItem({ addNewData, taskData }: any) {
  const [edit, setEdit] = useState(true);
  const [inputValue, setInputValue] = useState(null);

  function handleEdit() {
    setEdit(!edit);
  }

  function handleInputValue(e: any) {
    const { value } = e.target;
    setInputValue(value);
  }
  return edit ? (
    <div className={styles.emptyListItem} onClick={handleEdit}>
      <Image src={plusIcon} alt="Plus-icon" height={15} />
    </div>
  ) : (
    <input type="text" onChange={handleInputValue} />
  );
}
