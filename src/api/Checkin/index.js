import axios from "../../axios";
import { EMPLOYEE_CHECKIN_NAMESPACE } from "../../constants/namespaces";
import { trackPromise } from "react-promise-tracker";

const EmployeeCheckinApi = {
  getAllAttendance(employeeId) {
    return trackPromise(
      axios.get(`/${EMPLOYEE_CHECKIN_NAMESPACE}/${employeeId}`)
    );
  },
  employeeCheckin(body) {
    return trackPromise(axios.post(`/${EMPLOYEE_CHECKIN_NAMESPACE}/in`, body));
  },
  employeeCheckout(id, body) {
    return trackPromise(
      axios.put(`/${EMPLOYEE_CHECKIN_NAMESPACE}/out/${id}`, body)
    );
  },
  employeeCheckinoutOfADate(body) {
    return trackPromise(
      axios.post(`/${EMPLOYEE_CHECKIN_NAMESPACE}/in-out`, body)
    );
  },
  getRecentEmployeeAttendance() {
    return trackPromise(axios.get(`/${EMPLOYEE_CHECKIN_NAMESPACE}/recents`));
  },
};

export default EmployeeCheckinApi;
