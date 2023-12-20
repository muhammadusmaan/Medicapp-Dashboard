import React, { useEffect, useState } from "react";
import ExpenseApi from "../../../../../api/Expenses";
import RIGHT_ARROW from "../../../../../assets/images/right-arrow.png";
import { MONTHSLIST } from "../../../../../constants/expenses";
import {
  monthYearToMonthNameDate,
  typeToTitleExpTypes,
} from "../../../../../Utills/functions";

function ExpenseDetails({ setPage, month, year }) {
  const [monthlyByTypesExpenses, setAllMonthlyByTypesExpenses] = useState([]);
  useEffect(async () => {
    let response = await ExpenseApi.getExpensesMonthByExpenseType(month, year);
    console.log(response?.data?.data);
    setAllMonthlyByTypesExpenses(response?.data?.data);
  }, []);

  return (
    <section class="user-dashboard">
      <div class="row justify-content-center">
        <div class="col-md-12 col-xl-10 pb-5">
          <h4 class="mb-4">
            Expenses {MONTHSLIST[month - 1]} {year}
          </h4>
          <button
            type="button"
            className="btn btn-secondary mt-2 mb-2"
            onClick={() => setPage(1)}
          >
            Back
          </button>
          {monthlyByTypesExpenses?.map((item, index) => (
            <div
              key={`item_detail_${index}`}
              class="card lab-result mb-2"
              style={{
                border: "1px solid lightgray",
                borderRadius: "1rem",
                background: index % 2 ? "#95DC89" : "#e16c6c",
                overflow: "hidden",
              }}
            >
              <div
                class="card-body"
                style={{
                  paddingTop: "0.1px",
                  paddingBottom: "0.1px",
                }}
              >
                <div class="row align-items-center">
                  <div class="col-md-12 col-lg-12">
                    <ul class="row col-12">
                      <li class={"col-4"}>
                        {typeToTitleExpTypes(item.type) ?? ""}
                      </li>
                      <li class={"col-4"}>
                        {monthYearToMonthNameDate(`${year}-${month}`)}
                      </li>
                      <li class={"col-4"}>{item.amount} AED</li>
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
              style={{
                paddingTop: "0.1px",
                paddingBottom: "0.1px",
                background: "#e16c6c",
              }}
            >
              <div class="row align-items-center">
                <div class="col-md-12 col-lg-8">
                  <ul>
                    <li>Electricity & Water</li>
                    <li>January XX/XX/XXXX</li>
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
              style={{
                paddingTop: "0.1px",
                paddingBottom: "0.1px",
                background: "#95dc89",
              }}
            >
              <div class="row align-items-center">
                <div class="col-md-12 col-lg-8">
                  <ul>
                    <li>Office Rent</li>
                    <li>January XX/XX/XXXX</li>
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
              style={{
                paddingTop: "0.1px",
                paddingBottom: "0.1px",
                background: "#95dc89",
              }}
            >
              <div class="row align-items-center">
                <div class="col-md-12 col-lg-8">
                  <ul>
                    <li>Vehicle Consumables</li>
                    <li>January XX/XX/XXXX</li>
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
              style={{
                paddingTop: "0.1px",
                paddingBottom: "0.1px",
                background: "#e16c6c",
              }}
            >
              <div class="row align-items-center">
                <div class="col-md-12 col-lg-8">
                  <ul>
                    <li>IT Services</li>
                    <li>January XX/XX/XXXX</li>
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
              style={{
                paddingTop: "0.1px",
                paddingBottom: "0.1px",
                background: "#e16c6c",
              }}
            >
              <div class="row align-items-center">
                <div class="col-md-12 col-lg-8">
                  <ul>
                    <li>Un-expected Expenses</li>
                    <li>January XX/XX/XXXX</li>
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

export default ExpenseDetails;
