import styles from '../../assets/modules/mainscreen.module.css'
import styles2 from '../../assets/modules/form.module.css'
import MenuBar from "../../Components/MenuBar";
import {dict_with_menu_settings} from "../../services/config";
import React, {useState} from "react";
import MainScene from "../../Components/MainScene";

function MainScreen() {
    const [result, setResult] = useState({})
    const [errors, setErrors] = useState(false)
    const numbers_range = dict_with_menu_settings.range_of_numbers
    const arithmetical_operations = dict_with_menu_settings.arithmetical_operations
    const intervals = dict_with_menu_settings.intervals_between_tasks

    const handleValues = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (errors){
            return;
        }
        const result: { [key: string]: string | number } = {};

        const selects = e.currentTarget.querySelectorAll<HTMLSelectElement>('select');

        selects.forEach((select) => {
            Array.from(select.options).forEach(option => {
                if (option.selected) {
                    result[select.name] = option.value;
                }
            });
        });

        setResult(result)
        const parent = document.querySelector('div[id=parent]')
        // @ts-ignore
        parent.classList.remove(styles2.hidden)
    };

    return (
        <main className={styles.main}>
            <MenuBar numbers_range={numbers_range} intervals={intervals}
                     arithmetical_operations={arithmetical_operations} errors_setter={setErrors} handler={handleValues}/>
            <div className={styles.wrapper}>
                <MainScene result={result}/>
            </div>
        </main>
    )
}

export default MainScreen