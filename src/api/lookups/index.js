import axios from '../../axios'
import { LOOKUPS_NAMESPACE } from '../../constants/namespaces'
import { trackPromise } from 'react-promise-tracker'

const LookupApi = {
	getCountries() {
		return trackPromise(axios.get(`/${LOOKUPS_NAMESPACE}/countries`))
	},
	getGenders() {
		return trackPromise(axios.get(`/${LOOKUPS_NAMESPACE}/genders`))
	},
	getLanguages() {
		return trackPromise(axios.get(`/${LOOKUPS_NAMESPACE}/languages`))
	},
	getInsurances() {
		return trackPromise(axios.get(`/${LOOKUPS_NAMESPACE}/insurances`))
	},
}

export default LookupApi