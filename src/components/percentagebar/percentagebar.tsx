import { useState } from 'react';
import { useDataContext } from '@/core/datacontext';

import Style from './percentagebar.module.css';

import { Popup } from '@/components/popup/popup';

type PercentageProps = {
    indicator: string;
    percentage: number;
    interactive?: boolean;
}

export function PercentageBar({ indicator, percentage, interactive = true}: PercentageProps) {
    const highlightedTrait = percentage >= 0 ? indicator[0] : indicator[1];

    const barPercentage = 50 + (50 * Math.abs(percentage / 100));

    const dataContext = useDataContext();

    const indicators = dataContext?.indicators || {};

    const [popupOpen, setPopupOpen] = useState(false);

    return (
        <>
            <section
                className={`flex flex-col items-center w-max ${Style.percentageBar} ${!interactive ? Style.nonInteractive : ''}`}
                onClick={interactive ? () => setPopupOpen(true) : undefined}
            >
                <div className="grid grid-cols-[40px_clamp(200px,calc(1900px-60vw),80vw)_40px] gap-[clamp(0px,1vw,1rem)]">
                    <h3 className={`text-right ${indicator[0] === highlightedTrait ? Style.highlighted : 'text-darkgray'}`}>
                        {indicator[0]}
                    </h3>
                    <div className="relative flex flex-col justify-center items-center w-full">
                        <p
                            className={`absolute bottom-3/4 ${Style.label} ${percentage >= 0 ? 'text-right' : 'text-left'}`}
                            style={{ left: `${percentage <= -20 ? `${100-barPercentage}%` : 'auto'}`,
                                    right: `${percentage >= 20 ? `${100-barPercentage}%` : 'auto'}` }}
                        >
                            {barPercentage}% {indicators[highlightedTrait]?.name}
                        </p>
                        <div className={Style.barContainer}>
                            <div className={`${Style.bar} ${indicator[1] === highlightedTrait ? Style.reverse : ''}`}
                                style={{ width: `${barPercentage}%` }} />
                        </div>
                    </div>
                    <h3 className={`text-left ${indicator[1] === highlightedTrait ? Style.highlighted : 'text-darkgray'}`}>
                        {indicator[1]}
                    </h3>
                </div>
                <div className="flex justify-between w-full px-14 full-indicators">
                    <p className={`text-left ${indicator[0] === highlightedTrait ? Style.highlighted : 'text-darkgray'}`}>
                        {indicators[indicator[0]]?.name}
                    </p>
                    <div/>
                    <p className={`text-right ${indicator[1] === highlightedTrait ? Style.highlighted : 'text-darkgray'}`}>
                        {indicators[indicator[1]]?.name}
                    </p>
                </div>
            </section>
            { interactive && indicators[highlightedTrait] &&
                <Popup 
                    percentage={barPercentage}
                    data={indicators[highlightedTrait]}
                    isOpen={popupOpen}
                    onClose={() => setPopupOpen(false)}
                />
            }   
        </>
    )
}