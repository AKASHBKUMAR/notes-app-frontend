import  { useEffect, useState } from 'react';
import NoteList from './Components/NoteList';
import AddNoteModal from './Components/AddNoteModal';
import { AiOutlinePlus } from 'react-icons/ai'; // Plus icon
import axios from 'axios';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch notes when the component mounts
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/notes');
                console.log('Fetched Notes:', res.data); // Log fetched notes
                setNotes(res.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, []);

    const handleAddNote = (newNote) => {
        setNotes((prevNotes) => [...prevNotes, newNote]); // Update state with the new note
    };

    const handleDeleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/notes/${id}`);
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)); // Update state after deletion
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-center">Notes App</h1>
            <NoteList notes={notes} onDelete={handleDeleteNote} />
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition duration-200"
            >
                <AiOutlinePlus className="text-2xl" />
            </button>
            <AddNoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddNote}
            />
        </div>
    );
};

export default App;
