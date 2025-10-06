import { useContext, useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { MyContext } from "../context/MyProvider";

const StageOne = () => {
  const textInput = useRef();
  const context = useContext(MyContext);

  const [error, setError] = useState([false, ""]);

  // Validation function
  const validateInput = (value) => {
    if (value.trim() === "") {
      setError([true, "❌ Please enter a player name"]);
      return false;
    }
    if (value.length <= 2) {
      setError([true, "❌ You need at least 3 characters"]);
      return false;
    }
    return true;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textInput.current.value;

    if (validateInput(value)) {
      setError([false, ""]);
      context.addPlayer(value.trim());
      console.log("Player Added:", value);
      textInput.current.value = "";
    }
  };

  return (
    <>
      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Add Player Name"
            ref={textInput}
          />
        </Form.Group>

        {error[0] && <Alert variant="danger">{error[1]}</Alert>}

        <Button type="submit" className="miami mt-2" variant="primary">
          Add Player
        </Button>

        {context.players && context.players.length > 0 && (
          <>
            <hr />
            <ul className="list-group">
              {context.players.map((player, idx) => (
                <li
                  key={idx}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {player}
                  <span
                    className="badge bg-danger cursor-pointer"
                    onClick={() => context.removePlayer(idx)}
                  >
                    X
                  </span>
                </li>
              ))}
            </ul>
            <Button
              className="action_button mt-3"
              variant="success"
              onClick={() => context.next()}
            >
              Next
            </Button>
          </>
        )}
      </Form>
    </>
  );
};

export default StageOne;
