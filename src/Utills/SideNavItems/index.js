import { EmployeeRoutes } from "../../constants/routes/EmployeeRoutes"
import { CEORoutes } from "../../constants/routes/CEORoutes"
import { FinanceRoutes } from "../../constants/routes/FinanceRoutes"
import { CEO, FINANCE, OPERATIONS, HR, IT, SALES } from "../../constants/Roles"

export const getRoutes = (role) => {
    let routes = [];
    switch (role) {
        case CEO:
            routes = CEORoutes;
            break;
        case FINANCE:
            routes = FinanceRoutes;
            break;
        default: routes = EmployeeRoutes
    }
    return routes;
}