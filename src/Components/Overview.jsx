import axios from "axios";
import { useContext, useEffect, useState, PureComponent } from "react"
import { AuthContext } from "../context/auth.context";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import "./Overview.css"

const API_URL = import.meta.env.VITE_API_URL

function Overview() {
    const storedToken = localStorage.getItem("authToken");
    const { user } = useContext(AuthContext);
    const [calculations, setCalculations] = useState({
        paid: 0,
        borrowed: 0,
        balance: 0
    });

    const getAllGroups = () => {
        axios
            .get(
                `${API_URL}/groups/${user._id}`,
                { headers: { Authorization: `Bearer ${storedToken}` } },
            )
            .then((response) => {
                const data = response.data.map((group) => group.groupExpenses).flat();
                const paid = Math.round(data.reduce((acc, curr) => curr.expenseAuthor === user._id ? acc + curr.amount : acc + 0, 0));
                const borrowed = Math.round(data.reduce((acc, curr) => curr.expenseAuthor !== user._id ? acc + Math.round(curr.amount / curr.expenseUsers.length) : acc + 0, 0));
                const balance = paid - borrowed;
                setCalculations({
                    paid,
                    borrowed,
                    balance
                });
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        user && getAllGroups();
    }, [user]);

    const dataPie = [
        { name: 'Paid', value: calculations.paid },
        { name: 'Borrowed', value: calculations.borrowed }
    ];

    const COLORS = ['#00C49F', '#E89090'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, name, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${name} - ${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="overview">
            <h1>Overview</h1>
            <h3>Total Balance: {`${calculations.balance} €`}</h3>
            <h3>Total Paid: {`${calculations.paid} €`}</h3>
            <h3>Total Borrowed: {`${calculations.borrowed} €`}</h3>

            <PieChart width={250} height={200}>
                <Pie
                    data={dataPie}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {dataPie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </div>
    )
}
export default Overview