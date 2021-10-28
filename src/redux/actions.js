import {
  GET_TASKS_REQUEST,
  GET_TASKS_FAILED,
  GET_TASKS_SUCESS,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILED,
  DELETE_TASK,
  UPDATE_TASK,
  GET_USERS,
} from "./actionType";
import axios from "axios";

// config
const taskAxios = axios.create({
  baseURL: "https://devza.com/tests/tasks",
});
taskAxios.defaults.headers.common["AuthToken"] =
  process.env.REACT_APP_ACCESS_TOKEN;

// helper methods
const getTaskSucess = (data) => ({ type: GET_TASKS_SUCESS, payload: data });
const getTaskError = (err) => ({ type: GET_TASKS_FAILED, payload: err });
const getTaskRequest = () => ({ type: GET_TASKS_REQUEST });

const createTaskSuccess = (data) => ({
  type: CREATE_TASK_SUCCESS,
  payload: data,
});
const createTaskError = (err) => ({ type: CREATE_TASK_FAILED, payload: err });
const createTaskRequest = () => ({ type: CREATE_TASK_REQUEST });

// GET
export const getTasks = () => async (dispatch) => {
  try {
    dispatch(getTaskRequest());
    const res = await taskAxios.get("/list");
    if (res.data.status === "error") {
      dispatch(getTaskError("something went wrong"));
    } else {
      dispatch(getTaskSucess(res.data.tasks));
    }
  } catch (err) {
    dispatch(getTaskError("something went wrong"));
  }
};
// CREATE
export const createTask = (data) => async (dispatch) => {
  const formData = new FormData();
  formData.append("message", data.message);
  formData.append("due_date", data.date);
  formData.append("priority", data.priority);
  formData.append("assigned_to", data.assigned_to);

  var config = {
    method: "post",
    url: "/create",
    data: formData,
  };

  try {
    dispatch(createTaskRequest());
    const {
      data: { taskid },
    } = await taskAxios(config);
    dispatch(createTaskSuccess({ id: taskid, ...data }));
  } catch (err) {
    dispatch(createTaskError("something went wrong"));
  }
};

export const deleteTask = (id) => (dispatch) => {
  const formData = new FormData();
  formData.append("taskid", id);

  var config = {
    method: "post",
    url: "/delete",
    data: formData,
  };

  taskAxios(config).then((res) => {
    dispatch({ type: DELETE_TASK, payload: id });
  });
};

// UPDATE
export const updateTask = (data) => (dispatch) => {
  const formData = new FormData();
  formData.append("message", data.message);
  formData.append("due_date", data.due_date);
  formData.append("priority", data.priority);
  formData.append("assigned_to", data.assigned_to);
  formData.append("taskid", data.id);
  const config = {
    method: "post",
    url: "/update",
    data: formData,
  };

  taskAxios(config)
    .then(() => {
      dispatch({ type: UPDATE_TASK, payload: data });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUsers = () => (dispatch) => {
  const config = {
    method: "get",
    url: "/listusers",
  };

  taskAxios(config)
    .then((response) => {
      let users = response.data.users;
      dispatch({ type: GET_USERS, payload: users });
    })
    .catch((error) => {
      console.log(error);
    });
};
