import axios from '../../axios';
import { EMPLOYEE_NAMESPACE } from '../../constants/namespaces';
import { trackPromise } from 'react-promise-tracker';

const EmployeeApi = {
  getAllEmployees(pageNo, department) {
    return trackPromise(axios.get(`/${EMPLOYEE_NAMESPACE}?page=${pageNo}&getAll=undefined`));
  },
  getAllEmployeesWithDepartment(pageNo, department) {
    return trackPromise(axios.post(`/${EMPLOYEE_NAMESPACE}/getAllEmployeesWithDepartment`, { page: pageNo, department }));
  },
  createEmployee(body) {
    return trackPromise(axios.post(`/${EMPLOYEE_NAMESPACE}`, body));
  },
  deleteEmployee(id) {
    return trackPromise(axios.delete(`/${EMPLOYEE_NAMESPACE}/${id}`));
  },
  updateEmployee(id, body) {
    return trackPromise(axios.put(`/${EMPLOYEE_NAMESPACE}/${id}`, body));
  },
  searchEmployees(pageNo, searchedText) {
    return trackPromise(axios.get(`${EMPLOYEE_NAMESPACE}/search/${searchedText.replace('+','')}?page=${pageNo}`))
  },
  getSingleEmployee(id) {
    return trackPromise(axios.get(`${EMPLOYEE_NAMESPACE}/${id}`))
  },
  getAllPatientAcrossPlateform() {
    return trackPromise(axios.get(`${EMPLOYEE_NAMESPACE}/plateform/patients`))
  },
}

export default EmployeeApi;