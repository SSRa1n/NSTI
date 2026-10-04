import { useLocation, useNavigate } from 'react-router-dom'
import { createContext, useEffect, useState } from "react";

import { Personality } from "./sections/personality";
import { Details } from "./sections/details";

import { Shape } from '@/components/shape/shape'
import { JumpButton } from '@/components/jumpbutton/jumpbutton'

type Result = {
    indicator: string;
    percentage: number;
}

type PersonalityData = {
    "personality_type": string,
    "name": string,
    "description": string
}

type PersonalityResult = {
    percentages: Result[];
    personality: PersonalityData;
}

type AnswerData = {
    indicator: string;
    weight: number;
    score: number | null;
};

type Indicators = {
    name: string;
    trait: string;
    description: string;
    image: string;
}

function getPercentage(answers: AnswerData[]): Result[] {
    const indicatorScores: { [key: string]: number } = {};
    const indicatorFullScores: { [key: string]: number } = {};

    answers.forEach((answer) => {
        if (answer.score !== null) {
            indicatorScores[answer.indicator] = (indicatorScores[answer.indicator] || 0) + (answer.score * answer.weight);
            indicatorFullScores[answer.indicator] = (indicatorFullScores[answer.indicator] || 0) + Math.abs(answer.weight * 2);
        }
    });

    const percentages: Result[] = Object.keys(indicatorScores).map((indicator) => {
        if (indicator === "SM") {
            const smPercentage = indicatorScores[indicator] / indicatorFullScores[indicator];
            let percentage: number;
            const SMthreshold = 0.5;
            const SMmultiplier = 2;
            if (Math.abs(smPercentage) < SMthreshold) {
                percentage = Math.round(smPercentage * SMmultiplier * -100);
            } else {
                percentage = Math.round(smPercentage * 100);
            }
            return { indicator, percentage };
        } else {
            const percentage = Math.round((indicatorScores[indicator] / indicatorFullScores[indicator]) * 100);
            return { indicator, percentage };
        }
    });

    return percentages;
}

async function getPersonalityType(percentages: Result[]): Promise<PersonalityData> {
    const response = await fetch("./data/json/personality_list.json");
    const data: PersonalityData[] = await response.json();

    let personality_text = "";
    percentages.forEach((result) => {
        if (result.percentage >= 0) {
            personality_text += result.indicator[0];
        } else {
            personality_text += result.indicator[1];
        }
    })

    const matchedPersonality = data.find((personality) => personality.personality_type === personality_text);

    return matchedPersonality || data[0];
}

async function calculateResults(answers: AnswerData[]): Promise<PersonalityResult> {
    const percentages = getPercentage(answers);
    const personality = await getPersonalityType(percentages);
    return { percentages, personality };
}

function Results() {
    const location = useLocation()
    const { answers } = location.state || {}

    const navigate = useNavigate()

    const [result, setResult] = useState<PersonalityResult | null>(null);

    const [indicators, setIndicators] = useState<Record<string, Indicators>>({});

    const IndicatorMapContext = createContext<Record<string, Indicators>>({});

    useEffect(() => {
        window.scrollTo({ top: 0 })
    })
    
    useEffect(() => {
        if (answers.length === 0) return;
        
        calculateResults(answers).then(setResult);
    }, [answers]);

    useEffect(() => {
        fetch("./data/json/indicators.json")
        .then((response) => response.json())
        .then(setIndicators)
    }, []);

    return (
        <>
            <Personality personality={result?.personality} />
            <Shape color="rgb(5, 4, 20)" />
            <IndicatorMapContext.Provider value={indicators}>
                <Details percentages={result?.percentages || []}
                        personality={result?.personality} />
            </IndicatorMapContext.Provider>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-10">
                <button 
                    className="share-button justify-self-end"                   
                    onClick={() => {navigate("/share", { state: { answers, result } })}}>
                        <i className='bi bi-share text-base'/>
                </button>
                <JumpButton 
                    text="Unlock Your Potential" 
                    fontSize="h4" 
                    icon={<i className="bi bi-search"/>}
                    onClick={() => {navigate("/potential")}}/>
                </div>
                <div/>
        </>
    )
}

export default Results