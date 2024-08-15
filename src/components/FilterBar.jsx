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
            <div className="flex flex-wrap gap-4 mb-6">
                {/* Shift Filter */}
                <div className="flex items-center">
                    <label htmlFor="shift-select" className="mr-2 font-semibold">Shift:</label>
                    <select
                        id="shift-select"
                        value={selectedShift}
                        onChange={handleShiftChange}
                        className="border border-gray-300 rounded p-2"
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
                <div className="flex items-center">
                    <label htmlFor="month-select" className="mr-2 font-semibold">Month:</label>
                    <select
                        id="month-select"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="border border-gray-300 rounded p-2"
                    >
                        {Array.from({ length: 12 }, (_, index) => (
                            <option key={index} value={index}>
                                {new Date(0, index).toLocaleString('default', { month: 'long' })}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Name Filter */}
                <div className="flex items-center">
                    <label htmlFor="name-select" className="mr-2 font-semibold">Name:</label>
                    <select
                        id="name-select"
                        value={selectedName}
                        onChange={handleNameChange}
                        className="border border-gray-300 rounded p-2"
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
                <div className="flex items-center">
                    <label htmlFor="position-select" className="mr-2 font-semibold">Position:</label>
                    <select
                        id="position-select"
                        value={selectedPosition}
                        onChange={handlePositionChange}
                        className="border border-gray-300 rounded p-2"
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
            <div>
                <h2 className="text-lg font-semibold">
                    Displaying Data for {new Date(selectedMonth).toLocaleString('default', { month: 'long' })} with filters:
                </h2>
                <p>Shift: {selectedShift ? shifts.find(s => s.id === parseInt(selectedShift)).name : 'All'}</p>
                <p>Name: {selectedName || 'All'}</p>
                <p>Position: {selectedPosition || 'All'}</p>
            </div>
        </div>
    );
};

export default FilterBar;
