import React, { useState } from "react";
import DashboardLayout from "../../../../layout/DashboardLayout";
import RIGHT_ARROW from "../../../../assets/images/right-arrow.png";
import { Link } from "react-router-dom";
import AllExpenses from "./components/AllExpenses";
import MonthlyExpense from "./components/MonthlyExpense";
import SingleExpense from "./components/SingleExpense";
import FinanceExpenses from "../../../Finance/Expenses";
function Expenses() {
  const [page, setPage] = useState(null);

  // let returnedComponent = <AllExpenses setPage={setPage} />

  // switch (page) {
  //   case 1: returnedComponent = <AllExpenses setPage={setPage} />; break;
  //   case 2: returnedComponent = <MonthlyExpense setPage={setPage} />; break;
  //   case 3: returnedComponent = <SingleExpense setPage={setPage} />; break;
  // }

  return (
    <>
      {/* {returnedComponent} */}
      <div class={"row"}>
        <div class={"col-12"}>
          <FinanceExpenses avoidDashBoardLayout={true} />
        </div>
      </div>
    </>
  );
}

export default Expenses;
