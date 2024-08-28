import styles from "../assets/modules/form.module.css";

function SelectIntervalComponent({intervals}: { intervals: number[] }) {
    return (
        <div className={styles.selects}>
            <label htmlFor="interval">Выбери время на решение примера</label>
            <select name="interval" id="interval">
                {intervals.map((interval, index) => {
                    if (index === 0) {
                        <option key={interval} defaultValue={interval} value={interval}>{interval} сек.</option>
                    }
                    return <option key={interval} value={interval}>{interval} сек.</option>
                })}
            </select>
        </div>
    )
}

export default SelectIntervalComponent