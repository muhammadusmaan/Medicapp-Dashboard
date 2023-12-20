import { ADD_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_REQUEST, GET_EMPLOYEE_REQUESTS, UPDATE_EMPLOYEE_REQUEST } from "../types/employeeRequestTypes";

const initialState = {
    employeeRequests: []
}

export const employeeRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYEE_REQUESTS:
            return {
                ...state,
                employeeRequests: action.payload,
            };
        case DELETE_EMPLOYEE_REQUEST: {
            return {
                ...state,
                employeeRequests: state.employeeRequests.filter(cate => cate._id !== action.payload)
            }
        }
        case UPDATE_EMPLOYEE_REQUEST: {
            return {
                ...state,
                employeeRequests: state.employeeRequests.map(
                    (request, i) => request._id === action.payload.id ? { ...request, ...action.payload.data }
                        : request
                )
            }
        }
        case ADD_EMPLOYEE_REQUEST:
            return {
                ...state,
                employeeRequests: [...state.employeeRequests, action.payload]
            }
        default:
            return state;
    }
};