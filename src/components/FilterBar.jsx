import React, { useState } from 'react';

// Shift details mapping
const shifts = [
    { id: 1, name: 'Morning' },
    { id: 2, name: 'Afternoon' },
    { id: 3, name: 'Evening' },
    { id: 4, name: 'Night' },
];

// Sample positions and names for demonstration
const positions = ['L1', 'L2', 'L3'];
const names = ['Aditya', 'Bhavesh', 'Shewta M.'];

const FilterBar = () => {
    const [selectedShift, setSelectedShift] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedName, setSelectedName] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');

    const handleShiftChange = (event) => {
        setSelectedShift(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value, 10));
    };

    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
    };

    const handlePositionChange = (event) => {
        setSelectedPosition(event.target.value);
    };

    return (
        <div className="container mx-auto p-6 font-mono">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Shift and Employee Filters
                </h1>
                <p className="text-gray-600">Use the filters below to refine the displayed data.</p>
            </div>

            {/* Filter Inputs */}
            <div className="flex flex-wrap gap-6 mb-6 items-start">
                {/* Shift Filter */}
                <div className="flex flex-col">
                    <label htmlFor="shift-select" className="mb-1 font-medium text-gray-700">Shift</label>
                    <select
                        id="shift-select"
                        value={selectedShift}
                        onChange={handleShiftChange}
                        className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All</option>
                        {shifts.map((shift) => (
                            <option key={shift.id} value={shift.id}>
                                {shift.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Month Filter */}
                <div className="flex flex-col">
                    <label htmlFor="month-select" className="mb-1 font-medium text-gray-700">Month</label>
                    <select
                        id="month-select"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {Array.from({ length: 12 }, (_, index) => (
                            <option key={index} value={index}>
                                {new Date(0, index).toLocaleString('default', { month: 'long' })}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Name Filter */}
                <div className="flex flex-col">
                    <label htmlFor="name-select" className="mb-1 font-medium text-gray-700">Name</label>
                    <select
                        id="name-select"
                        value={selectedName}
                        onChange={handleNameChange}
                        className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All</option>
                        {names.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Position Filter */}
                <div className="flex flex-col">
                    <label htmlFor="position-select" className="mb-1 font-medium text-gray-700">Position</label>
                    <select
                        id="position-select"
                        value={selectedPosition}
                        onChange={handlePositionChange}
                        className="border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">All</option>
                        {positions.map((position) => (
                            <option key={position} value={position}>
                                {position}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Displaying Filtered Data */}
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Displaying Data for {new Date(selectedMonth).toLocaleString('default', { month: 'long' })}
                </h2>
                <p className="text-gray-700">Shift: {selectedShift ? shifts.find(s => s.id === parseInt(selectedShift)).name : 'All'}</p>
                <p className="text-gray-700">Name: {selectedName || 'All'}</p>
                <p className="text-gray-700">Position: {selectedPosition || 'All'}</p>
            </div>
        </div>
    );
};

export default FilterBar;
