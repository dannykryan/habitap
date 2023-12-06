import Image from "next/image";
import plusIcon from '../../public/icons/empty-list-plus-icon.svg'
import styles from '../emptyListItem/emptyListItem.module.css'

export default function EmptyListItem() {

    return (
    <div className={styles.emptyListItem}>
        <Image 
      src={plusIcon}
      alt="Plus-icon"
      height={15}
      />
    </div>
    );
  }