import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import TodoApi from "../../../../api/Todo";
const TodoItem = ({ item, index }) => {
  return (
    <div
      className={`todo-item row align-items-center ${
        index % 2 ? "todo-item-even " : "todo-item-odd"
      } `}
    >
      <div className="col-3 item-content-outer item-text">{item.title}</div>
      <div className="col-3 item-content-outer item-text-desc">
        {moment(item.startDate).format("hh:mm a") +
          " - " +
          moment(item.endDate).format("hh:mm a")}
      </div>
      <div className="col-3 item-content-outer item-text-desc">
        {item.type ?? ""}
      </div>
      <div className="col-3 item-content-outer item-text-desc">
        {item.description && (
          <>
            <span data-tip data-for="registerTip" title={item.description}>
              {`${item.description ?? ""}`.slice(0, 10)}...
            </span>
          </>
        )}
      </div>
    </div>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todayDate = moment(new Date()).format("YYYY-MM-DD");
    console.log("todayDate: ", todayDate);
    TodoApi.getCeoDateTodos(todayDate).then((res) => {
      if (res.data.data && res.data.data.length > 0) {
        const events = [];
        res.data.data.forEach((todo) => {
          events.push({
            _id: todo._id,
            title: todo.title,
            startDate: todo.from,
            endDate: todo.to,
            description: todo.description,
            type: todo.type,
            // status: todo.status,
          });
        });
        setTodos(events);
      }
    });

    return () => {};
  }, []);

  return (
    <>
      <div className="border-outer add-list">
        <h4 className="todo-head-text" style={{ textAlign: "center" }}>
          What do I have today?
        </h4>
        {todos?.length > 0 ? (
          todos?.map((item, index) => <TodoItem item={item} index={index} />)
        ) : (
          <p style={{ textAlign: "center" }}>No todo added for today!</p>
        )}
      </div>
    </>
  );
};

export default TodoList;
