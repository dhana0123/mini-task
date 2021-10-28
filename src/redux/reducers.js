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

const INITIAL_STATE = {
  tasks: [],
  users: [],
  loading: false,
  error: "",
};

export const TasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS_REQUEST:
      return { ...state, loading: true };
    case GET_TASKS_FAILED:
      return { ...state, tasks: [], error: action.payload, loading: false };
    case GET_TASKS_SUCESS:
      return { ...state, tasks: action.payload, error: "", loading: false };
    case CREATE_TASK_REQUEST:
      return { ...state, error: "" };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        error: "",
        tasks: [...state.tasks, action.payload],
      };
    case CREATE_TASK_FAILED:
      return { ...state, error: action.payload };
    case DELETE_TASK:
      let newTasks = state.tasks.filter((task) => task.id !== action.payload);
      return { ...state, tasks: newTasks };
    case UPDATE_TASK:
      let updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload.id
      );
      return { ...state, tasks: [...updatedTasks, action.payload] };
    case GET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};
