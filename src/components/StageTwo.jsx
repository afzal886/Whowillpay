import { useContext } from "react";
import { MyContext } from "../context/MyProvider";

const StageTwo = () => {
  const context = useContext(MyContext);

  if (!context) {
    return <p>Loading...</p>;
  }

  return (
    <div className="result_wrapper">
      <div>
        <h3>The Loser is:</h3>
        {context.result}
      </div>

      <div className="action_button" onClick={() => context.resetGame()}>
        Start Over
      </div>

      <div className="action_button btn_2" onClick={context.generateLoser}>
        Get new Loser
      </div>
    </div>
  );
};

export default StageTwo;
