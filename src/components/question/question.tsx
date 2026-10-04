import Style from './question.module.css';

import { Line } from '@/components/line/line';

export type QuestionData = {
    index: number;
    indicator: string;
    weight: number;
    question: string;
};

type QuestionProps = {
    question: QuestionData;
    value: number | null;
    onChange: (score: number) => void;
};

export function Question({ question, value, onChange }: QuestionProps) {
    const scoreOptions = [-2, -1, 0, 1, 2];
    const scoreClassNames: Record<number, string> = {
        [-2]: `${Style.big} ${Style.red}`,
        [-1]: `${Style.small} ${Style.red}`,
        [0]: `${Style.tiny} ${Style.gray}`,
        [1]: `${Style.small} ${Style.green}`,
        [2]: `${Style.big} ${Style.green}`,
    };
    return (
        <div className='lg:w-3/4 md:w-3/4 sm:w-10/12 flex flex-col items-center justify-center gap-6' id={`q-${question.index}`}>
            <h2 
                className='font-bold text-center text-aliceblue'
            >
                {question.question}
            </h2>
            <span className='flex items-center'>
                <h3 className='font-bold max-sm:hidden text-red'>
                    Hell naw
                </h3>

                {scoreOptions.map((score) => (
                    <label className={Style.circleRadio} key={score}>
                        <input
                            type="radio"
                            name={question.index.toString()}
                            value={score}
                            checked={value === score}
                            onChange={() => {
                                onChange(score);
                                window.scrollBy({top: document.getElementById(`q-${question.index+1}`)?.offsetHeight ?? document.getElementById(`q-${question.index}`)?.offsetHeight, behavior: 'smooth'});
                            }}
                        />
                        <span className={`${Style.circle} ${scoreClassNames[score]}`}></span>
                    </label>
                ))}

                <h3 className='font-bold max-sm:hidden text-green'>
                    Hell yea
                </h3>
            </span>  
            <span className='hidden max-sm:flex items-center justify-center gap-[50vw] w-full -my-5'>
                <h3 className='font-bold text-center text-red'>
                    Hell naw
                </h3>
                <h3 className='font-bold text-center text-green'>
                    Hell yea
                </h3>
            </span>    
            <Line color="var(--color-aliceblue)" thin={true} />
        </div>
    )
}