import React from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import Scheduler from "./schedular";

function Schedule() {
  return (
    <div>
      <DashboardLayout>
        <div className="row align-items-center add-list">
          <div className="col-12">
            <Scheduler />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default Schedule;
