import { GET_EMPLOYEES, ADD_EMPLOYEE, CLEAR_SEARCH_RESULTS, DELETE_EMPLOYEE, SEARCH_EMPLOYEE, SELECT_EMPLOYEE, SET_PAGE_NUMBER, CLEAR_SELECTED_EMPLOYEE, SET_DEPARTMENT } from "../types/employeeTypes";

const initialState = {
    employees: [],
    numberOfPages: 0,
    pageNumber: 0,
    searchedText: "",
    searchedEmployees: [],
    selectedEmployee: {},
    department: ""
}

export const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EMPLOYEES: 
            return { 
                ...state,
                employees: action.payload.employees,
                numberOfPages: action.payload.totalPages, 
                searchedEmployees: [],
                searchedText: ""
            };
        case ADD_EMPLOYEE: 
            return {
                ...state, 
                employees: [...state.employees, action.payload]
            }
        case DELETE_EMPLOYEE: {
            return {
                ...state, 
                employees: state.employees.filter(doc => doc._id !== action.payload)
            }
        }
        case SET_DEPARTMENT: {
            return {
                ...state, 
                department: action.payload,
                searchedText: ""
            }
        }
        case SEARCH_EMPLOYEE: {
            return {
                ...state,
                searchedEmployees: action.payload.employees,
                employees: [],
                numberOfPages: action.payload.totalPages || state.numberOfPages,
                searchedText: action.payload.searchedText,
                department: ""
            }
        }
        case SET_PAGE_NUMBER: {
            return {
                ...state,
                pageNumber: action.payload
            }
        }
        case SELECT_EMPLOYEE: {
            return {
                ...state,
                selectedEmployee: action.payload
            }
        }
        case CLEAR_SEARCH_RESULTS: {
            return {
                ...state, 
                searchedEmployees: [],
                searchedText: "",
                pageNumber: 0
            }
        }
        case CLEAR_SELECTED_EMPLOYEE: {
            return {
                ...state, 
                selectedEmployee: {},
            }
        }
        default: 
            return state;
    }
};