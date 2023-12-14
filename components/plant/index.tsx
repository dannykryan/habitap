import { useState, useEffect } from "react";
import allFlowers from "../../public/plants/flower-bunch-2.json";
import threeBeesPlease from "../../public/plants/three-bees-please.json";
import yourFirstBee from "../../public/plants/your-first-bee.json";
import twoWholeBees from "../../public/plants/two-whole-bees.json";
import Lottie from "lottie-react";

type Flower = typeof allFlowers;
type OneBee = typeof yourFirstBee;
type TwoBees = typeof twoWholeBees;
type ThreeBees = typeof threeBeesPlease;

interface Plant {
  speed: number;
  loop: boolean | number;
  autoplay: boolean;
  animationData: Flower | OneBee | TwoBees | ThreeBees;
  rendererSettings: {
    preserveAspectRatio: string;
  };
}

export default function Plant({ score }: any) {
  // State to manage animation options
  const [animationOptions, setAnimationOptions] = useState<Plant>({
    speed: 1,
    loop: false,
    autoplay: true,
    animationData: allFlowers,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  // Effect to update animation options when the score changes
  useEffect(() => {
    // Initial frame values
    let startFrame = allFlowers.ip; //in-point or first frame of animation
    let endFrame = allFlowers.op;   //out-point or last frame of animation
    let animationData: Flower | OneBee | TwoBees | ThreeBees = allFlowers; // Default animation data
    let loop = false; // Default loop value

    // Determine the frame range and animation data based on the score
    if (score === 0) {
      endFrame /= 9;
    } else if (score == 1) {
      endFrame /= 1.6;
    } else if (score == 2) {
      animationData = yourFirstBee; // Change animation data for score 2 or more
      loop = true; // Set loop to true for threeBeesPlease
    } else if (score == 3) {
      animationData = twoWholeBees; // Change animation data for score 3 or more
      loop = true; // Set loop to true for threeBeesPlease
    } else if (score == 4) {
      animationData = threeBeesPlease; // Change animation data for score 4 or more
      loop = true; // Set loop to true for threeBeesPlease
    }

    // Update the state with the new frame range, animation data, and loop value
    setAnimationOptions((prevOptions) => ({
      ...prevOptions,
      animationData, // Set the new animation data
      loop, // Set the new loop value
    }));
  }, [score]);

  return (
    <>
      <Lottie
        className={"plant-main"}
        animationData={animationOptions.animationData}
        loop={animationOptions.loop}
        autoplay={animationOptions.autoplay}
        rendererSettings={animationOptions.rendererSettings}
        height={400}
        width={400}
      />
    </>
  );
}
