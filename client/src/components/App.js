import { Route, Switch } from "react-router-dom";
import Home from "./home";
import About from "./about";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
