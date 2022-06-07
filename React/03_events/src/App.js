import React from "react";
import Toggle from "./component/toggle"
import LoggingButton from "./component/loggin"

const App = () => {
  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault();
    console.log("You clicked submit")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">submit</button>
      </form>
      <Toggle />
      <LoggingButton />
      
    </div>
  );
}

export default App;
