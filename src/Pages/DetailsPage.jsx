import "./DetailsPage.css"
import downArrow from "../assets/DownArrow.svg"

function DetailsPage() {
    return (
        <div className="detailsWrap">
            <div className="detailsPage">
                    <img className="detailsPageImg" src="https://images.delunoalotroconfin.com/Content/images/000/Productos/Prod_2828_1.jpg" alt="" />
                    <div className="titleAndBtns">
                        <h2>Nepal</h2>
                        <h3>Total expense: 900€</h3>
                        <div className="Btns">
                            <button className="detailsbtn">Add Expense</button>
                            <button className="detailsbtn">Settle Up</button>
                        </div>
                    </div>
                <div className="expenseItem">
                    <p>Name: visas</p>
                    <p>Price: 300€</p>
                    <p>Date: 15/6/2024</p>
                    <img src={downArrow} alt="" />
                </div>
            </div>

        </div>
    )
}
export default DetailsPage