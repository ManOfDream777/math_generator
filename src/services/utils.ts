export const generate_tasks = (start_range: number,
                               end_range: number,
                               arithmetical_operation: string) => {
    const tasks: any[] = []

    for (let i = start_range; i <= end_range; i++) {
        let counter = 0
        // @ts-ignore
        const array_started_from_end = shuffleArray([...Array(end_range + 1).keys()].filter(number => number >= start_range));
        const j = array_started_from_end[array_started_from_end.length - ++counter];

        switch (arithmetical_operation) {
            case "+":
                tasks.push({
                    task: `Сколько будет ${i} + ${j} ?`,
                    answer: i + j
                })
                break
            case "-":
                if (i > j) {
                    tasks.push({
                        task: `Сколько будет ${i} - ${j} ?`,
                        answer: i - j
                    })
                }
                break
            case "*":
                tasks.push({
                    task: `Сколько будет ${i} * ${j} ?`,
                    answer: i * j
                })
                break
        }

    }

    return tasks
}

export function shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
