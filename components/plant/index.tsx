import Image from "next/image";
import PlantImg from "public/plants/cheeseplant-10.svg";

export default function Plant() {
  return <Image src={PlantImg} alt="This is an image of a plant" width={250} height={250}/>;
}
