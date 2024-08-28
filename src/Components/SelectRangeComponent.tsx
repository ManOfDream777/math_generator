import {useRef} from "react";
import styles from "../assets/modules/form.module.css"

function SelectRangeComponent({numbers_range}: {numbers_range: number[]}) {
    const start_range = useRef<HTMLSelectElement>(null);
    const end_range = useRef<HTMLSelectElement>(null)
    const error_text = useRef<HTMLParagraphElement>(null)

    const handleChange = () => {
        const start_range_value = Number(start_range.current?.value)
        const end_range_value = Number(end_range.current?.value)
        const error_text_element = error_text.current
        if (error_text_element?.classList.contains(styles.visible)) {
            error_text_element?.classList.remove(styles.visible)
            error_text_element.textContent = ''
        }
        if (start_range_value && end_range_value) {
            if (start_range_value === end_range_value) {
                error_text_element?.classList.add(styles.visible)
                // @ts-ignore
                error_text_element.textContent = 'Начальное значение не может быть равно конечному'
                return null;
            }else if (start_range_value > end_range_value) {
                error_text_element?.classList.add(styles.visible)
                // @ts-ignore
                error_text_element.textContent = 'Начальное значение должно быть меньше конечного'
                return null;
            }
        }
    }

    return (
        <div className={styles.select_range_group}>
            <div className={styles.selects}>
                <label htmlFor="start_range">От какого числа</label>
                <select ref={start_range} onChange={handleChange} name="start_range" id="start_range">
                    {numbers_range.map((number, index) => {
                        if (index === 0){
                            return <option defaultValue={number} key={number} value={number}>{number}</option>
                        }
                        return <option key={number} value={number}>{number}</option>
                    })}
                </select>
            </div>
            <div className={styles.selects}>
                <label htmlFor="end_range">До какого числа</label>
                <select ref={end_range} onChange={handleChange} name="end_range" id="end_range">
                    {numbers_range.slice(1).map((number, index) => {
                        if (index === 0){
                            return <option defaultValue={number} key={number} value={number}>{number}</option>
                        }
                        return <option key={number} value={number}>{number}</option>
                    })}
                </select>
            </div>
            <p ref={error_text} className={styles.error_text}></p>
        </div>
    )
}

export default SelectRangeComponent