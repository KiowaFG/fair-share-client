import axios from "axios";
import { useContext, useEffect, useState, PureComponent } from "react"
import { AuthContext } from "../context/auth.context";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import "./Overview.css"

const API_URL = import.meta.env.VITE_API_URL

function Overview() {
    const storedToken = localStorage.getItem("authToken");
    const { user } = useContext(AuthContext);
    const [data, setData] = useState();

    const getAllGroups = () => {
        axios
            .get(
                `${API_URL}/groups/${user._id}`,
                { headers: { Authorization: `Bearer ${storedToken}` } },
            )
            .then((response) => setData(response.data.map((group) => group.groupExpenses).flat()))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        user && getAllGroups();
    }, [user]);

    const paid = data && Math.round(data.reduce((acc, curr) => curr.expenseAuthor === user._id ? acc + curr.amount : acc + 0, 0));
    const borrowed = data && Math.round(data.reduce((acc, curr) => curr.expenseAuthor !== user._id ? acc + Math.round(curr.amount / curr.expenseUsers.length) : acc + 0, 0));
    const balance = data && paid - borrowed;

    const dataPie = [
        { name: 'Paid', value: paid },
        { name: 'Borrowed', value: borrowed }
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
            <h3>Total Balance: {`${balance} €`}</h3>
            <h3>Total Paid: {`${paid} €`}</h3>
            <h3>Total Borrowed: {`${borrowed} €`}</h3>

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