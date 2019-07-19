import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers'


const middleWare = [thunk]

const persistedState = localStorage.getItem('readThatState') ? JSON.parse(localStorage.getItem('readThatState')) : {}

const store = createStore(
    rootReducer, 
    persistedState, 
    compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

store.subscribe(() => {
    localStorage.setItem('readThatState', JSON.stringify(store.getState()))
});
export default store;