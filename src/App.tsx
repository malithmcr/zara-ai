import Trigger from "./components/trigger/Trigger";
import TriggerIcon from "./components/trigger/Icon";
import "./index.css";

export function App() {
  return (
    <div className="app">
      <Trigger icon={<TriggerIcon />} text="Chat with Zara AI" />
    </div>
  );
}

export default App;
