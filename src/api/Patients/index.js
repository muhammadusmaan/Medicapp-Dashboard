import axios from '../../axios';
import { PATIENT_NAMESPACE } from '../../constants/namespaces';
import { trackPromise } from 'react-promise-tracker';

const PatientApi = {
    getAllPlateformPatients() {
        return trackPromise(axios.get(`${PATIENT_NAMESPACE}/plateform/patients`));
    },
    searchPlateformPatients(searchText) {
        return trackPromise(axios.get(`${PATIENT_NAMESPACE}/search/${searchText.replace('+','')}`));
    },
    deletePatient(id) {
        return trackPromise(axios.delete(`${PATIENT_NAMESPACE}/${id}`))
    },
    updatePatient(id, data) {
        return trackPromise(axios.put(`/${PATIENT_NAMESPACE}/${id}`, data))
    },
}

export default PatientApi;