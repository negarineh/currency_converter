import { Provider } from "react-redux";
import store from "./store";
import Currency from "./components/Currency";
import ErrorBoundary from "./utils/ErrorBoundary";
import './App.css';

function App() {
  return (

    <Provider store={store}>
      <ErrorBoundary><Currency /></ErrorBoundary>
    </Provider>
  );
}

export default App;
