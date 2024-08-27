import React, { useState, useEffect } from 'react';
import MonthSelector from './MonthSelector';
import { data as initialData } from './data';

// Shift details mapping with emojis
const shiftDetails = {
    "Morning": { name: 'Morning', time: '7 AM - 4 PM', emoji: '🌅' },
    "Afternoon": { name: 'Afternoon', time: '10 AM - 7 PM', emoji: '🌞' },
    "Evening": { name: 'Evening', time: '1 PM - 10 PM', emoji: '🌇' },
    "Night": { name: 'Night', time: '10 PM - 7 AM', emoji: '🌙' },
};

// Function to get a random shift
const getRandomShift = () => {
    const shifts = Object.keys(shiftDetails);
    return shifts[Math.floor(Math.random() * shifts.length)];
};

const Table = () => {
    const [shiftData, setShiftData] = useState(initialData);

    // Initialize shifts only once on component mount
    useEffect(() => {
        // Optionally, you could fetch initial data or perform other setup here
    }, []);

    const determineShifts = () => {
        // Shift mapping for rotation
        const shiftMapping = {
            "Morning": "Afternoon",
            "Afternoon": "Evening",
            "Evening": "Night",
            "Night": "Morning"
        };

        const newShiftData = shiftData.map(item => {
            let newShift = item.shift;

            // Rotate shifts if the role is L1
            if (item.role === 'L1') {
                newShift = shiftMapping[item.shift] || item.shift;
            } else if (item.role === 'L2') {
                // Assign a random shift to L2 employees
                newShift = getRandomShift();
            }

            return { ...item, shift: newShift };
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
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {l1Data.map((item, index) => (
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
                                    </tr>
                                ))}
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
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {l2Data.map((item, index) => (
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
                    type="button"
                    onClick={determineShifts}
                >
                    Generate Shift for the Next Month
                </button>
            </section>
        </div>
    );
};

export default Table;
