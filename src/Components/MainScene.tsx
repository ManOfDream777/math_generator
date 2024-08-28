import { generate_tasks, shuffleArray } from "../services/utils";
import React, { useEffect, useRef, useState } from "react";
import styles from "../assets/modules/form.module.css";

// @ts-ignore
function MainScene({ result }) {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({ task: '', answer: 0 });
    const [resultText, setResultText] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [totalAnswers, setTotalAnswers] = useState(0);
    const start_range = Number(result.start_range);
    const end_range = Number(result.end_range);
    const interval = Number(result.interval) * 1000;
    const arithmetic_symbol = result.arithmetical_operation;
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const newTasks = shuffleArray(generate_tasks(start_range, end_range, arithmetic_symbol));
        // @ts-ignore
        setTasks(newTasks);
        setTask(newTasks[0]);
        setTotalAnswers(newTasks.length);
        setCorrectAnswers(0);

        startInterval(newTasks.slice(1));

        return () => clearInterval(intervalRef.current!);
    }, [start_range, end_range, arithmetic_symbol]);

    // @ts-ignore
    const startInterval = (remainingTasks) => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (remainingTasks.length === 0) {
                clearInterval(intervalRef.current!);
                // @ts-ignore
                setTask({ task: null, answer: null });
                setTasks([]);
            } else {
                const nextTask = remainingTasks.shift();
                setTask(nextTask || { task: null, answer: null });
                // @ts-ignore
                setTasks(remainingTasks);
                setInputValue('');
                setResultText('');
            }
        }, interval);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let userAnswer = e.currentTarget.answer.value;

        if (userAnswer === '') {
            return;
        } else {
            userAnswer = Number(userAnswer);
        }

        if (task.answer === userAnswer) {
            setResultText('Верно');
            setCorrectAnswers(c => c + 1);
        } else {
            setResultText(`Неверно. Правильный ответ = ${task.answer}`);
        }

        setInputValue('');

        const remainingTasks = tasks.slice(1);
        if (remainingTasks.length === 0) {
            // @ts-ignore
            setTask({ task: null, answer: null });
            setTasks([]);
            clearInterval(intervalRef.current!);
        } else {
            const nextTask = remainingTasks[0];
            setTask(nextTask || { task: null, answer: null });
            setTasks(remainingTasks);
            startInterval(remainingTasks);
        }
    };

    if (task?.task === null) {
        return (
            <div id="parent" className={styles.hidden}>
                <p>Задания закончились!</p>
                <p>Ваш результат: <span className={styles.result}>{correctAnswers}</span>/{totalAnswers}</p>
            </div>
        );
    }

    return (
        <div id="parent" className={styles.hidden}>
            <form className={styles.task_form} onSubmit={handleSubmit}>
                {task && <>
                    <p>{task.task}</p>
                    <input type="text" name="answer" onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder="Твой ответ: " />
                    <p>{resultText}</p>
                    <button id="commence" type="submit">Проверить</button>
                </>}
            </form>
        </div>
    );
}

export default MainScene;
