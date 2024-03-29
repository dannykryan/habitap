import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { Flower, OneBee, TwoBees, ThreeBees, Plant } from "../../../types/types";
import { useAppContext } from "../context";

// Import the animation data. Allflowers is the default animation data. The other animations are for higher scores when the user has attracted bees to their plant.

import allFlowers from "../../../public/plants/flower-bunch-2.json";
import yourFirstBee from "../../../public/plants/your-first-bee.json";
import threeBeesPlease from "../../../public/plants/three-bees-please.json";
import twoWholeBees from "../../../public/plants/two-whole-bees.json";

// The habit plant is a visual representation of the user's habits. The plant grows as the user completes their habits by reading how many entries have been made to the habit_log. The plant is animated using the Lottie library 'lottie'react'.

export default function Plant() {

  const {
    habitData,
    habitLogsArray,
    showGrowth,
} = useAppContext();

console.log('This is the habitLogsArray:', habitLogsArray);
console.log('This is the habitData:', habitData);

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

    // The progress of the animation is based on the user's percentage of a possible max score.

    // The animation can also be temporarily set to show different animations by cycling through showGrowth states using the demo buttons included in app/page.tsx.

    let currentScore = habitLogsArray?.length ?? 0;
    let maxScore = habitData?.length ? habitData.length * 10 : 0;
    let percentageDecimal = maxScore ? currentScore / maxScore : 0;

    // Initial frame values
    let startFrame = allFlowers.ip; //in-point or first frame of animation
    let endFrame = allFlowers.op;   //out-point or last frame of animation
    let animationData: Flower | OneBee | TwoBees | ThreeBees = allFlowers; // Default animation data
    let loop = false; // Default loop value

    if (showGrowth === "max") {
      animationData = threeBeesPlease;
      loop = true;
    } else if (showGrowth === "growth") {
      allFlowers.ip = 50;
      allFlowers.op = 592;
    } else if (percentageDecimal === 0) {
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
    } else if (percentageDecimal > 0.9) {
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
  }, [habitData, habitLogsArray, showGrowth]);

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
