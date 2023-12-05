import styles from '../MainBtn/MainBtn.module.css';
import Link from 'next/link';

export default function MainBtn() {
  return ( <>
  <Link href="/">
    <button className={styles.mainBtn}>
      Home
    </button>
    </Link>
  </>
  );
}
