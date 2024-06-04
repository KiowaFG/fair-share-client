import "../App.css"
import "./HomePage.css"
import Overview from "../Components/Overview"
import Expenses from "../Components/Expenses"


function Homepage() {
    return (
        <>     
                <div className="overviewExpenses">
                    <Overview />
                    <Expenses />
                </div>
        </>
    )
}
export default Homepage