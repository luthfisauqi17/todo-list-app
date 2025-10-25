import React from 'react';
import { CheckSquare } from 'lucide-react';

export const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <CheckSquare size={32} className="text-blue-600" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">To-Do List</h1>
                            <p className="text-sm text-gray-500">Manage your tasks efficiently</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};