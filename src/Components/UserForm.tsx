import React from "react";

const UserForm = ({ submitHandler, input, setInput }) => {
  return (
    <form onSubmit={submitHandler} className="input__form">
      <label htmlFor="noOfFacts">How Many Facts Do You Want?</label>
      <div>
        <input
          id="noOfFacts"
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="No. of facts..."
        />
        <button type="submit">Get Facts</button>
      </div>
    </form>
  );
};

export { UserForm };
