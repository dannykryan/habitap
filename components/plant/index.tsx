import Image from "next/image";
import PlantPotImg from "public/plants/cheeseplant-1.svg";
import Cheeseplant7Img from "public/plants/cheeseplant-7.svg";
import Cheeseplant10Img from "public/plants/cheeseplant-10.svg";
import { useState, useEffect } from "react";
import tallFlower from "../../public/plants/flower-tall-full.json";
import Lottie from "lottie-react";

// export default function Plant({ score }: any) {
//   // we need the plant to have the initial state of "a plant pot"
//   // when the score changes from 0 but limit is 1-50 we need the image of the plant to be "cheeseplant 7"
//   //when the score is above 50, plant image should change to "cheeseplant 10"
//   const [plantImage, setPlantImage] = useState(PlantPotImg);


//   //The useEffect hook is used to perform side effects, such as updating the state, after the component has rendered. In this case, the useEffect hook is set up with the dependency array [score], which means that it will be triggered whenever the value of score changes.
//   useEffect(() => {
//     if (score === 0) {
//       setPlantImage(plantOne);
//     } else if (score >= 1 && score <= 50) {
//       setPlantImage(plantTwo);
//     } else if (score > 50) {
//       setPlantImage(plantThree);
//     }
//   }, [score]);


//   interface Plant {
//     loop: number;
//     autoplay: boolean;
//     animationData: any;
//     rendererSettings: {
//       preserveAspectRatio: string;
//     };
//   }

//   const plantOne: Plant = {
//     loop: 4,
//     autoplay: true,
//     animationData: tallFlower,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice"
//     }
//   };


//   return (
//     <>
//       <Lottie options={plantImage}
//        /> 

//       {/* <Image
//         src={plantImage}
//         alt="This is an image of a plant"
//         width={250}
//         height={250}
//       /> */}
//     </>
//   );
// }

interface Plant {
  loop: number;
  autoplay: boolean;
  animationData: any;
  rendererSettings: {
    preserveAspectRatio: string;
  };
}

export default function Plant({ score }: any) {
  const [plantAnimation, setPlantAnimation] = useState<Plant>({
    loop: 1,
    autoplay: true,
    animationData: tallFlower,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  });

  useEffect(() => {
    // Determine the range of frames based on the score
    let startFrame = tallFlower.ip;
    let endFrame = tallFlower.op;
    if (score === 0) {
      // Set the animation range to the first half of the animation
      startFrame = tallFlower.ip / 1;
      endFrame = tallFlower.op / 6;
    } else
    if (score >= 1 && score <= 50) {
      // Set different frame range based on the score range
      startFrame = tallFlower.ip / 4;
      endFrame = tallFlower.op / 3; // Adjust this value as needed
    } else if (score > 50) {
      startFrame = tallFlower.ip / 8; // Move to the second half of the animation
      endFrame = tallFlower.op;
    }

    // Set the animation range
    setPlantAnimation({
      loop: 1,
      autoplay: true,
      animationData: {
        ...tallFlower, // Copy all the data from the original animation
        fr: tallFlower.fr, // Set the frame rate
        ip: startFrame,    // Set the in point
        op: endFrame       // Set the out point
      },
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    });
  }, [score]);

  return (
    <>
      <Lottie animationData={plantAnimation.animationData} />
    </>
  );
}

