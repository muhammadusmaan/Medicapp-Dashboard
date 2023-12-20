import React, { useEffect, useState } from "react";
import RIGHT_ARROW from "../../../../assets/images/right-arrow.png";
import { Link } from "react-router-dom";
import ExpenseApi from "../../../../api/Expenses";
import moment from "moment";
import { MONTHSLIST } from "../../../../constants/expenses";
import { monthYearToMonthNameDate } from "../../../../Utills/functions";

function AllExpenses({ setPage, setMonth }) {
  const [allEpxenses, setAllExpenses] = useState([]);
  useEffect(async () => {
    let response = await ExpenseApi.getMonthlyExpenses();
    console.log(response?.data?.data);
    setAllExpenses(response?.data?.data);
  }, []);

  const hanldePageChange = (item) => {
    setMonth(item.date);
  };
  return (
    <section class="user-dashboard">
      <div class="row justify-content-center">
        <div class="col-md-12 col-xl-10 pb-5">
          <h4 class="mb-4">Expenses</h4>
          {allEpxenses?.length > 0 &&
            allEpxenses?.map((item, index) => (
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
                      <ul>
                        <li>{monthYearToMonthNameDate(item.date)}</li>
                        <li></li>
                        <li>{item?.amount ?? ""} AED</li>
                      </ul>
                    </div>
                    <div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => hanldePageChange(item)}
                      >
                        <img
                          src={RIGHT_ARROW}
                          style={{ width: "2rem", height: "2rem" }}
                        />
                      </a>
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
                    <li>February XX/XX/XXXX</li>
                    <li></li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
                <div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
                  <Link to={`expenses/1`}>
                    <img
                      src={RIGHT_ARROW}
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </Link>
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
                    <li>March XX/XX/XXXX</li>
                    <li></li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
                <div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
                  <Link to={`expenses/1`}>
                    <img
                      src={RIGHT_ARROW}
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </Link>
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
                    <li>April XX/XX/XXXX</li>
                    <li></li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
                <div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
                  <Link to={`expenses/1`}>
                    <img
                      src={RIGHT_ARROW}
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </Link>
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
                    <li>May XX/XX/XXXX</li>
                    <li></li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
                <div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
                  <Link to={`expenses/1`}>
                    <img
                      src={RIGHT_ARROW}
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </Link>
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
                    <li>June XX/XX/XXXX</li>
                    <li></li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
                <div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
                  <Link to={`expenses/1`}>
                    <img
                      src={RIGHT_ARROW}
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </Link>
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
                    <li>July XX/XX/XXXX</li>
                    <li></li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
                <div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
                  <Link to={`expenses/1`}>
                    <img
                      src={RIGHT_ARROW}
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </Link>
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
                    <li>August XX/XX/XXXX</li>
                    <li></li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
                <div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
                  <Link to={`expenses/1`}>
                    <img
                      src={RIGHT_ARROW}
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </Link>
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
                    <li>September XX/XX/XXXX</li>
                    <li></li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
                <div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
                  <Link to={`expenses/1`}>
                    <img
                      src={RIGHT_ARROW}
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </Link>
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
                    <li>October XX/XX/XXXX</li>
                    <li></li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
                <div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
                  <Link to={`expenses/1`}>
                    <img
                      src={RIGHT_ARROW}
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </Link>
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
                    <li>November XX/XX/XXXX</li>
                    <li></li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
                <div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
                  <Link to={`expenses/1`}>
                    <img
                      src={RIGHT_ARROW}
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </Link>
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
                    <li>December XX/XX/XXXX</li>
                    <li></li>
                    <li>XXXXXX.XX AED</li>
                  </ul>
                </div>
                <div class="col-md-12 col-lg-4 text-center text-md-right mt-3 mt-md-0">
                  <Link to={`expenses/1`}>
                    <img
                      src={RIGHT_ARROW}
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default AllExpenses;
