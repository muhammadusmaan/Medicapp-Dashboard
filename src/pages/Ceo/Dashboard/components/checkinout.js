import moment from "moment";
import React, { useEffect, useState } from "react";
import EmployeeCheckinApi from "../../../../api/Checkin";

const CheckInOut = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    EmployeeCheckinApi.getRecentEmployeeAttendance().then((res) => {
      if (res.data.data && res.data.data.length > 0) {
        const checkIns = [];
        res.data.data.forEach((item) => {
          checkIns.push({
            _id: item._id,
            name: item?.employeeId?.name ?? "",
            department: item?.employeeId?.department ?? "",
            checkin: item.checkin ?? "",
            checkout: item.checkout ?? "",
          });
        });
        setList(checkIns);
      }
    });

    return () => {};
  }, []);

  return (
    <>
      <div className="border-outer add-list p-0">
        <div style={{ height: 20 }} />
        {list?.length > 0 ? (
          <table style={{ width: "100%" }}>
            <thead
              className="sticky"
              style={{ padding: "7px", position: "sticky" }}
            >
              <tr style={{ padding: "7px", backgroundColor: "#ffffff" }}>
                <td
                  style={{
                    padding: "7px",
                    textAlign: "center",
                  }}
                >
                  Name
                </td>
                <td
                  style={{
                    padding: "7px",
                    textAlign: "center",
                  }}
                >
                  Department
                </td>
                <td
                  style={{
                    padding: "7px",
                    textAlign: "center",
                  }}
                >
                  In
                </td>
                <td
                  style={{
                    padding: "7px",
                    textAlign: "center",
                  }}
                >
                  Out
                </td>
              </tr>
            </thead>
            <tbody style={{ padding: "7px" }}>
              {list?.map((item, index) => (
                <tr
                  key={item._id ?? "_id"}
                  style={{
                    border: "1px solid #ffffff",
                    height: "50px",
                    padding: "7px",
                    backgroundColor: "#C4C4C4",
                  }}
                >
                  <td
                    style={{
                      padding: "7px",
                      textAlign: "center",
                    }}
                  >
                    {item?.name ?? ""}
                  </td>
                  <td
                    style={{
                      padding: "7px",
                      textAlign: "center",
                    }}
                  >
                    {item?.department ?? ""}
                  </td>
                  <td style={{ padding: "7px", textAlign: "center" }}>
                    {item?.checkin}
                  </td>
                  <td style={{ padding: "7px", textAlign: "center" }}>
                    {item?.checkout}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center" }}>No check in/out record yet!</p>
        )}
        <div style={{ height: 30 }} />
      </div>
    </>
  );
};

export default CheckInOut;
