// Import necessary dependencies and icons
import Image from 'next/image';
import enterIcon from '../../../public/icons/enter-icon-green2.svg';
import trashIconGreen from '../../../public/icons/trash-icon-green.svg';
import { useState } from 'react';
import { Task, NewRoutineListProps } from '../../../types/types';

// The NewRoutineList generates a list item for each of the habits in the taskData array. It also includes an input field for the user to add new habits to the list. The user can add up to 5 habits to the list. The user can also delete habits from the list by clicking on the trash icon.

export default function NewRoutineList({ taskData, addNewData, deleteData }: NewRoutineListProps) {
  // Maximum number of tasks to display
  const maxTasks = 5;
  // State variable to manage input value
  const [inputValue, setInputValue] = useState('');

  // Function to handle click on enter icon to add new task
  function handleEnterIcon() {
    const element = {
      id: taskData.length + 1,
      title: inputValue,
      completed: false,
      committedDays: 10,
    };
    addNewData(element);
    setInputValue(''); // Reset the input value after adding data
  }

  // Function to handle input value change
  function handleInputValue(e: any) {
    const { value } = e.target;
    setInputValue(value);
  }

  // Function to handle enter key press
  function handleEnterKey(e: any) {
    if (e.key === 'Enter') {
      const element = {
        id: taskData.length + 1,
        title: inputValue,
        completed: false,
      };
      addNewData(element as Task);
      setInputValue(''); // Reset the input value after adding data
    }
  }

  // Function to handle click on delete icon
  function handleDeleteClick(id: number) {
    deleteData(id);
  }

  return (
    <div id="list-container">
      <ul className="myList">
        {/* Mapping over taskData to render existing tasks */}
        {taskData.map((todo: Task) => (
          <li key={todo.id} className="listItem">
            <div className="newHabit">
              {todo.title}
              {/* Render delete icon */}
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
        {Array.from({ length: maxTasks - taskData.length }).map((_, index) => (
          <li key={index}>
            <div className={index === 0 ? "listInput" : "emptyListItem"}>
              {index === 0 ? (
                <input
                  className="emptyListInput"
                  type="text"
                  value={inputValue}
                  onChange={handleInputValue}
                  onKeyDown={handleEnterKey}
                  placeholder="Please enter your habit"
                />
              ) : (
                <div></div>
              )}
              {/* Render enter icon if it's the first item */}
              {index === 0 && (
                <Image src={enterIcon} alt="empty list item placeholder" height={27} onClick={handleEnterIcon}/>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
