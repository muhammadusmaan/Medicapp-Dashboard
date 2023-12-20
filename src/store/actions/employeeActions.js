import { toast } from "react-toastify";
import EmployeeApi from "../../api/Employee"
import { CLEAR_SELECTED_EMPLOYEE, ADD_EMPLOYEE, CLEAR_SEARCH_RESULTS, DELETE_EMPLOYEE, GET_EMPLOYEES, SEARCH_EMPLOYEE, SELECT_EMPLOYEE, SET_PAGE_NUMBER, SET_DEPARTMENT } from "../types/employeeTypes"

export const getEmployees = (pageNo, department) => async (dispatch, getState) => {
    try {
        let response = null;
        if (department) {
            response = await EmployeeApi.getAllEmployeesWithDepartment(pageNo, department);
        } else {
            response = await EmployeeApi.getAllEmployees(pageNo);
        }

        dispatch({
            type: GET_EMPLOYEES,
            payload: response.data.data
        })
        return response;
    }catch(err) {
        toast.error("Problem while getting employees");
    }
}

export const addEmployee = (data) => async (dispatch, getState) => {
    try {
        const response = await EmployeeApi.createEmployee(data);

        dispatch({
            type: ADD_EMPLOYEE,
            payload: response.data.data
        });
        toast.success("Employee Created Successfully");
    }catch(err) {
        toast.error(err.response.data.message);
    }
}

export const deleteEmployee = (id) => async (dispatch, getState) => {
    try {
        await EmployeeApi.deleteEmployee(id);

        dispatch({
            type: DELETE_EMPLOYEE,
            payload: id
        });
        toast.success("Employee deleted successfully");
    }catch(err) {
        toast.error(err.response.data.message);
    }
}

export const searchEmployee = (pageNo, searchedText) => async (dispatch, getState) => {
    try {
        const response = await EmployeeApi.searchEmployees(pageNo, searchedText);
        if(response?.data?.data?.employees?.length === 0){
            toast.error("No employees found against this search");
        }
        dispatch({
            type: SEARCH_EMPLOYEE,
            payload: response.data.data
        });
        
        return response;
    }catch(err) {
        toast.error(err.response.data.message);
    }
}

export const setPageNumber = (pageNo) => ({
    type: SET_PAGE_NUMBER,
    payload: pageNo
})

export const setDepartment = (department) => ({
    type: SET_DEPARTMENT,
    payload: department
})

export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
})

export const clearSelectedEmployee = () => ({
    type: CLEAR_SELECTED_EMPLOYEE
})

export const selectEmployee = (id) => async (dispatch, getState) => {
    try {
        const response = await EmployeeApi.getSingleEmployee(id);

        dispatch({
            type: SELECT_EMPLOYEE,
            payload: response.data.data
        });
    }catch(err) {
        toast.error(err.response.data.message);
    }
}