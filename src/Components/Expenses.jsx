import GroupView from "./ExpenseOverview/GroupView"
import "./Expenses.css"

function Expenses(){
    return (
        <div className="expenses">
            <h1>Expense Group List</h1>
            <div className="expensesGroupCard">
                <GroupView/>
            </div>
        </div>
    )
}
export default Expenses