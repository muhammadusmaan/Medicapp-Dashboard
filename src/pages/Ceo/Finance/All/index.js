import React, { useState } from "react";
import AllExpense from "./components/AllExpense";
import ExpenseDetails from "./components/ExpenseDetails";

function All() {
  const [page, setPage] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  const setPageDetailPage = (date) => {
    setMonth(parseInt(`${`${date}`.split("-")[1]}`));
    setYear(parseInt(`${`${date}`.split("-")[0]}`));
    setPage(2);
  };
  let returnedComponent = (
    <AllExpense goToDetailPage={setPageDetailPage} setPage={setPage} />
  );
  switch (page) {
    case 1:
      returnedComponent = (
        <AllExpense
          setYear={setYear}
          goToDetailPage={setPageDetailPage}
          setPage={setPage}
        />
      );
      break;
    case 2:
      returnedComponent = (
        <ExpenseDetails month={month} year={year} setPage={setPage} />
      );
      break;
  }

  return <>{returnedComponent}</>;
}

export default All;
