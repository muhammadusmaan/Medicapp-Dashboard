import axios from "../../axios";
import { EXPENSES_NAMESPACE } from "../../constants/namespaces";
import { trackPromise } from "react-promise-tracker";
import { EXPENSETYPE, MONTH } from "../../constants/expenses";

const ExpenseApi = {
  addExpense(data) {
    return trackPromise(axios.post(`/${EXPENSES_NAMESPACE}`, data));
  },
  removeExpense(id) {
    return trackPromise(axios.delete(`/${EXPENSES_NAMESPACE}/${id}`));
  },
  updateExpense(data) {
    return trackPromise(axios.put(`/${EXPENSES_NAMESPACE}`, data));
  },
  getAllExpense() {
    return trackPromise(axios.get(`/${EXPENSES_NAMESPACE}`));
  },
  getMonthlyExpenses() {
    return trackPromise(axios.get(`/${EXPENSES_NAMESPACE}/${MONTH}`));
  },
  getExpensesMonthByExpenseType(month, year) {
    console.log(
      `/${EXPENSES_NAMESPACE}/${MONTH}/${EXPENSETYPE}/${month}/${year}`
    );
    if (month && year) {
      return trackPromise(
        axios.get(
          `/${EXPENSES_NAMESPACE}/${MONTH}/${EXPENSETYPE}/${month}/${year}`
        )
      );
    } else {
      return false;
    }
  },
  getMonthYearSingleTypeExpenses(month, year, type) {
    console.log(
      `/${EXPENSES_NAMESPACE}/${MONTH}/${EXPENSETYPE}/${month}/${year}/${type}`
    );
    return trackPromise(
      axios.get(
        `/${EXPENSES_NAMESPACE}/${MONTH}/${EXPENSETYPE}/${month}/${year}/${type}`
      )
    );
  },

  // getExpensesMonthType(){
  //   return trackPromise(axios.get(`/${EXPENSES_NAMESPACE}/month/expensetypes/`));
  // }
};

export default ExpenseApi;
