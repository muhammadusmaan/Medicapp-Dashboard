import { Switch, withRouter } from "react-router-dom";
import FinanceRoute from "../../ProtectedRoutes/FinanceRoute";
import AddExpenses from "./AddExpenses";
import Expenses from "./Expenses";
import Checkin from "../Employee/Checkin";
import Requests from "../Employee/Requests";

const FinanceRouter = withRouter(({ match, ...props }) => {
  return (
    <Switch {...props}>
      <FinanceRoute exact path={`${match.path}`}>
        <Expenses />
      </FinanceRoute>
      <FinanceRoute exact path={`${match.path}/add`}>
        <AddExpenses />
      </FinanceRoute>
      <FinanceRoute exact path={`${match.path}/requests`}>
        <Requests />
      </FinanceRoute>
      <FinanceRoute exact path={`${match.path}/check-in-out`}>
        <Checkin />
      </FinanceRoute>
    </Switch>
  );
});

export default FinanceRouter;
