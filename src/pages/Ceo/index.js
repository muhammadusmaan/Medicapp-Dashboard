import { Switch, withRouter } from "react-router-dom";
import CEORoute from "../../ProtectedRoutes/CEORoute";
import Archives from "./Archives";
import CEODashboard from "./Dashboard";
import Employees from "./Manage/Employees";
import Finance from "./Finance";
import Manage from "./Manage";
import Schedule from "./Schedule";
import CeoEmployees from "./Employees";
import EmployeeDetail from "./Employees/components/EmployeeDetail";
import EmployeeRequests from "./Employees/components/EmployeeRequest";
import RequestInfo from "./Employees/components/RequestInfo";

const CEORouter = withRouter(({ match, ...props }) => {
    return (
        <Switch {...props}>
            <CEORoute exact path={`${match.path}`}>
                <CEODashboard />
            </CEORoute>
            <CEORoute exact path={`${match.path}/employees`}>
                <CeoEmployees />
            </CEORoute>
            <CEORoute exact path={`${match.path}/employees/:id`}>
                <EmployeeDetail />
            </CEORoute>
            <CEORoute exact path={`${match.path}/employees/requests/:id`}>
                <EmployeeRequests />
            </CEORoute>
            <CEORoute exact path={`${match.path}/employees/requestsDetail/:requestId/:employeeId`}>
                <RequestInfo />
            </CEORoute>
            <CEORoute exact path={`${match.path}/finance`}>
                <Finance />
            </CEORoute>
            <CEORoute exact path={`${match.path}/schedule`}>
                <Schedule />
            </CEORoute>
            <CEORoute exact path={`${match.path}/archives`}>
                <Archives />
            </CEORoute>
            <CEORoute exact path={`${match.path}/manage`}>
                <Manage />
            </CEORoute>
        </Switch>
    )
});

export default CEORouter;
