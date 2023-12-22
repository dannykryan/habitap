// ButtonBar.tsx

import Image from "next/image";
import FlowerButton from "../../public/icons/Buttons/flower-button.png";
import ListButton from "../../public/icons/Buttons/list-button.png";
import SettingsButton from "../../public/icons/Buttons/settings-button.png";
import { ButtonBarProps } from "../../types/types";

export default function ButtonBar({
  handleFlowerBtnClick,
  handleListBtnClick,
}: ButtonBarProps) {
  return (
    <div className="btn-bar">
      <Image
        src={ListButton}
        onClick={handleListBtnClick}
        id="ListBtn"
        className="btn"
        alt="List Button"
      />
      <Image
        src={FlowerButton}
        onClick={handleFlowerBtnClick}
        id="FlowerBtn"
        className="btn"
        alt="Flower Button"
      />
      <Image
        src={SettingsButton}
        id="SettingsBtn"
        className="btn"
        alt="Settings Button"
      />
    </div>
  );
}
