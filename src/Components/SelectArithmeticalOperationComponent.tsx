import styles from "../assets/modules/form.module.css"

function SelectArithmeticalOperationComponent({arithmetical_operations}: { arithmetical_operations: string[] }) {
    return (
        <div className={styles.selects}>
            <label htmlFor="arithmetical_operation">Выбери действие</label>
            <select name="arithmetical_operation" id="arithmetical_operation">
                {arithmetical_operations.map((operation, index) => {
                    if (index === 0) {
                        <option key={operation} defaultValue={operation} value={operation}>{operation}</option>
                    }
                    return <option key={operation} value={operation}>{operation}</option>
                })}
            </select>
        </div>
    )
}

export default SelectArithmeticalOperationComponent