import { toast } from "react-toastify";
import EmployeeRequestApi from "../../api/EmployeeRequests";
import { UPDATE_EMPLOYEE_REQUEST, ADD_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_REQUEST, GET_EMPLOYEE_REQUESTS } from "../types/employeeRequestTypes";

export const getEmployeeRequests = (employeeId) => async (dispatch, getState) => {
    try {
        const response = await EmployeeRequestApi.getAllEmployeeRequests(employeeId)

        console.log("---> RESPONSE => ", response);

        dispatch({
            type: GET_EMPLOYEE_REQUESTS,
            payload: response.data.data || []
        })
        return response;
    } catch (err) {
        toast.error("Problem while getting employee requests");
    }
}

export const deleteEmployeeRequest = (id) => async (dispatch, getState) => {
    try {
        await EmployeeRequestApi.deleteEmployeeRequest(id);

        dispatch({
            type: DELETE_EMPLOYEE_REQUEST,
            payload: id
        });
        toast.success("Employee Request deleted successfully");
    } catch (err) {
        toast.error(err.response.data.message);
    }
}

export const createEmployeeRequest = (data) => async (dispatch, getState) => {
    try {
        const response = await EmployeeRequestApi.createEmployeeRequest(data);
        dispatch({
            type: ADD_EMPLOYEE_REQUEST,
            payload: response.data.data
        })
        toast.success("Employee Request created successfully");
    } catch (err) {
        console.log("ERRRR => ", err);
        toast.error(err.response.data.message);
    }
}

export const updateEmployeeRequest = (id, data) => async (dispatch, getState) => {
    try {
        await EmployeeRequestApi.updateEmployeeRequest(id, data);
        dispatch({
            type: UPDATE_EMPLOYEE_REQUEST,
            payload: {
                data, id
            }
        })
        toast.success("Employee request updated successfully");
    } catch (err) {
        toast.error(err.response.data.message);
    }
}
