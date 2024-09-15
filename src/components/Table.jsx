import React, { useState, useEffect } from 'react';
import MonthSelector from './MonthSelector';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import axios from 'axios';

// Shift details mapping with emojis
const shiftDetails = {
    "Morning": { name: 'Morning', time: '7 AM - 4 PM', emoji: '🌅' },
    "Afternoon": { name: 'Afternoon', time: '10 AM - 7 PM', emoji: '🌞' },
    "Evening": { name: 'Evening', time: '1 PM - 10 PM', emoji: '🌇' },
    "Night": { name: 'Night', time: '10 PM - 7 AM', emoji: '🌙' },
};

const Table = () => {
    // State to store shift data fetched from the API
    const [shiftData, setShiftData] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        axios
            .get("http://localhost:3000/get-emp")
            .then((response) => {
                console.log("API Response Data:", response.data); // Log the data
                setShiftData(response.data); // Set the shift data with API response
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching employee data:", error);
                toast.error("Failed to fetch employee data!");
                setLoading(false); // Set loading to false even if there's an error
            });
    }, []);


    // Determine shifts based on the latest joining dates for each manager's team
    const determineShifts = () => {
        toast.success("Shifts generated successfully!");

        // Separate data by manager
        const anmolTeam = shiftData.filter(item => item.manager === "Anmol" && item.shift !== "Night");
        const imtiyazTeam = shiftData.filter(item => item.manager === "Imtiyaz" && item.shift !== "Night");

        // Sort by joining date (newest first)
        anmolTeam.sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate));
        imtiyazTeam.sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate));

        // Get the newest member from each team
        const anmolNightShift = anmolTeam.length ? anmolTeam[0] : null;
        const imtiyazNightShift = imtiyazTeam.length ? imtiyazTeam[0] : null;

        // Update shifts
        const newShiftData = shiftData.map(item => {
            if (anmolNightShift && item.email === anmolNightShift.email) {
                return { ...item, shift: "Night" };
            } else if (imtiyazNightShift && item.email === imtiyazNightShift.email) {
                return { ...item, shift: "Night" };
            }
            return item;
        });

        setShiftData(newShiftData);
    };

    // Separate data into L1 and L2
    const l1Data = shiftData.filter(item => item.role === 'L1');
    const l2Data = shiftData.filter(item => item.role === 'L2');

    return (
        <div>
            <MonthSelector />
            <section className="container mx-auto p-6 font-mono">
                {/* L1 Table */}
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">L1 Employees</h2>
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Role</th>
                                    <th className="px-4 py-3">Shift Details</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Manager</th>
                                    <th className="px-4 py-3">Joining Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {l1Data.length ? (
                                    l1Data.map((item, index) => (
                                        <tr key={index} className="text-gray-700">
                                            <td className="px-4 py-3 border">
                                                <div className="flex items-center text-sm">
                                                    <div>
                                                        <p className="font-semibold text-black">{item.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-md font-semibold border">{item.role}</td>
                                            <td className="px-4 py-3 text-xs border">
                                                <span
                                                    className={`px-2 py-1 font-semibold leading-tight rounded-sm ${item.shift === "Morning"
                                                        ? 'text-green-700 bg-green-100'
                                                        : item.shift === "Afternoon"
                                                            ? 'text-orange-700 bg-gray-100'
                                                            : item.shift === "Evening"
                                                                ? 'text-red-700 bg-red-100'
                                                                : 'text-blue-700 bg-blue-100'
                                                        }`}
                                                >
                                                    {shiftDetails[item.shift].emoji} {shiftDetails[item.shift].name} ({shiftDetails[item.shift].time})
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm border">{item.email}</td>
                                            <td className="px-4 py-3 text-sm border">{item.manager}</td>
                                            <td className="px-4 py-3 text-sm border">{new Date(item.joiningDate).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center px-4 py-3">No L1 Employees Available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* L2 Table */}
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">L2 Employees</h2>
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Role</th>
                                    <th className="px-4 py-3">Shift Details</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Manager</th>
                                    <th className="px-4 py-3">Joining Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {l2Data.length ? (
                                    l2Data.map((item, index) => (
                                        <tr key={index} className="text-gray-700">
                                            <td className="px-4 py-3 border">
                                                <div className="flex items-center text-sm">
                                                    <div>
                                                        <p className="font-semibold text-black">{item.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-md font-semibold border">{item.role}</td>
                                            <td className="px-4 py-3 text-xs border">
                                                <span
                                                    className={`px-2 py-1 font-semibold leading-tight rounded-sm ${item.shift === "Morning"
                                                        ? 'text-green-700 bg-green-100'
                                                        : item.shift === "Afternoon"
                                                            ? 'text-orange-700 bg-gray-100'
                                                            : item.shift === "Evening"
                                                                ? 'text-red-700 bg-red-100'
                                                                : 'text-blue-700 bg-blue-100'
                                                        }`}
                                                >
                                                    {shiftDetails[item.shift].emoji} {shiftDetails[item.shift].name} ({shiftDetails[item.shift].time})
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm border">{item.email}</td>
                                            <td className="px-4 py-3 text-sm border">{item.manager}</td>
                                            <td className="px-4 py-3 text-sm border">{new Date(item.joiningDate).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center px-4 py-3">No L2 Employees Available</td>
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
