import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import ExpenseApi from "../../../../api/Expenses";
import { EXPENSETYE_SALARY, MONTHSLIST } from "../../../../constants/expenses";
import { typeToTitleExpTypes } from "../../../../Utills/functions";

function SingleExpense({ setPage, month, year, type }) {
  const [singleTypeExpenses, setSingleTypesExpenses] = useState([]);
  useEffect(async () => {
    let response = await ExpenseApi.getMonthYearSingleTypeExpenses(
      month,
      year,
      type
    );
    console.log("Single: ", response?.data?.data);
    setSingleTypesExpenses(response?.data?.data);
  }, []);
  return (
    <section class="user-dashboard">
      <div class="row justify-content-center">
        <div class="col-md-12 col-xl-10 pb-5">
          <h4 class="mb-4">Expenses {typeToTitleExpTypes(type) ?? ""}</h4>
          <button
            type="button"
            className="btn btn-secondary mt-2 mb-2"
            onClick={() => setPage(2)}
          >
            Back
          </button>
          {singleTypeExpenses?.map((item, index) => (
            <div
              key={`single_exp_${index}`}
              class="card lab-result mb-2"
              style={{
                border: "1px solid lightgray",
                borderRadius: "1rem",
              }}
            >
              <div
                class="card-body"
                style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}
              >
                <div class="row align-items-center">
                  <div class="col-md-12 col-lg-12">
                    <ul>
                      <li>{item?.title ?? "Employee Full Name"}</li>
                      {EXPENSETYE_SALARY.value == type && (
                        <>
                          <li>
                            {"Employee ID # " + item?.employeeId?.emiratesId}
                          </li>
                          <li>
                            {item?.employeeId?.department ?? "Department"}
                          </li>
                        </>
                      )}
                      <li>{item.amount ?? ""} AED</li>
                      <li>
                        <span data-tip data-for="registerTip">
                          {`${item.description ?? ""}`.slice(0, 10)}...
                        </span>
                        <ReactTooltip
                          id="registerTip"
                          place="top"
                          effect="solid"
                          multiline={true}
                        >
                          {item.description}
                        </ReactTooltip>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* <div
            class="card lab-result mb-2"
            style={{ border: "1px solid lightgray", borderRadius: "1rem" }}
          >
            <div
              class="card-body"
              style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}
            >
              <div class="row align-items-center">
                <div class="col-md-12 col-lg-8">
                  <ul>
                    <li>Employee Full Name</li>
                    <li>Employee ID #</li>
                    <li>Department</li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            class="card lab-result mb-2"
            style={{ border: "1px solid lightgray", borderRadius: "1rem" }}
          >
            <div
              class="card-body"
              style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}
            >
              <div class="row align-items-center">
                <div class="col-md-12 col-lg-8">
                  <ul>
                    <li>Employee Full Name</li>
                    <li>Employee ID #</li>
                    <li>Department</li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            class="card lab-result mb-2"
            style={{ border: "1px solid lightgray", borderRadius: "1rem" }}
          >
            <div
              class="card-body"
              style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}
            >
              <div class="row align-items-center">
                <div class="col-md-12 col-lg-8">
                  <ul>
                    <li>Employee Full Name</li>
                    <li>Employee ID #</li>
                    <li>Department</li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            class="card lab-result mb-2"
            style={{ border: "1px solid lightgray", borderRadius: "1rem" }}
          >
            <div
              class="card-body"
              style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}
            >
              <div class="row align-items-center">
                <div class="col-md-12 col-lg-8">
                  <ul>
                    <li>Employee Full Name</li>
                    <li>Employee ID #</li>
                    <li>Department</li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            class="card lab-result mb-2"
            style={{ border: "1px solid lightgray", borderRadius: "1rem" }}
          >
            <div
              class="card-body"
              style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}
            >
              <div class="row align-items-center">
                <div class="col-md-12 col-lg-8">
                  <ul>
                    <li>Employee Full Name</li>
                    <li>Employee ID #</li>
                    <li>Department</li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            class="card lab-result mb-2"
            style={{ border: "1px solid lightgray", borderRadius: "1rem" }}
          >
            <div
              class="card-body"
              style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}
            >
              <div class="row align-items-center">
                <div class="col-md-12 col-lg-8">
                  <ul>
                    <li>Employee Full Name</li>
                    <li>Employee ID #</li>
                    <li>Department</li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            class="card lab-result mb-2"
            style={{ border: "1px solid lightgray", borderRadius: "1rem" }}
          >
            <div
              class="card-body"
              style={{ paddingTop: "0.1px", paddingBottom: "0.1px" }}
            >
              <div class="row align-items-center">
                <div class="col-md-12 col-lg-8">
                  <ul>
                    <li>Employee Full Name</li>
                    <li>Employee ID #</li>
                    <li>Department</li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default SingleExpense;
