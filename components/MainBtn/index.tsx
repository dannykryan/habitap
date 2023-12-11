import styles from "../MainBtn/MainBtn.module.css";

export default function MainBtn({ isMyListPage, onClick }) {
  return (
    <>
      <button className={styles.mainBtn} onClick={onClick}>
        {isMyListPage ? "Home" : "MyList"}
      </button>
    </>
  );
}
