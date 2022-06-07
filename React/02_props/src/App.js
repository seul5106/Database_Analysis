import Clock from "./components/tick"
import props from "./components/props"

function App() {

  const elements = <h1>Hello World</h1>
  
  return (
    <div>
      {elements}
      <Clock/>
    </div>
  );
}

export default App;
