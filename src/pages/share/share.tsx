import { useLocation } from "react-router-dom";

import { useRef, useState, useEffect, useCallback } from "react";
import { toPng } from 'html-to-image'

import { submitForm } from "@/core/submit_form";

import { Divider } from "@/components/divider/divider";
import { PercentageBar } from "@/components/percentagebar/percentagebar";
import { JumpButton } from "@/components/jumpbutton/jumpbutton";

import Style from "./share.module.css"

type Result = {
    indicator: string;
    percentage: number;
}

type PersonalityData = {
    personality_type: string,
    name: string,
    description: string
}

type ResultsProps = {
    percentages: Result[];
    personality: PersonalityData;
}

type Answer = {
    indicator: string;
    weight: number;
    score: number | null;
}

function Share() {
    const location = useLocation()
    const { answers, result }: { answers: Answer[], result: ResultsProps } = location.state || {}

    const cardRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string | null>(null);
    const [formsName, setFormsName] = useState<string>("");
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(data: { name: string, result: string, answers: Answer[] }) {
        await submitForm({
            ...data,
            answers: data.answers.map(({ score }) => {
                if (score === null) {
                    throw new Error("Cannot submit an unanswered quiz.");
                }
                return score;
            }),
        });
        inputRef.current?.setAttribute('disabled', 'true');
        setSubmitted(true);
    }

    const generateImage = useCallback(async () => {
        const card = cardRef.current;
        if (!card) return;

        if (document.fonts) {
            await document.fonts.ready;
        }

        const images = Array.from(card.querySelectorAll('img'));
        await Promise.all(images.map(async (image) => {
            if (!image.complete) {
                await new Promise<void>((resolve) => {
                    image.addEventListener('load', () => resolve(), { once: true });
                    image.addEventListener('error', () => resolve(), { once: true });
                });
            }

            if (image.complete && image.naturalWidth > 0) {
                await image.decode().catch(() => undefined);
            }
        }));

        await new Promise<void>((resolve) => {
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        });

        const dataUrl = await toPng(card);
        setImage(dataUrl);
        card.style.display = 'none';
    }, []);

    const saveImage = () => {
        if (!image) return;
        const link = document.createElement('a');
        link.download = 'NSTI_result.png';
        link.href = image;
        link.click();
    };

    useEffect(() => {
        if (result) {
            void generateImage();
        }
    }, [generateImage, result]);

    return (
        <>
            <section className={Style.shareContainer}>
                <div className='flex flex-col items-center justify-center gap-4 min-w-75'>
                    <section className={Style.resultContainer}>
                        <div className={Style.resultCard} ref={cardRef}>
                            <h4 className={`${Style.shadowtext} font-bold text-center tracking-widest`}>N S T I</h4>
                            <div className='flex flex-col items-center justify-center gap-4 my-3'>
                                <Divider width='100%' margin='0'/>         
                                <h1 className={`${Style.shadowtext} text-center`}>{result.personality.name}</h1>
                                <h5 className='font-bold text-center tracking-widest'>{result.personality.personality_type.split('').join(' ')}</h5>
                                <Divider width='100%' margin='0'/>
                            </div>
                            <p className='w-3/4 mt-1 mb-4'>&emsp;{result.personality.description}</p>
                            <section className={Style.traitsContainer}>
                                { result.percentages.map((result) => (
                                    <PercentageBar
                                        indicator={result.indicator}
                                        percentage={result.percentage}
                                        interactive={false}
                                    />
                                ))}
                            </section>
                        </div>
                        <img src={image || ""} className={Style.resultImage} ref={imgRef}/>
                    </section>
                    <JumpButton onClick={saveImage} text='Save Image' fontSize='p'/>
                </div>
                <section className={Style.formsContainer}>
                    <h2 className='text-center text-purple text-shadow-(--text-purple-shadow)'>Share your result with us</h2>
                    <h4 className='text-center'>What's being collected:</h4>
                    <ul className='list-disc list-inside'>
                        <h5><li>Your quiz answers</li></h5>
                        <h5><li>Your personality type results</li></h5>
                    </ul>
                    <p className='text-center'>We will not collect any personal information, and your data will be used for research purposes only.</p>
                    <p>By clicking submit, you agree to our <a href="/privacy-policy" className='text-purple text-shadow-(--text-purple-shadow)'>privacy policy</a>.</p>
                    <input type="text" placeholder="Who are you? (optional)" className={Style.inputField} onChange={(e) => { setFormsName(e.target.value); }} ref={inputRef} />
                    <p className={Style.inputLabel}>If you know the owner personally, enter your name. If somebody shared this quiz to you, enter their name, for example: <i>NAME</i>'s friend'.</p>
                    {submitted ? (
                        <JumpButton onClick={() => console.log('Bro why the fuck are you still spamming the button')} text='Submitted' fontSize='p' />
                    ) : (
                        <JumpButton onClick={() => void handleSubmit({ name: formsName, result: result.personality.personality_type, answers: answers })} text='Submit' fontSize='p' />
                    )}
                </section>
            </section>
        </>
    )
}

export default Share