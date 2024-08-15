import React from 'react';

const ShiftCard = ({ shiftNumber }) => {
    const shift = shiftDetails[shiftNumber];

    if (!shift) return null; // Handle undefined shifts

    return (
        <div className="p-4 mb-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">{shift.name} Shift</h3>
            <p className="text-gray-700">{shift.time}</p>
        </div>
    );
};

export default ShiftCard;
