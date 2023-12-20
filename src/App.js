import Login from './pages/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import RootContext from "./contextApi/index"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './assets/css/style.css'
import PublicRoute from './ProtectedRoutes/PublicRoute'
import CEORouter from './pages/Ceo';
import EmployeeRouter from './pages/Employee';
import FinanceRouter from './pages/Finance';

function App() {
  return (
    <>
      <RootContext>
        <Router>
          <Switch>
            <Route path="/ceo" component={CEORouter} />
            <Route path="/employee" component={EmployeeRouter} />
            <Route path="/finance" component={FinanceRouter} />
            <PublicRoute exact path="/login" component={Login} />
            <Redirect to="/ceo" />
          </Switch>
        </Router>
        <ToastContainer />
      </RootContext>
    </>
  )
}

export default App
