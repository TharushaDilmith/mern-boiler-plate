import { Route, Switch } from "react-router-dom";
import Home from "./home";
import About from "./about";
import Login from "./registerLogin"

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
