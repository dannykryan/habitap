import React, { ReactNode } from 'react';
import styles from '../listItem/listItem.module.css';

interface ListItemProps {
  children: ReactNode;
  className?: string;
}

const ListItem: React.FC<ListItemProps> = ({ children, className }) => {
  return <div className={`${styles.todoActive} ${className}`}>
    {children}
    </div>;
};

export default ListItem;