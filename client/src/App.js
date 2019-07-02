import React from 'react';
import MainPage from './containers/MainPage';
import './App.css';
import { Provider } from 'react-redux';
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainPage/>
      </div>
    </Provider>
  );
}

export default App;
