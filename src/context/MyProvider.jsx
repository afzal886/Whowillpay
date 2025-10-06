import { createContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; // ✅ make sure to import styles

const MyContext = createContext();

const MyProvider = (props) => {
  const [stage, setStage] = useState(1);
  const [players, setPlayers] = useState([]);
  const [result, setResult] = useState("");

  // Add player
  const addPlayerHandler = (name) => {
    setPlayers((prevState) => [...prevState, name]);
  };

  // Remove player
  const removePlayerHandler = (idx) => {
    let newArray = [...players];
    newArray.splice(idx, 1);
    setPlayers(newArray);
  };

  // Next stage
  // Next stage
const nextHandler = () => {
  if (players.length < 2) {
    toast.error("You need at least 2 players!", {
      position: "top-left",
      autoClose: 5000,
    });
  } else {
    generateLoser(); // ✅ pick a loser immediately
  }
};


  // Pick a random loser
  // Pick a random loser
const generateLoser = () => {
  let randomPlayer = players[Math.floor(Math.random() * players.length)];
  setResult(randomPlayer);
  setStage(2) //❌ not needed anymore
};


  // Reset game
  const resetGame = () => {
    setStage(1);
    setPlayers([]);
    setResult("");
  };

  return (
    <>
      <MyContext.Provider
        value={{
          stage,
          players,
          result,
          addPlayer: addPlayerHandler,
          removePlayer: removePlayerHandler,
          next: nextHandler,
          generateLoser: generateLoser,
          resetGame: resetGame,
        }}
      >
        {props.children}
      </MyContext.Provider>
      {/* ⚡ You could move this to App.jsx instead */}
      <ToastContainer />
    </>
  );
};

export { MyContext, MyProvider };
