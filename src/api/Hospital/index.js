import axios from '../../axios';
import { CATEGORIES_NAMESPACE, HOSPITAL_NAMESPACE } from '../../constants/namespaces';
import { trackPromise } from 'react-promise-tracker';

const HospitalApi = {
    getSingleHospital(id) {
        return trackPromise(axios.get(`/${HOSPITAL_NAMESPACE}/${id}`));
    },
    getAllHospitalServices() {
        return trackPromise(axios.get(`${HOSPITAL_NAMESPACE}/services/all`));
    },
    getAllHospitalCategories() {
        return trackPromise(axios.get(`${CATEGORIES_NAMESPACE}`));
    },
    updateHospitalProfile(hospitalId, newData) {
        return trackPromise(axios.put(`${HOSPITAL_NAMESPACE}/${hospitalId}`, newData));
    },
    uploadHospitalImage(id, data) {
        return trackPromise(axios.put(`${HOSPITAL_NAMESPACE}/uploadImage/${id}`, data));
    },
    searchHospitalByText(text) {
        return trackPromise(axios.get(`/${HOSPITAL_NAMESPACE}/search/${text.replace('+','')}`));
    },
    filterHospitals(filters) {
        return trackPromise(axios.post(`${HOSPITAL_NAMESPACE}/filter`, filters));
    },
    getAllHospitals() {
        return trackPromise(axios.get(`${HOSPITAL_NAMESPACE}`));
    },
    getAllAdminHospitals() {
        return trackPromise(axios.get(`${HOSPITAL_NAMESPACE}/all`));
    },
    getHospitalFinance(id) {
        return trackPromise(axios.get(`${HOSPITAL_NAMESPACE}/finance/${id}`));
    },
    getHospitalFinanceReport(data) {
        return trackPromise(axios.post(`${HOSPITAL_NAMESPACE}/finance/report`, data, { responseType: 'blob' }));
    },
    getHospitalFinanceStatistics(data) {
        return trackPromise(axios.post(`${HOSPITAL_NAMESPACE}/finance/statistics`, data));
    },
    getMedicappPCRFinanceReport(data) {
        return trackPromise(axios.post(`${HOSPITAL_NAMESPACE}/finance/pcr/report`, data, { responseType: 'blob' }))
    },
    getMedicappPCRFinanceStatistics(data) {
        return trackPromise(axios.post(`${HOSPITAL_NAMESPACE}/finance/pcr/statistics`, data));
    },
    getPendingHospitals() {
        return trackPromise(axios.get(`${HOSPITAL_NAMESPACE}/get/pending`));
    },
    approveHospital(id) {
        return trackPromise(axios.put(`${HOSPITAL_NAMESPACE}/approveHospital/${id}`));
    },
    getTradeLicenseFile(id) {
        return trackPromise(axios.get(`${HOSPITAL_NAMESPACE}/getTradeLicenseFile/${id}`));
    },
    uploadProfilePic(id, data) {
        return trackPromise(axios.put(`${HOSPITAL_NAMESPACE}/uploadProfilePicture/${id}`, data));
    },
    deleteGalleryImage(hospitalId, url) {
        return trackPromise(axios.delete(`${HOSPITAL_NAMESPACE}/deleteGalleryImage/${hospitalId}/${url}`));
    },
    deleteHospital(hospitalId) {
        return trackPromise(axios.delete(`${HOSPITAL_NAMESPACE}/${hospitalId}`));
    },
    removeProfilePicture(hospitalId) {
        return trackPromise(axios.delete(`${HOSPITAL_NAMESPACE}/deleteProfileImage/${hospitalId}`));
    },
}

export default HospitalApi;