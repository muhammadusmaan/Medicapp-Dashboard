import axios from "../../axios";
import { TODO_NAMESPACE } from "../../constants/namespaces";
import { trackPromise } from "react-promise-tracker";

const TodoApi = {
  createTodo(data) {
    return trackPromise(axios.post(`/${TODO_NAMESPACE}`, data));
  },
  deleteTodo(id) {
    return trackPromise(axios.delete(`/${TODO_NAMESPACE}/delete/${id}`));
  },
  getCeoTodos() {
    return trackPromise(axios.get(`/${TODO_NAMESPACE}`));
  },
  getCeoDateTodos(date) {
    return trackPromise(axios.get(`/${TODO_NAMESPACE}/${date}`));
  },
};

export default TodoApi;
