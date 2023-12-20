import axios from '../../axios';
import { EMPLOYEE_REQUESTS_NAMESPACE } from '../../constants/namespaces';
import { trackPromise } from 'react-promise-tracker';

const EmployeeRequestApi = {
  getAllEmployeeRequests(employeeId) {
    return trackPromise(axios.get(`/${EMPLOYEE_REQUESTS_NAMESPACE}/getAll/${employeeId}`));
  },
  createEmployeeRequest(body) {
    return trackPromise(axios.post(`/${EMPLOYEE_REQUESTS_NAMESPACE}`, body));
  },
  deleteEmployeeRequest(id) {
    return trackPromise(axios.delete(`/${EMPLOYEE_REQUESTS_NAMESPACE}/${id}`));
  },
  updateEmployeeRequest(id, body) {
    return trackPromise(axios.put(`/${EMPLOYEE_REQUESTS_NAMESPACE}/${id}`, body));
  },
  getSingleEmployeeRequest(id) {
    return trackPromise(axios.get(`${EMPLOYEE_REQUESTS_NAMESPACE}/${id}`))
  },
}

export default EmployeeRequestApi;