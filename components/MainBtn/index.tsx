import styles from '../MainBtn/MainBtn.module.css';
import Link from 'next/link';

export default function MainBtn() {
  return ( <>
  <Link href="/myList">
    <button className={styles.mainBtn}>
      Home
    </button>
    </Link>
  </>
  );
}
