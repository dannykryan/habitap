"use client"

import Prompt from "../../../components/prompt";
import ButtonBar from "../../../components/ButtonBar";
import plantGrowth1 from "../../../public/plants/temp/plant-growth-1.png";
import plantGrowth2 from "../../../public/plants/temp/plant-growth-2.png";
import plantGrowth4 from "../../../public/plants/temp/plant-growth-4.png";
import plantGrowthBees from "../../../public/plants/temp/plant-growth-bees-2.png";
import Image from "next/image";

export default function Settings() {

    return (
        <>
        <Prompt />
        <div className="hive-row">
            <div className="hive-box">
                <Image
                    src={plantGrowthBees}
                    className="hive-plant"
                    alt="hive member's progress plant"
                />
                <div>
                    <p className="hive-team-member-name">funkapotamus</p>
                </div>
            </div>
            <div className="hive-box">
            <Image
                    src={plantGrowth4}
                    className="hive-plant"
                    alt="hive member's progress plant"
                />
                <div>
                    <p className="hive-team-member-name">lizzier</p>
                </div>
            </div>
            </div>
            <div className="hive-row">
            <div className="hive-box">
            <Image
                    src={plantGrowth2}
                    className="hive-plant"
                    alt="hive member's progress plant"
                />
                <div>
                    <p className="hive-team-member-name">50Spence</p>
                </div>
            </div>
            <div className="hive-box">
            <Image
                    src={plantGrowth1}
                    className="hive-plant"
                    alt="hive member's progress plant"
                />
                <div>
                    <p className="hive-team-member-name">Mr.Horse</p>
                </div>
            </div>
            </div>
        <ButtonBar />
        </>
    );
}