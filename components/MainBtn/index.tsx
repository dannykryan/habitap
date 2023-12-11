import styles from "../MainBtn/MainBtn.module.css";
import React, { MouseEvent } from "react";

interface MainBtnProps {
  isMyListPage: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function MainBtn({ isMyListPage, onClick }: MainBtnProps) {
  return (
    <>
      <button className={styles.mainBtn} onClick={onClick}>
        {isMyListPage ? "Home" : "MyList"}
      </button>
    </>
  );
}
