import React, { useState, useEffect } from 'react';
import MonthSelector from './MonthSelector';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import axios from 'axios';


// Shift details mapping with emojis
const shiftDetails = {
    1: { name: 'Shift 1', time: '7 AM - 4 PM', emoji: '🌅' },
    2: { name: 'Shift 2', time: '10 AM - 7 PM', emoji: '🌞' },
    3: { name: 'Shift 3', time: '1 PM - 10 PM', emoji: '🌇' },
    4: { name: 'Shift 4', time: '10 PM - 7 AM', emoji: '🌙' },
};


const Table = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());


    const fetchShiftData = (month = "1") => {
        axios
            .get(`http://localhost:3000/get-timetable?month=${month}`)
            .then((response) => {
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setEmployeeData(response.data[0].employees);
                } else {
                    setEmployeeData([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                toast.error("Failed to fetch employee data!");
                console.error("Fetch error:", error); // Log error
                setLoading(false);
            });
    };


    useEffect(() => {
        fetchShiftData();
    }, []);


    const handleMonthChange = (newMonth) => {
        console.log(`Changing month to: ${newMonth}`); // Log the month change
        setSelectedMonth(newMonth);
        fetchShiftData(11); // Send the correct month index to the API
    };


    if (loading) {
        return <div>Loading...</div>; // Display loading state
    }


    return (
        <div>
            <MonthSelector onMonthChange={handleMonthChange} />
            <section className="container mx-auto p-6 font-mono">
                {/* L1 Table */}
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Employees</h2>
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Role</th>
                                    <th className="px-4 py-3">Shift Details</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Manager</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {employeeData.length ? (
                                    employeeData.map((item, index) => (
                                        <tr key={index} className="text-gray-700">
                                            <td className="px-4 py-3 border">
                                                <p className="font-semibold text-black">{item.name}</p>
                                            </td>
                                            <td className="px-4 py-3 text-md font-semibold border">{item.role}</td>
                                            <td className="px-4 py-3 text-xs border">
                                                <span className={`px-2 py-1 font-semibold leading-tight rounded-sm ${shiftDetails[item.shift].emoji === '🌅' ? 'text-green-700 bg-green-100' : item.shift === 2 ? 'text-orange-700 bg-gray-100' : item.shift === 3 ? 'text-red-700 bg-red-100' : 'text-blue-700 bg-blue-100'}`}>
                                                    {shiftDetails[item.shift].emoji} {shiftDetails[item.shift].name} ({shiftDetails[item.shift].time})
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm border">{item.email}</td>
                                            <td className="px-4 py-3 text-sm border">{item.manager}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center px-4 py-3">No L1 Employees Available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
};


export default Table;