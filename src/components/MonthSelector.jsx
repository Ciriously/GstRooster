import React, { useState } from 'react';

// Array of months for the dropdown
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const MonthSelector = ({ onMonthChange }) => {
    // Get the current month index (0-based)
    const currentMonthIndex = new Date().getMonth();
    // State to hold the selected month
    const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);

    // Handle month selection change
    const handleMonthChange = (event) => {
        const newMonth = parseInt(event.target.value, 10);
        setSelectedMonth(newMonth);
        onMonthChange(newMonth); // Notify the parent component (Table) of the month change
    };

    // Only display current and future months
    const availableMonths = months.slice(currentMonthIndex);

    return (
        <div className="container mx-auto p-6 font-mono">
            {/* Heading */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Rooster Shift for {months[selectedMonth]}
                </h1>
                <p className="text-gray-600">Select a month to view the shift schedule.</p>
            </div>

            {/* Month Selector */}
            <div className="flex flex-col items-start space-y-2">
                <label htmlFor="month-select" className="font-medium text-gray-700">Select Month:</label>
                <select
                    id="month-select"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {availableMonths.map((month, index) => (
                        <option key={index} value={currentMonthIndex + index}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default MonthSelector;
