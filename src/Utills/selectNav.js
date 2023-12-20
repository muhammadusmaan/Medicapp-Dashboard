import { CEO, FINANCE, OPERATIONS, HR, IT, SALES } from "../constants/Roles"
import { CEORoutes } from "../constants/routes/CEORoutes";
import { FinanceRoutes } from "../constants/routes/FinanceRoutes";
import { EmployeeRoutes } from "../constants/routes/EmployeeRoutes";

export const selectNav = (role) => {
    let selectedNav = "/";
    switch (role) {
        case CEO: selectedNav = CEORoutes[0].name; break;
        case FINANCE: selectedNav = FinanceRoutes[0].name; break;
        default: selectedNav = EmployeeRoutes[0].name;
    }
    return selectedNav;
}
