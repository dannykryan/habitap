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
  inPoint: number;
  outPoint: number;
}

export default function Plant({ percentageDecimal }: any) {
  const [animationKey, setAnimationKey] = useState<number>(0);
  // State to manage animation options
  const [animationOptions, setAnimationOptions] = useState<Plant>({
    speed: 1,
    loop: false,
    autoplay: true,
    animationData: allFlowers,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    inPoint: allFlowers.ip,  // Set the inPoint to the initial in-point
    outPoint: allFlowers.op, // Set the outPoint to the initial out-point
  });

  // Effect to update animation options when the percentageDecimal changes
  useEffect(() => {
    // Initial frame values
    let startFrame = allFlowers.ip; //in-point or first frame of animation
    let endFrame = allFlowers.op;   //out-point or last frame of animation
    let animationData: Flower | OneBee | TwoBees | ThreeBees = allFlowers; // Default animation data
    let loop = false; // Default loop value

    // Determine the frame range and animation data based on the percentageDecimal
    if (percentageDecimal === 0) {
      allFlowers.op = 50;
      console.log(`percentageDecimal is: ${percentageDecimal}`);
      console.log(`endFrame is: ${endFrame}`);
    } else if (percentageDecimal <= 0.1) {
      allFlowers.ip = 51;
      allFlowers.op = 195;
      console.log(`percentageDecimal is: ${percentageDecimal}`);
      console.log(`endFrame is: ${endFrame}`);
    } else if (percentageDecimal > 0.1 && percentageDecimal <= 0.2 ) {
      allFlowers.ip = 196;
      allFlowers.op = 283;
      console.log(`percentageDecimal is: ${percentageDecimal}`);
    } else if (percentageDecimal > 0.2 && percentageDecimal <= 0.3) {
      allFlowers.ip = 284;
      allFlowers.op = 367;
      console.log(`percentageDecimal is: ${percentageDecimal}`);
    } else if (percentageDecimal > 0.3 && percentageDecimal <= 0.4) {
      allFlowers.ip = 368;
      allFlowers.op = 441;
      console.log(`percentageDecimal is: ${percentageDecimal}`);
    } else if (percentageDecimal > 0.4 && percentageDecimal <= 0.5) {
      allFlowers.ip = 442;
      allFlowers.op = 496;
      console.log(`percentageDecimal is: ${percentageDecimal}`);
    } else if (percentageDecimal > 0.5 && percentageDecimal <= 0.6) {
      allFlowers.ip = 497;
      allFlowers.op = 551;
      console.log(`percentageDecimal is: ${percentageDecimal}`);
    } else if (percentageDecimal > 0.6 && percentageDecimal <= 0.7) {
      allFlowers.ip = 552;
      allFlowers.op = 592;
      console.log(`percentageDecimal is: ${percentageDecimal}`);
    } else if (percentageDecimal > 0.7 && percentageDecimal <= 0.8) {
      animationData = yourFirstBee;
      loop = true;
      console.log(`percentageDecimal is: ${percentageDecimal}`);
    } else if (percentageDecimal > 0.8 && percentageDecimal <= 0.9) {
      animationData = twoWholeBees;
      loop = true;
      console.log(`percentageDecimal is: ${percentageDecimal}`);
    } else if (percentageDecimal > 0.9 && percentageDecimal <= 1) {
      animationData = threeBeesPlease;
      loop = true;
      console.log(`percentageDecimal is: ${percentageDecimal}`);
    }
      
    // Update the state with the new frame range, animation data, and loop value
    setAnimationOptions((prevOptions) => ({
      ...prevOptions,
      animationData,
      outPoint: endFrame, // Set the new animation data
      loop, // Set the new loop value
    }));
    // Increment the key to force a re-render and restart the animation
    setAnimationKey((prevKey) => prevKey + 1);
  }, [percentageDecimal]);

  return (
    <>
      <Lottie
        key={animationKey}
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
