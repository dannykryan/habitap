import Image from 'next/image';
import styles from '../delToDo/delToDo.module.css';
import trashIcon from '../../public/icons/trash-icon-bold-black.svg';

export default function Button(props) {

// onClick of DelToDoBtn state = !armDelete
        // function handleClick () {
        //   setArmDelete(!armDelete)
        //  }

  return (
    <button className={styles.delToDoBtn}>
      <Image 
      src={trashIcon}
      alt="Trash-icon"
      height={27}
      />
      </button>
  );
}
