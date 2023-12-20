import React, { useEffect, useRef, useState } from "react";
import EDITING_ARROW from "../../../assets/images/editing.png";
import DELETE_ARROW from "../../../assets/images/delete.png";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../layout/DashboardLayout";
import { href } from "../../../constants/extra";
import CreateExpense from "./components/CreateExpense";
import EmployeeApi from "../../../api/Employee";
import ExpenseApi from "../../../api/Expenses";
import { toast } from "react-toastify";
import { typeToTitleExpTypes } from "../../../Utills/functions";

function AddExpenses() {
  const refButton = useRef();

  const [employes, setEmployes] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [defaultExpense, setDefaultExpense] = useState(false);

  useEffect(() => {
    getEmployees();
    getExpenses();
  }, []);
  const getExpenses = async () => {
    let response = await ExpenseApi.getAllExpense();
    console.log(response?.data?.data);
    setAllExpenses(response?.data?.data);
  };
  const getEmployees = async () => {
    let response = await EmployeeApi.getAllEmployees(0);
    setEmployes(response?.data?.data?.employees);
  };
  const removeExpense = (id) => {
    ExpenseApi.removeExpense(id)
      .then(() => {
        toast.success("Expense removed successfully");
        let nExpnses = allExpenses.filter((ls) => ls._id != id);
        setAllExpenses(nExpnses);
      })
      .catch((err) => {
        console.log(err.response);
        toast.success("Problem while removing the expense");
      });
  };
  const handleUpdateExpense = (item) => {
    setDefaultExpense(item);
    refButton?.current?.click();
  };
  const handleUpdatedExpenseToList = (_updatedExpense) => {
    // let nArray = allExpenses.forEach((ls) => {
    //   return ls._id == _updatedExpense._id ? _updatedExpense : ls;
    // });
    // setAllExpenses(nArray);
    let fIndex = allExpenses.findIndex((ls) => ls._id == _updatedExpense._id);
    console.log(fIndex);
    if (fIndex >= 0) {
      let nArray = [...allExpenses];
      nArray[fIndex] = _updatedExpense;
      setAllExpenses([...nArray]);
      setDefaultExpense(false);
    }
  };
  return (
    <DashboardLayout>
      <section class="user-dashboard">
        <div class="row justify-content-center">
          <div class="col-md-12 col-xl-10 pb-5">
            <h4 class="mb-4">Expenses</h4>
            <div>
              <a
                ref={refButton}
                href={href}
                data-toggle="modal"
                data-target="#addExpense"
                style={{ float: "right" }}
                className="btn btn-primary px-3"
                onClick={() => setDefaultExpense(false)}
              >
                + ADD Expense
              </a>{" "}
              <br />
              <br />
            </div>
            {allExpenses?.map((item, index) => (
              <div
                key={`all_exp_${index}`}
                class="card lab-result mb-2"
                style={{ border: "1px solid lightgray", borderRadius: "1rem" }}
              >
                <div
                  class="card-body"
                  style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}
                >
                  <div class="row align-items-center">
                    <div class="col-md-12 col-lg-8">
                      <ul class="row">
                        <li class="col-md-4 col-lg-4">{item.title}</li>
                        <li class="col-md-4 col-lg-4">
                          {typeToTitleExpTypes(item.type)}
                        </li>
                        <li class="col-md-3 col-lg-3">{item.amount} AED</li>
                      </ul>
                    </div>
                    <div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
                      <a
                        style={{ cursor: "pointer" }}
                        ref={refButton}
                        href={href}
                        data-toggle="modal"
                        data-target="#addExpense"
                        // style={{display: 'none' }}
                      ></a>
                      <button
                        style={{
                          cursor: "pointer",
                          border: "none",
                          borderWidth: 0,
                          backgroundColor: "transparent",
                          outline: "none",
                        }}
                        onClick={() => handleUpdateExpense(item)}
                      >
                        <img
                          src={EDITING_ARROW}
                          style={{
                            width: "1rem",
                            height: "1rem",
                            marginRight: "7px",
                          }}
                        />
                      </button>
                      <button
                        style={{
                          cursor: "pointer",
                          border: "none",
                          borderWidth: 0,
                          backgroundColor: "transparent",
                          outline: "none",
                        }}
                        onClick={() => removeExpense(item._id)}
                      >
                        <img
                          src={DELETE_ARROW}
                          style={{
                            width: "1rem",
                            height: "1rem",
                            marginRight: "7px",
                          }}
                        />
                      </button>
                      {/* <a style={{ cursor: "pointer" }}>
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CreateExpense
        defaultExpense={defaultExpense}
        employes={employes}
        newExpense={(val) => setAllExpenses([val, ...allExpenses])}
        setDefaultExpense={setDefaultExpense}
        updatedExpense={handleUpdatedExpenseToList}
      />
    </DashboardLayout>
  );
}

export default AddExpenses;
