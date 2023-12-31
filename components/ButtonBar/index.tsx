// ButtonBar.tsx

import Image from "next/image";
import FlowerButton from "../../public/icons/Buttons/flower-button.png";
import ListButton from "../../public/icons/Buttons/list-button.png";
import SettingsButton from "../../public/icons/Buttons/settings-button.png";
import FlowerButtonFocus from "../../public/icons/Buttons/flower-button-focus.png";
import ListButtonFocus from "../../public/icons/Buttons/list-button-focus.png";
import SettingsButtonFocus from "../../public/icons/Buttons/settings-button-focus.png";
import { ButtonBarProps } from "../../types/types";
import Link from "next/link";

export default function ButtonBar({
  handleFlowerBtnClick,
  handleListBtnClick,
  activePage,
}: ButtonBarProps) {
  return (
    <div className="btn-bar">
      <Link href="/list">
        <Image
          src={activePage === "list" ? ListButtonFocus : ListButton}
          id="ListBtn"
          className="btn"
          alt="List Button"
        />
      </ Link>
      <Image
        src={activePage === "flower" ? FlowerButtonFocus : FlowerButton}
        onClick={handleFlowerBtnClick}
        id="FlowerBtn"
        className="btn"
        alt="Flower Button"
      />
      <Image
        src={activePage === "settings" ? SettingsButtonFocus : SettingsButton}
        id="SettingsBtn"
        className="btn"
        alt="Settings Button"
      />
    </div>
  );
}
