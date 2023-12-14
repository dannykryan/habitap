import { useState, useEffect } from "react";
import tallFlower from "../../public/plants/flower-bunch-2.json";
import threeBeesPlease from "../../public/plants/three-bees-please.json";
import yourFirstBee from "../../public/plants/your-first-bee.json";
import twoWholeBees from "../../public/plants/two-whole-bees.json";
import Lottie from "lottie-react";

interface Plant {
  speed: number;
  loop: boolean | number;
  autoplay: boolean;
  animationData: any;
  rendererSettings: {
    preserveAspectRatio: string;
  };
}

export default function Plant({ score }: any) {
  // State to manage animation options
  const [defaultOptions, setDefaultOptions] = useState<Plant>({
    speed: 2,
    loop: false,
    autoplay: true,
    animationData: tallFlower,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  // Effect to update animation options when the score changes
  useEffect(() => {
    // Initial frame values
    let startFrame = tallFlower.ip; //in-point or first frame of animation
    let endFrame = tallFlower.op;   //out-point or last frame of animation
    let animationData = tallFlower; // Default animation data
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
    setDefaultOptions((prevOptions) => ({
      ...prevOptions,
      animationData: {
        ...prevOptions.animationData,
        ip: startFrame,
        op: endFrame,
      },
      animationData, // Set the new animation data
      loop, // Set the new loop value
    }));
  }, [score]);

  return (
    <>
      <Lottie
        className={"plant-main"}
        animationData={defaultOptions.animationData}
        loop={defaultOptions.loop}
        autoplay={defaultOptions.autoplay}
        rendererSettings={defaultOptions.rendererSettings}
        height={400}
        width={400}
      />
    </>
  );
}
