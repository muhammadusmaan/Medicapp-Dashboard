import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { employeeReducer } from './reducers/employeeReducer';
import { employeeRequestReducer } from './reducers/employeeRequestReducer'

const rootReducer = combineReducers({
    employees: employeeReducer,
    employeeRequests: employeeRequestReducer
})

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));