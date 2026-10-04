import Style from './details.module.css'

import { Divider } from "@/components/divider/divider";

import { PercentageBar } from "@/components/percentagebar/percentagebar";

type Result = {
    indicator: string;
    percentage: number;
}

type PersonalityData = {
    "personality_type": string,
    "name": string,
    "description": string
}


type DetailsProps = {
    percentages: Result[];
    personality?: PersonalityData;
}

export function Details({ percentages, personality }: DetailsProps) {
    return (
        <>
            <section className={Style.details}>
                <h1 className="text-center">Your Traits</h1>
                <h3 className="text-center">Down into the details</h3>
                <Divider />
                <h4 className="indent-6 lg:w-1/2 w-4/5">&emsp;{personality?.description || "Loading..."}</h4>
            </section>
            <section className="flex flex-col items-center gap-7 mt-10 mb-5">
                {percentages.map((percentage) => (
                    <PercentageBar indicator={percentage.indicator}
                                   percentage={percentage.percentage}
                                   />
                ))}
            </section>
        </>
    )
}