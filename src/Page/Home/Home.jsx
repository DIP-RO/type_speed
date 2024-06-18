import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion for animations

const sentenceList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. Sed risus ultricies tristique nulla aliquet enim tortor. Amet tellus cras adipiscing enim eu turpis egestas. Vel turpis nunc eget lorem dolor. Lectus urna duis convallis convallis tellus id. Dictum at tempor commodo ullamcorper a lacus. Volutpat commodo sed egestas egestas. Semper risus in hendrerit gravida rutrum quisque non. Odio pellentesque diam volutpat commodo sed. Euismod in pellentesque massa placerat duis ultricies lacus sed. Magna etiam tempor orci eu. Viverra nibh cras pulvinar mattis nunc sed blandit libero. Commodo ullamcorper a lacus vestibulum sed arcu non odio. Ut aliquam purus sit amet luctus venenatis lectus. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Dui ut ornare lectus sit amet est placerat in.',
    'Vulputate dignissim suspendisse in est ante in nibh mauris. Purus in mollis nunc sed id semper risus in. Sit amet luctus venenatis lectus magna fringilla. Lacus laoreet non curabitur gravida arcu ac tortor dignissim. Commodo ullamcorper a lacus vestibulum sed. Faucibus nisl tincidunt eget nullam. Vestibulum morbi blandit cursus risus at ultrices mi tempus. Eget nulla facilisi etiam dignissim diam quis enim lobortis. Arcu non sodales neque sodales ut etiam sit amet. Fermentum posuere urna nec tincidunt praesent semper feugiat. Velit egestas dui id ornare arcu. Est placerat in egestas erat imperdiet. Aenean vel elit scelerisque mauris. Mauris ultrices eros in cursus turpis massa tincidunt. Adipiscing diam donec adipiscing tristique risus nec. Nibh venenatis cras sed felis eget velit aliquet sagittis. Scelerisque fermentum dui faucibus in. Tempus egestas sed sed risus. Est ante in nibh mauris cursus. Mattis rhoncus urna neque viverra justo nec ultrices dui sapien.',
    'Pharetra convallis posuere morbi leo urna molestie at elementum. Nisl vel pretium lectus quam id leo in vitae turpis. In eu mi bibendum neque egestas congue quisque egestas diam. Vitae ultricies leo integer malesuada nunc vel risus commodo. Diam in arcu cursus euismod quis. Ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Scelerisque eu ultrices vitae auctor eu augue. Sit amet cursus sit amet dictum sit amet justo donec. Aliquam ut porttitor leo a diam sollicitudin tempor id. Dignissim suspendisse in est ante. Malesuada fames ac turpis egestas maecenas pharetra convallis. Id aliquet risus feugiat in. Non blandit massa enim nec dui nunc mattis. Leo vel orci porta non pulvinar neque laoreet suspendisse. Magna fermentum iaculis eu non diam phasellus. Quam quisque id diam vel quam. Mattis ullamcorper velit sed ullamcorper morbi. Nulla pharetra diam sit amet nisl suscipit adipiscing. Consequat interdum varius sit amet mattis. Adipiscing bibendum est ultricies integer quis. Elementum curabitur vitae nunc sed velit dignissim sodales ut eu. Massa vitae tortor condimentum lacinia quis vel eros donec. Sed vulputate odio ut enim blandit volutpat. Sit amet consectetur adipiscing elit pellentesque habitant morbi tristique. Vel eros donec ac odio. Eget mauris pharetra et ultrices neque ornare aenean euismod elementum. Volutpat ac tincidunt vitae semper quis lectus nulla at volutpat.',
    // Add more sentences as needed
  ];
// Function to get a random sentence
const getRandomSentence = () => {
  return sentenceList[Math.floor(Math.random() * sentenceList.length)];
};

