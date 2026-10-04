import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import { Question } from '@/components/question/question'
import { JumpButton } from '@/components/jumpbutton/jumpbutton'

declare global {
    interface Window {
        autofill?: () => void;
    }
}

type QuestionData = {
    index: number;
    indicator: string;
    weight: number;
    question: string;
};

type AnswerData = {
    indicator: string;
    weight: number;
    score: number | null;
};


export function Quiz() {
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const [quizAnswers, setAnswers] = useState<AnswerData[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetch("./data/json/quiz_list.json")
        .then((response) => response.json())
        .then((data: QuestionData[]) => {
            setQuestions(data);
            setAnswers(data.map(({ indicator, weight }) => ({
                indicator,
                weight,
                score: null,
            })));
        });
    }, []);

    useEffect(() => {
        if (questions.length === 0) {
            return;
        }

        window.autofill = () => {
            const scoreOptions = [-2, -1, 0, 1, 2];
            setAnswers(questions.map(({ indicator, weight }) => {
                const randomIndex = Math.floor(Math.random() * scoreOptions.length);
                return { indicator, weight, score: scoreOptions[randomIndex] };
            }));
        };

        return () => {
            delete window.autofill;
        };
    }, [questions]);

    function handleAnswer(questionIndex: number, score: number) {
        setAnswers((current) => {
            const updated = [...current];
            updated[questionIndex] = {
                ...updated[questionIndex],
                score,
            };
            return updated;
        });
    }

    function handleSubmit() {
        if (quizAnswers.some((answer) => answer.score === null)) {
            const firstUnansweredIndex = quizAnswers.findIndex((answer) => answer.score === null);
            const firstUnansweredQuestion = document.getElementById(`q-${firstUnansweredIndex}`);
            if (firstUnansweredQuestion) {
                firstUnansweredQuestion.scrollIntoView({ behavior: "smooth" });
            }
        return;
        }

        const answers = quizAnswers.map(({ indicator, weight, score }) => ({
            indicator,
            weight,
            score,
        }));

        navigate("/results", { state: { answers } });
    }

    return (
        <section className='mt-8 flex flex-col items-center mb-8'>
            {questions.map((question, index) => (
                <Question
                key={index}
                question={question}
                value={quizAnswers[index]?.score ?? null}
                onChange={(score) => handleAnswer(index, score)}
                />
            ))}

            <JumpButton 
                text="Let's Go" 
                fontSize="h3" 
                icon={<i className="bi bi-arrow-right text-aliceblue text-bold" />}
                onClick={handleSubmit}/>
        </section>
    );
}