import moment from "moment";
import React from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import CheckInOut from "./components/checkinout";
import TodoList from "./components/todoList";

function CEODashboard() {
  return (
    <div>
      <DashboardLayout>
        <div className="row align-items-center add-list">
          <div className="col-6">
            <h4>CEO DASHBOARD</h4>
            <h3 />
            <h6>Today: {moment(new Date()).format("ddd DD/MM/YYYY")}</h6>
          </div>
        </div>
        <div className="row align-items-center add-list">
          <div className="col-6">
            <TodoList />
          </div>
          <div className="col-6">
            <CheckInOut />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default CEODashboard;
