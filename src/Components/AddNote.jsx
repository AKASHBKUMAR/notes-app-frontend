import { useState } from 'react';
import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai'; // Importing plus icon from react-icons

const AddNote = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newNote = { title, content };
        const res = await axios.post(
          "https://notes-app-frontend-lilac.vercel.app/api/notes   ",
          newNote
        );
        onAdd(res.data);
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mt-4">
            <h2 className="text-xl font-semibold">Add a New Note</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full mt-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full mt-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
            />
            <button
                type="submit"
                className="mt-4 flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
            >
                <AiOutlinePlus className="mr-2" />
                Add Note
            </button>
        </form>
    );
};

export default AddNote;
