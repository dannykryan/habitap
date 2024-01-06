import { ReactNode, MouseEvent } from "react";
import allFlowers from "../public/plants/flower-bunch-2.json";
import threeBeesPlease from "../public/plants/three-bees-please.json";
import yourFirstBee from "../public/plants/your-first-bee.json";
import twoWholeBees from "../public/plants/two-whole-bees.json";

export interface Habit {
  habit_id: string;
  habit_name: string;
  created_at: string;
  completed: boolean;
  current_score: number;
  max_score: number;
  user_id: number;
  completed_at: string;
}

export interface HabitLog {
  habit_id: string;
  completed_at: string;
  user_id: number;
}

export interface ListItemProps {
  children: ReactNode;
  className?: string;
  todo: HabitLog;
}

export interface ActiveListProps {
  taskData: Habit[] | null;
  toggleIsCommitted: () => void;
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  committedDays: number;
}

export interface NewRoutineFormProps {
  toggleIsCommitted: () => void;
  isCommitted: boolean;
  goodLuck: boolean;
  toggleGoodLuck: () => void;
  setActivePage: (activePage: string) => void;
}

export interface NewRoutineListProps {
  taskData: Task[];
  addNewData: (todo: Task) => void;
  deleteData: (id: number) => void;
}

export interface InstructionPopupProps {
  toggleInstructions: boolean;
  confirmInstructions: () => void;
}

export interface PopupProps {
  linkToMyList: () => void;
  confirmData: () => void;
  toggleData: boolean;
  setToggleData: (toggleData: boolean) => void;
  goodLuck: boolean;
  toggleGoodLuck: () => void;
  taskData: Task[];
  setActivePage: (activePage: string) => void;
}

export interface MainBtnProps {
  isMyListPage: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export type Flower = typeof allFlowers;

export type OneBee = typeof yourFirstBee;

export type TwoBees = typeof twoWholeBees;

export type ThreeBees = typeof threeBeesPlease;

export interface Plant {
  speed: number;
  loop: boolean | number;
  autoplay: boolean;
  animationData: Flower | OneBee | TwoBees | ThreeBees;
  rendererSettings: {
    preserveAspectRatio: string;
  };
  inPoint: number;
  outPoint: number;
}

export interface PlantProps {
  percentageDecimal: number;
  showGrowth: string;
}

export interface TickPopupProps {
  closePopup: () => void;
}
