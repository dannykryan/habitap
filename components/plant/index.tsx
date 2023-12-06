import Image from "next/image";
import PlantPotImg from "public/plants/cheeseplant-1.svg";
import Cheeseplant7Img from "public/plants/cheeseplant-7.svg";
import Cheeseplant10Img from "public/plants/cheeseplant-10.svg";
import { useState, useEffect } from "react";

export default function Plant({ score }) {
  // we need the plant to have the initial state of "a plant pot"
  // when the score changes from 0 but limit is 1-50 we need the image of the plant to be "cheeseplant 7"
  //when the score is above 50, plant image should change to "cheeseplant 10"
  const [plantImage, setPlantImage] = useState(PlantPotImg);

  //The useEffect hook is used to perform side effects, such as updating the state, after the component has rendered. In this case, the useEffect hook is set up with the dependency array [score], which means that it will be triggered whenever the value of score changes.
  useEffect(() => {
    if (score === 0) {
      setPlantImage(PlantPotImg);
    } else if (score >= 1 && score <= 50) {
      setPlantImage(Cheeseplant7Img);
    } else if (score > 50) {
      setPlantImage(Cheeseplant10Img);
    }
  }, [score]);
  return (
    <>
      <Image
        src={plantImage}
        alt="This is an image of a plant"
        width={250}
        height={250}
      />
    </>
  );
}
