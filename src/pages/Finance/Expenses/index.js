import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import AllExpenses from "./components/AllExpenses";
import MonthlyExpense from "./components/MonthlyExpense";
import SingleExpense from "./components/SingleExpense";

function Expenses({ avoidDashBoardLayout }) {
  const [page, setPage] = useState(null);
  const [month, setMonth] = useState(null);
  const [type, setType] = useState(null);

  const [year, setYear] = useState(null);

  const [createExpense, setCreateExpense] = useState();
  // page 1 to 2 navigate  - START
  const handleSetMonthYear = (date) => {
    setMonth(parseInt(`${`${date}`.split("-")[1]}`));
    setYear(parseInt(`${`${date}`.split("-")[0]}`));
    setPage(2);
  };
  // page 1 to 2 navigate  - END
  // page 2 to 3 navigate  - START
  const handleSetType = (type) => {
    setType(type);
    setPage(3);
  };
  // page 2 to 3 navigate  - END

  let returnedComponent = (
    <AllExpenses setMonth={handleSetMonthYear} setPage={setPage} />
  );

  switch (page) {
    case 1:
      returnedComponent = (
        <AllExpenses
          setMonth={handleSetMonthYear}
          setPage={setPage}
          setCreateExpense={setCreateExpense}
        />
      );
      break;
    case 2:
      returnedComponent = (
        <MonthlyExpense
          month={month}
          year={year}
          setPage={setPage}
          setType={handleSetType}
          setCreateExpense={setCreateExpense}
        />
      );
      break;
    case 3:
      returnedComponent = (
        <SingleExpense
          setPage={setPage}
          setCreateExpense={setCreateExpense}
          month={month}
          year={year}
          type={type}
        />
      );
      break;
  }
  if (avoidDashBoardLayout) {
    return <>{returnedComponent}</>;
  } else {
    return <DashboardLayout>{returnedComponent}</DashboardLayout>;
  }
}

export default Expenses;
