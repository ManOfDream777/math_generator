import styles from "../assets/modules/form.module.css"
import SelectRangeComponent from "./SelectRangeComponent";
import SelectArithmeticalOperationComponent from "./SelectArithmeticalOperationComponent";
import SelectIntervalComponent from "./SelectIntervalComponent";

function MenuBar({numbers_range, arithmetical_operations, intervals, errors_setter, handler}: any) {

    return (
        <div className={styles.menu_bar}>
            <h2>Настройка генератора</h2>
            <form onSubmit={handler} className={styles.form}>
                <div className={styles.settings_group}>
                    <SelectRangeComponent errors_setter={errors_setter} numbers_range={numbers_range}/>
                </div>
                <div className={styles.settings_group}>
                    <SelectArithmeticalOperationComponent arithmetical_operations={arithmetical_operations}/>
                </div>
                <div className={styles.settings_group}>
                    <SelectIntervalComponent intervals={intervals}/>
                </div>
                <button className={styles.btn} type="submit">Начать решать</button>
            </form>
        </div>
    )
}

export default MenuBar