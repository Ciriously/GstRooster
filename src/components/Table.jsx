import React, { useState } from 'react';
import MonthSelector from './MonthSelector';
import FilterBar from './FilterBar';
import dayjs from 'dayjs'; // For date manipulation

// Shift details mapping with emojis
const shiftDetails = {
    1: { name: 'Morning', time: '7 AM - 4 PM', emoji: '🌅' },
    2: { name: 'Afternoon', time: '10 AM - 7 PM', emoji: '🌞' },
    3: { name: 'Evening', time: '1 PM - 10 PM', emoji: '🌇' },
    4: { name: 'Night', time: '10 PM - 7 AM', emoji: '🌙' },
};

const initialData = [
    {
        name: 'Aditya',
        position: 'L1',
        shiftNumber: 1,
        date: '8/7/1982',
        email: 'aditya@example.com',
    },
    {
        name: 'Bhavesh',
        position: 'L1',
        shiftNumber: 2,
        date: '8/5/2024',
        email: 'bhavesh@example.com',
    },
    {
        name: 'Shewta M.',
        position: 'L2',
        shiftNumber: 4,
        date: '8/7/2021',
        email: 'shewtam@example.com',
    },
    {
        name: 'Samarth',
        position: 'L1',
        shiftNumber: 3,
        date: '8/7/2024',
        email: 'samarth@example.com',
    },
];

const Table = () => {
    const [data, setData] = useState(initialData);
    const [freshers, setFreshers] = useState([]);
    const [seniors, setSeniors] = useState([]);
    const [currentMonthShifts, setCurrentMonthShifts] = useState({});

    const determineTenure = () => {
        const currentDate = dayjs();
        const thresholdDate = currentDate.subtract(6, 'months');

        const fresherList = [];
        const seniorList = [];
        const currentMonthShifts = {};

        initialData.forEach(item => {
            const employeeDate = dayjs(item.date, 'M/D/YYYY');
            if (employeeDate.isAfter(thresholdDate)) {
                fresherList.push(item.name);
            } else {
                seniorList.push(item.name);
            }

            if (dayjs(item.date).isSame(currentDate, 'month')) {
                currentMonthShifts[item.name] = item.shiftNumber;
            }
        });

        setFreshers(fresherList);
        setSeniors(seniorList);
        setCurrentMonthShifts(currentMonthShifts);
    };

    const generateNextMonthShifts = () => {
        determineTenure();

        const newShifts = initialData.map(item => {
            let newShiftNumber = item.shiftNumber;

            // Switch shifts: shift 3 to shift 4 and shift 4 to shift 3
            if (item.shiftNumber === 3) {
                newShiftNumber = 4;
            } else if (item.shiftNumber === 4) {
                newShiftNumber = 3;
            }

            // If it's a fresher and the person didn't have a night shift this month, assign them a night shift
            if (freshers.includes(item.name) && currentMonthShifts[item.name] !== 4) {
                newShiftNumber = 4;
            }

            return { ...item, shiftNumber: newShiftNumber };
        });

        setData(newShifts);
    };

    return (
        <div>
            <MonthSelector />
            {/* < FilterBar /> */}
            <section className="container mx-auto p-6 font-mono">
                <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Position</th>
                                    <th className="px-4 py-3">Shift Details</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Email</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {data.map((item, index) => (
                                    <tr key={index} className="text-gray-700">
                                        <td className="px-4 py-3 border">
                                            <div className="flex items-center text-sm">
                                                <div>
                                                    <p className="font-semibold text-black">{item.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-md font-semibold border">{item.position}</td>
                                        <td className="px-4 py-3 text-xs border">
                                            <span
                                                className={`px-2 py-1 font-semibold leading-tight rounded-sm ${item.shiftNumber === 1
                                                    ? 'text-green-700 bg-green-100'
                                                    : item.shiftNumber === 2
                                                        ? 'text-orange-700 bg-gray-100'
                                                        : item.shiftNumber === 3
                                                            ? 'text-red-700 bg-red-100'
                                                            : 'text-blue-700 bg-blue-100'
                                                    }`}
                                            >
                                                {shiftDetails[item.shiftNumber].emoji} {shiftDetails[item.shiftNumber].name} ({shiftDetails[item.shiftNumber].time})
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm border">{item.date}</td>
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
                    onClick={generateNextMonthShifts}
                >
                    Generate Shift for the Next Month
                </button>
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Freshers</h3>
                    <ul className="list-disc list-inside">
                        {freshers.length ? (
                            freshers.map((name, index) => <li key={index}>{name}</li>)
                        ) : (
                            <li>No freshers found</li>
                        )}
                    </ul>
                    <h3 className="mt-4 text-lg font-semibold">Seniors</h3>
                    <ul className="list-disc list-inside">
                        {seniors.length ? (
                            seniors.map((name, index) => <li key={index}>{name}</li>)
                        ) : (
                            <li>No seniors found</li>
                        )}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Table;
