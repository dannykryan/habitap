import Image from 'next/image';
import styles from '../delToDo/delToDo.module.css';
import trashIcon from '../../public/icons/trash-icon-bold-black.svg';
import React from 'react';

// interface handleArmDeleteProps {
//   handleArmDelete: any
// }
export default function Button( { handleArmDelete } ) {

// onClick of DelToDoBtn state = !armDelete
        // function handleClick () {
        //   setArmDelete(!armDelete)
        //  }

  return (
    <button className={styles.delToDoBtn} onClick={handleArmDelete}>
      <Image 
      src={trashIcon}
      alt="Trash-icon"
      height={27}
      />
      </button>
  );
}
