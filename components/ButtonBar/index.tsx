import Image from 'next/image';
import FlowerButton from '../../public/icons/Buttons/flower-button.png';
import ListButton from '../../public/icons/Buttons/list-button.png';
import SettingsButton from '../../public/icons/Buttons/settings-button.png';

export default function ButtonBar() {
  return (
    <div className="btn-bar">
      <Image src={ListButton} className="btn" alt="List Button" />
      <Image src={FlowerButton} className="btn" alt="Flower Button" />
      <Image src={SettingsButton} className="btn" alt="Settings Button" />
    </div>
  );
}
