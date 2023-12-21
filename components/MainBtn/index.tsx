import styles from "../MainBtn/MainBtn.module.css";
import React from "react";
import {MainBtnProps} from '../../types/types'

export default function MainBtn({ isMyListPage, onClick }: MainBtnProps) {
  return (
    <>
      <button className={styles.mainBtn} onClick={onClick}>
        {isMyListPage ? "Home" : "MyList"}
      </button>
    </>
  );
}
