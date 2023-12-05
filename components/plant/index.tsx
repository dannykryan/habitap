import Image from "next/image";
import ourPlant from "../../public/assets/ourPlant.png";

export default function Plant() {
  return <Image src={ourPlant} alt="This is an image of a plant" width={250} height={250}/>;
}
