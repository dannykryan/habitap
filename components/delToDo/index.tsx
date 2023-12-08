import Image from 'next/image';
import styles from '../delToDo/delToDo.module.css';
import trashIcon from '../../public/icons/trash-icon-bold-black.svg';
import React from 'react';

interface handleArmDeleteProps {
  handleArmDelete: () => void
}

const Button: React.FC<handleArmDeleteProps> = ( { handleArmDelete } : any ) => {
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

export default Button;
