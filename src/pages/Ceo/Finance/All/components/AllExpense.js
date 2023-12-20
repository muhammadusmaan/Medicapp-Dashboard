import moment from "moment";
import React, { useEffect, useState } from "react";
import ExpenseApi from "../../../../../api/Expenses";

function AllExpense({ goToDetailPage }) {
  const [allEpxenses, setAllExpenses] = useState([]);
  useEffect(async () => {
    let response = await ExpenseApi.getMonthlyExpenses();
    console.log(response?.data?.data);
    setAllExpenses(response?.data?.data);
  }, []);

  const hanldePageChange = (date) => {
    goToDetailPage(date);
  };

  return (
    <section class="user-dashboard">
      <div class="row justify-content-center">
        <div class="col-md-12 col-xl-10 pb-5">
          <h4 class="mb-4">All Expenses</h4>
          <div class="row">
            {allEpxenses?.map((item, index) => (
              <div key={`key_item_${index}`} class="col-md-3">
                <div
                  class="card"
                  style={{ cursor: "pointer" }}
                  onClick={() => hanldePageChange(item.date)}
                >
                  <div class="card-body">
                    <div class="media">
                      <div class="media-body">
                        <h5 class="mt-0">
                          {moment(item?.date).format("MMMM d, yyyy")}
                        </h5>
                        <p>Total Income: {item.appointments * 21} AED</p>
                        <p>Total Expenses: {item?.amount} AED</p>
                        <p>
                          Total Profit: {item.appointments * 21 - item?.amount}{" "}
                          AED
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllExpense;
