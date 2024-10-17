// src/components/AddNoteModal.js

import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai'; // Close icon

const AddNoteModal = ({ isOpen, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [assignedDate, setAssignedDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newNote = { 
            title, 
            content, 
            tags: tags.split(',').map(tag => tag.trim()), // Convert comma-separated tags to an array
            assignedDate 
        };
        const res = await axios.post('http://localhost:5000/api/notes', newNote);
        onAdd(res.data); // Add the new note
        setTitle('');
        setContent('');
        setTags('');
        setAssignedDate('');
        onClose(); // Close the modal
    };

    if (!isOpen) return null; // If the modal is not open, return null

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg z-10 p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Add a New Note</h2>
                    <button onClick={onClose}>
                        <AiOutlineClose className="text-gray-600 hover:text-gray-800" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full mt-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                    />
                    <input
                        type="text"
                        placeholder="Tags (comma-separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full mt-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="date"
                        value={assignedDate}
                        onChange={(e) => setAssignedDate(e.target.value)}
                        required
                        className="w-full mt-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Add Note
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNoteModal;
