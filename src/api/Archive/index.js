import axios from "../../axios";
import { ARCHIVE_NAMESPACE } from "../../constants/namespaces";
import { trackPromise } from "react-promise-tracker";

const ArchiveApi = {
  getArchives() {
    return trackPromise(axios.get(`/${ARCHIVE_NAMESPACE}`));
  },
  createArchive(data) {
    return trackPromise(axios.post(`/${ARCHIVE_NAMESPACE}`, data));
  },
  deleteArchive(id) {
    return trackPromise(axios.delete(`/${ARCHIVE_NAMESPACE}/${id}`));
  },
  searchByPageNumber(pageNumber) { 
    return trackPromise(axios.get(`/${ARCHIVE_NAMESPACE}/searchByPageNumber/${pageNumber}`));
  },
  filterByFromToDate(data) { 
    return trackPromise(axios.post(`/${ARCHIVE_NAMESPACE}/filterByFromToDate`, data));
  }
};

export default ArchiveApi;
