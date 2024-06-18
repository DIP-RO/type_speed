

const Terms = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
        <p className="text-lg mb-8">We are working hard to bring you this feature. Stay tuned!</p>
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => alert('Typing test will start soon!')}
        >
            Start Typing Test
        </button>
    </div>
    );
};

export default Terms;