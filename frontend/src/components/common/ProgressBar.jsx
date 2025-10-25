import React from 'react';

export const ProgressBar = ({ progress = 0, height = 'h-2', showLabel = false }) => {
    const percentage = Math.min(Math.max(progress, 0), 100);

    return (
        <div className="w-full">
            {showLabel && (
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-700">{percentage}%</span>
                </div>
            )}
            <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
                <div
                    className={`${height} rounded-full transition-all duration-300 ${percentage === 100 ? 'bg-green-600' : 'bg-blue-600'
                        }`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};