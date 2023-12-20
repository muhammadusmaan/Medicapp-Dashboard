import { Switch, withRouter } from "react-router-dom";
import EmployeeRoute from "../../ProtectedRoutes/EmployeeRoute";
import Checkin from "./Checkin";
import Requests from "./Requests";

const EmployeeRouter = withRouter(({ match, ...props }) => {
    return (
        <Switch {...props}>
            <EmployeeRoute exact path={`${match.path}`}>
                <Requests />
            </EmployeeRoute>
            <EmployeeRoute exact path={`${match.path}/check-in-out`}>
              <Checkin />
            </EmployeeRoute>
        </Switch>
    )
});

export default EmployeeRouter;
