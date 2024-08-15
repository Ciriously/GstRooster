import React, { useState } from 'react';

// Array of months for the dropdown
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const MonthSelector = () => {
    // Get the current month index (0-based)
    const currentMonthIndex = new Date().getMonth();
    // State to hold the selected month
    const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);

    // Handle month selection change
    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value, 10));
    };

    return (
        <div className="container mx-auto p-6 font-mono">
            <h1 className="text-xl font-bold mb-4">Displaying Rooster Shift for the Month of {months[currentMonthIndex]}</h1>

            <div className="mb-4">
                <label htmlFor="month-select" className="mr-2 font-semibold">Select Month:</label>
                <select
                    id="month-select"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="border border-gray-300 rounded p-2"
                >
                    {months.map((month, index) => (
                        <option key={index} value={index}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            <h2 className="text-lg font-semibold">
                Displaying Data for the Month of {months[selectedMonth]}
            </h2>
        </div>
    );
};

export default MonthSelector;
