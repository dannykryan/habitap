import styles from "./tickPopup.module.css";

function TickPopup( { closePopup } : any) {

  return (
    <div
      className={styles.popup}
    >
      <h3>You have completed this for the day</h3>
      <p>Come back tomorrow to keep your habit going! And remember to check out your plant growth!</p>
      <div className={styles.popupBtnContainer}>
        <div className={styles.midBtn} onClick={closePopup}>
          OK
        </div>
      </div>
    </div>
  );
}

export default TickPopup;