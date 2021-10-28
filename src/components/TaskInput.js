import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createTask } from "../redux/actions";

const Container = styled.div`
  max-width: 700px;
  margin: auto;
  padding: 1rem;
  margin-top: 2rem;
`;
const InputContainer = styled.div`
  padding: 1rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  min-height: 5rem;
  border-radius: 1rem;
  border: 1px solid #d2d2d2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: 75%;
  height: 4rem;
  padding: 1em;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  outline: none;
`;
const Btn = styled.button`
  padding: 1em 2em;
  background-color: black;
  border-radius: 3rem;
  border: none;
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    border: 1px solid black;
    background: transparent;
    .btnText {
      color: black;
    }
  }
`;

const BtnText = styled.p`
  color: white;
  font-size: 1.02rem;
`;

const Button = ({ onClick }) => {
  return (
    <Btn onClick={onClick}>
      <BtnText className="btnText">Add Task</BtnText>
    </Btn>
  );
};

export default function TaskInput() {
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState(1);
  const dispatch = useDispatch();

  const handleTask = (event) => {
    setMessage(event.target.value);
  };

  const createTaskHandler = () => {
    const date = new Date();
    const data = {
      message,
      priority,
      date,
    };
    if (message === "") return;
    dispatch(createTask(data));
    setMessage("");
  };

  return (
    <Container>
      <InputContainer>
        <Input
          value={message}
          onChange={handleTask}
          type="text"
          rows="5"
          maxLength="450"
          formNoValidate
          placeholder="Write task here."
        />
        <Button onClick={createTaskHandler} />
      </InputContainer>
    </Container>
  );
}
