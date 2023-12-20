import axios from '../../axios';
import { HOSPITAL_NAMESPACE, USERS_NAMESPACE } from '../../constants/namespaces';
import { trackPromise } from 'react-promise-tracker';

const AuthApi = {
    login(credentials) {
        return trackPromise(axios.post(`/${USERS_NAMESPACE}/login`, credentials))
    },
    registerHospital(formData) {
        return trackPromise(axios.post(`/${HOSPITAL_NAMESPACE}`, formData));
    },
    forgetPassword(formData) {
        return trackPromise(axios.put(`/${USERS_NAMESPACE}/forget-password`, formData));
    },
    resetPassword(formData) {
        return trackPromise(axios.put(`/${USERS_NAMESPACE}/reset-password`, formData));
    },
    getSingleUser(id) {
        return trackPromise(axios.get(`/${USERS_NAMESPACE}/${id}`));
    },
}

export default AuthApi;