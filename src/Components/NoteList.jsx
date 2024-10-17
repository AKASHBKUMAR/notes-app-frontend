import { AiFillDelete } from 'react-icons/ai'; 

const NoteList = ({ notes, onDelete }) => {
    if (!notes || notes.length === 0) {
        return <div className="text-gray-500 text-center">No notes available.</div>; // Display message if no notes
    }

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-semibold">Notes</h2>
            <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note) => (
                    <li
                        key={note._id}
                        className="bg-white border border-gray-300 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg"
                    >
                        <h3 className="text-xl font-bold">{note.title}</h3>
                        <p className="mt-2 text-gray-700">{note.content}</p>
                        <div className="mt-4">
                            <strong>Tags:</strong>
                            <p className="text-gray-600">
                                {Array.isArray(note.tags) && note.tags.length > 0 
                                    ? note.tags.join(', ') 
                                    : 'No tags assigned'}
                            </p>
                        </div>
                        <div className="mt-2">
                            <strong>Assigned Date:</strong>
                            <p className="text-gray-600">{new Date(note.assignedDate).toLocaleDateString()}</p>
                        </div>
                        <button
                            onClick={() => onDelete(note._id)}
                            className="mt-4 flex items-center text-red-500 hover:text-red-700 transition duration-200"
                        >
                            <AiFillDelete className="mr-2" />
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteList;
