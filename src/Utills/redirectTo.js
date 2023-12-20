import { CEO_ROUTE, EMPLOYEE_ROUTE, FINANCE_ROUTE } from "../constants/Redirects"
import { CEO, FINANCE, OPERATIONS, HR, IT, SALES } from "../constants/Roles"

export const redirectTo = (role) => {
    console.log("ROLE => ", role);
    let redirecTo = "/";
    switch (role) {
        case CEO: redirecTo = CEO_ROUTE; break;
        case FINANCE: redirecTo = FINANCE_ROUTE; break;
        case OPERATIONS : redirecTo = EMPLOYEE_ROUTE; break;
        case HR : redirecTo = EMPLOYEE_ROUTE; break;
        case IT : redirecTo = EMPLOYEE_ROUTE; break;
        case SALES : redirecTo = EMPLOYEE_ROUTE; break;
        default: redirecTo = "/login"
    }
    return redirecTo;
}
