// ButtonBar.tsx
"use client"
import Image from "next/image";
import FlowerButton from "../../../public/icons/Buttons/flower-button.png";
import ListButton from "../../../public/icons/Buttons/list-button.png";
import HiveButton from "../../../public/icons/Buttons/hive-button.png";
import HiveButtonFocus from "../../../public/icons/Buttons/hive-button-focus.png";
import SettingsButton from "../../../public/icons/Buttons/settings-button.png";
import FlowerButtonFocus from "../../../public/icons/Buttons/flower-button-focus.png";
import ListButtonFocus from "../../../public/icons/Buttons/list-button-focus.png";
import SettingsButtonFocus from "../../../public/icons/Buttons/settings-button-focus.png";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useAppContext } from "../context";

export default function ButtonBar() {

  const currentPage = usePathname();

  const {
    setActivePage,
    activePage,
  } = useAppContext();
  
  return (
    <div className="btn-bar">
      <Link href="/list">
        <Image
          src={currentPage === "/list" ? ListButtonFocus : ListButton}
          id="ListBtn"
          className="btn"
          alt="List Button"
          onClick={() => setActivePage("list")}
        />
      </ Link>
      <Link href="/">
        <Image
          src={currentPage === "/" ? FlowerButtonFocus : FlowerButton}
          id="FlowerBtn"
          className="btn"
          alt="Flower Button"
          onClick={() => setActivePage("flower")}
        />
      </Link>
      <Link href="/hive">
      <Image
        src={currentPage === "/hive" ? HiveButtonFocus : HiveButton}
        id="HiveBtn"
        className="btn"
        alt="hive Button"
        onClick={() => setActivePage("hive")}
      />
      </Link>
      <Link href="/settings">
      <Image
        src={currentPage === "/settings" ? SettingsButtonFocus : SettingsButton}
        id="SettingsBtn"
        className="btn"
        alt="Settings Button"
        onClick={() => setActivePage("settings")}
      />
      </Link>
    </div>
  );
}
