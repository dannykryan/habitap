import Image from 'next/image';
import FlowerButton from '../../public/icons/Buttons/flower-button.png';
import ListButton from '../../public/icons/Buttons/list-button.png';
import SettingsButton from '../../public/icons/Buttons/settings-button.png';
import FlowerButtonFocus from '../../public/icons/Buttons/flower-button-focus.png';
import ListButtonFocus from '../../public/icons/Buttons/list-button-focus.png';
import SettingsButtonFocus from '../../public/icons/Buttons/settings-button-focus.png';

export default function ButtonBar() {
  return (
    <div className="btn-bar">
      <Image src={ListButton} id="ListBtn" className="btn" alt="List Button" />
      <Image src={FlowerButton} id="FlowerBtn" className="btn" alt="Flower Button" />
      <Image src={SettingsButton} id ="SettingsBtn" className="btn" alt="Settings Button" />
    </div>
  );
}
