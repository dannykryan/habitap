import styles from './NewRoutineList.module.css';
import Image from 'next/image';
import enterIcon from '../../public/icons/enter-icon-green2.svg';
import trashIconGreen from '../../public/icons/trash-icon-green.svg';
import { useState } from 'react';

export default function NewRoutineList({ taskData, addNewData, deleteData }: any) {
  const maxTasks = 5; // Maximum number of tasks to display
  const [add, setAdd] = useState(true);
  const [inputValue, setInputValue] = useState(''); // Change to an empty string

  function handleEnterIcon() {
    const element = {
      id: taskData.length + 1,
      title: inputValue,
      completed: false,
    };
    addNewData(element);
    setAdd(!add);
    setInputValue(''); // Reset the input value after adding data
  }

  function handleInputValue(e: any) {
    const { value } = e.target;
    setInputValue(value);
  }

  function handleEnterKey(e: any) {
    if (e.key === 'Enter') {
      const element = {
        id: taskData.length + 1,
        title: inputValue,
        completed: false,
      };
      addNewData(element);
      setAdd(!add);
      setInputValue(''); // Reset the input value after adding data
    }
  }

  function handleDeleteClick(id: number) {
    deleteData(id);
  }

  return (
    <ul className={styles.myList}>
      {taskData.map((todo: any) => (
        // Look at the types and change them
        <li key={todo.id} className={styles.listItem}>
          <div className={styles.newHabit}>
            {todo.title}
            <Image
              src={trashIconGreen}
              alt={'Delete item Button'}
              height={27}
              onClick={() => handleDeleteClick(todo.id)}
            />
          </div>
        </li>
      ))}
      {/* Render additional inactive items if there are less than maxTasks */}
      {maxTasks > taskData.length && (
        <li>
          <div className={styles.emptyListItem}>
            <input
              className={styles.emptyListInput}
              type="text"
              value={inputValue}
              onChange={handleInputValue}
              onKeyDown={handleEnterKey}
              placeholder="Please enter your habit"
            />
            <Image src={enterIcon} alt="Plus-icon" height={27} onClick={handleEnterIcon} />
          </div>
        </li>
      )}
    </ul>
  );
}