const Home = () => {
  const [sentence, setSentence] = useState(getRandomSentence()); // Generate a random sentence
  const [inputValue, setInputValue] = useState(''); // Track user input
  const [startTime, setStartTime] = useState(null); // Track the start time
  const [timeLeft, setTimeLeft] = useState(60); // Timer set to 60 seconds
  const [isTestRunning, setIsTestRunning] = useState(false); // Flag to indicate if the test is running
  const [stats, setStats] = useState({ wpm: 0, cpm: 0, accuracy: 0 }); // Store statistics
  const [showModal, setShowModal] = useState(false); // Control the visibility of the modal
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Track the current word index
  const [wordHighlight, setWordHighlight] = useState(false); // Flag to highlight the current word

  const inputRef = useRef(null);

  useEffect(() => {
    if (timeLeft === 0) {
      endTest(); // End test when timer reaches 0
    }

    if (isTestRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Clear interval when timeLeft or isTestRunning changes
    }
  }, [isTestRunning, timeLeft]);

  const startTest = () => {
    setSentence(getRandomSentence()); // Generate new sentence
    setInputValue('');
    setStartTime(Date.now());
    setTimeLeft(60);
    setIsTestRunning(true);
    setStats({ wpm: 0, cpm: 0, accuracy: 0 });
    setShowModal(false);
    setCurrentWordIndex(0);
    setWordHighlight(false);
    inputRef.current.focus(); // Focus on the input field
  };

  const endTest = () => {
    setIsTestRunning(false);
    calculateStats(); // Calculate stats when test ends
    setShowModal(true);
  };

  const calculateStats = () => {
    const elapsedTime = (60 - timeLeft) / 60; // Calculate elapsed time in minutes
    const totalCharsTyped = inputValue.length;
    const correctChars = inputValue
      .split('')
      .filter((char, idx) => char === sentence[idx]).length;
    const accuracy = (correctChars / totalCharsTyped) * 100;
    const wpm = inputValue.split(' ').length / elapsedTime;
    const cpm = totalCharsTyped / elapsedTime || 0;

    setStats({
      wpm: Math.round(wpm),
      cpm: Math.round(cpm),
      accuracy: Math.round(accuracy),
    });
  };

  const handleInputChange = (e) => {
    const { value } = e.target;

    if (!isTestRunning) {
      // Start the test when the user starts typing
      setStartTime(Date.now());
      setIsTestRunning(true);
    }

    setInputValue(value);

    if (value === sentence) {
      endTest();
    }

    const words = sentence.split(' ');
    const currentWord = words[currentWordIndex];

    if (value === currentWord && currentWordIndex < words.length - 1) {
      // Move to the next word
      setCurrentWordIndex(currentWordIndex + 1);
      setWordHighlight(true);
      setTimeout(() => {
        setWordHighlight(false);
      }, 100);
    }
  };

  const getCharClass = (char, index) => {
    const words = sentence.split(' ');
    const currentWord = words[currentWordIndex];

    // Highlight the current word in green
    if (
      index >= words.slice(0, currentWordIndex).join(' ').length &&
      index <
        currentWord.length + words.slice(0, currentWordIndex).join(' ').length
    ) {
      if (wordHighlight) {
        return 'text-green-500'; // Green color for highlighted word
      } else if (inputValue[index] === undefined) {
        return ''; // No color if user hasn't reached this character yet
      } else {
        return inputValue[index] === char ? 'text-green-500' : 'text-red-500'; // Green for correct, red for incorrect
      }
    } else {
      return inputValue[index] === char ? 'text-green-500' : 'text-red-500'; // Green for correct, red for incorrect
    }
  };

  // Function to get feedback based on WPM
  const getFeedback = () => {
    if (stats.wpm < 20) {
      return {
        image:
          'https://i.ibb.co/5xCv9KM/tortoise-ai-generated-image-362642-2725-removebg-preview.png', // Slow typing image
        message:
          "You type at a turtle's pace! Keep practicing to improve your speed.",
      };
    } else if (stats.wpm < 40) {
      return {
        image: 'https://i.ibb.co/dbnBXSK/Goodspeed-Script-Trademark-NOTAG-v1.png', // Average typing image
        message: 'Not bad! You have an average typing speed. Keep up the good work!',
      };
    } else if (stats.wpm < 60) {
      return {
        image: 'https://i.ibb.co/dbnBXSK/Goodspeed-Script-Trademark-NOTAG-v1.png', // Fast typing image
        message: 'Great job! You have a good typing speed. Aim for even faster!',
      };
    } else {
      return {
        image: 'https://i.ibb.co/wN2HY32/pngtree-super-fast-silver-style-title-png-image-5324897.jpg', // Super fast typing image
        message: "Incredible! You're a typing wizard with an excellent speed!",
      };
    }
  };

  const feedback = getFeedback();

  return (
    <div
      className="flex flex-col items-center justify-center  min-h-[70vh] lg:min-h-[100vh] bg-gray-50 p-4 space-y-8"
      style={{
        backgroundImage: 'url("https://i.ibb.co/CnPy0Gh/MRTYPER-BG.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
       
      }}
    >
      {/* Header */}
      <header className="text-center">
        <div className="badge badge-warning mt-2">TYPING SPEED TEST</div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Test your typing skills
        </h1>
      </header>

      {/* Timer */}
      <div className="flex items-center space-x-2">
        <div className="text-4xl md:text-5xl font-bold text-yellow-500">
          {timeLeft}
        </div>
        <div className="text-xl">seconds</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3  gap-5">
        <div className="text-center border shadow-2xl rounded-lg bg-white px-4 py-2">
          <div className="text-2xl md:text-3xl font-bold">{stats.wpm}</div>
          <div className="text-xl">words/min</div>
        </div>
        <div className="text-center border shadow-2xl rounded-lg bg-white px-4 py-2">
          <div className="text-2xl md:text-3xl font-bold">{stats.cpm}</div>
          <div className="text-xl">chars/min</div>
        </div>
        <div className="text-center border shadow-2xl rounded-lg bg-white px-4 py-2">
          <div className="text-2xl md:text-3xl font-bold">
            {stats.accuracy}%
          </div>
          <div className="text-xl">accuracy</div>
        </div>
      </div>

      {/* Typing Box */}
      <div className="relative p-4 rounded shadow-lg bg-white w-full max-w-2xl mt-4">
        <div className="text-xl mb-2">
          {sentence.split('').map((char, index) => (
            <span key={index} className={getCharClass(char, index)}>
              {char}
            </span>
          ))}
              </div>
              
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full p-4 border rounded outline-none focus:ring-2 focus:ring-yellow-500 text-xl"
          placeholder="Start typing here..."
              />
           <div className="flex justify-center mt-4">
    {!isTestRunning && (
      <button className="btn flex items-center btn-warning" onClick={startTest}>
        Start Test
      </button>
    )}
  </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <img src={feedback.image} alt="Feedback" className="w-24 mb-4" />
              <h3 className="font-bold text-lg">Your Typing Test is Finished!</h3>
              <p className="text-center mt-2">
                {feedback.message} <br />
                You typed at{' '}
                <span className="font-bold text-yellow-600">
                  {stats.wpm} WPM
                </span>{' '}
                and your accuracy was {stats.accuracy}%.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                <button className="btn btn-outline btn-primary">
                  Share on Facebook
                </button>
                <button className="btn btn-outline btn-info">
                  Share on LinkedIn
                </button>
                <button className="btn btn-outline btn-accent">
                  Share on Twitter
                </button>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                <button className="btn" onClick={startTest}>
                  Try again
                </button>
                <button className="btn btn-primary">Save</button>
              </div>
              <p className="mt-4">Save score on your organization's leaderboard</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
