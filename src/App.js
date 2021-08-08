import { Provider } from "react-redux";
import store from "./store";
import Currency from "./components/Currency";
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Currency />
    </Provider>
  );
}

export default App;
