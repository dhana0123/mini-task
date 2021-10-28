import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import Tasks from "./components/Tasks";
import { TasksReducer } from "./redux/reducers";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import Filter from "./components/Filter";

const rootReducer = combineReducers({ tasks: TasksReducer });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const Main = styled.div`
  display: flex;
  max-width: 1000px;
  margin: auto;
  margin-top: 4rem;
  .section {
    width: 65%;
  }
`;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState("false");

  const filterData = {
    order,
    setOrder,
    searchQuery,
    setSearchQuery,
  };

  return (
    <Provider store={store}>
      <div>
        <Header />
        <Main>
          <div className="section">
            <TaskInput />
            <Tasks {...filterData} />
          </div>
          <Filter {...filterData} />
        </Main>
      </div>
    </Provider>
  );
}

export default App;
