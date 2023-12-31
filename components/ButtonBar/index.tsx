// ButtonBar.tsx
"use client"
import Image from "next/image";
import FlowerButton from "../../public/icons/Buttons/flower-button.png";
import ListButton from "../../public/icons/Buttons/list-button.png";
import SettingsButton from "../../public/icons/Buttons/settings-button.png";
import FlowerButtonFocus from "../../public/icons/Buttons/flower-button-focus.png";
import ListButtonFocus from "../../public/icons/Buttons/list-button-focus.png";
import SettingsButtonFocus from "../../public/icons/Buttons/settings-button-focus.png";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function ButtonBar() {

  const currentPage = usePathname();
  console.log(`The current page is: ${currentPage}`);
  
  return (
    <div className="btn-bar">
      <Link href="/list">
        <Image
          src={currentPage === "/list" ? ListButtonFocus : ListButton}
          id="ListBtn"
          className="btn"
          alt="List Button"
        />
      </ Link>
      <Link href="/">
        <Image
          src={currentPage === "/" ? FlowerButtonFocus : FlowerButton}
          id="FlowerBtn"
          className="btn"
          alt="Flower Button"
        />
      </Link>
      <Link href="/settings">
      <Image
        src={currentPage === "/settings" ? SettingsButtonFocus : SettingsButton}
        id="SettingsBtn"
        className="btn"
        alt="Settings Button"
      />
      </Link>
    </div>
  );
}
