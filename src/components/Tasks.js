import React, { useEffect, useState, useRef, forwardRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineUser } from "react-icons/ai";
import { getTasks, getUsers, deleteTask, updateTask } from "../redux";
import Fuse from "fuse.js";
import Modal from "react-modal";
import Users from "./Users";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  max-width: 700px;
  margin: auto;
  padding: 1rem;
`;

const TasksContainer = styled.ul`
  width: 100%;
  list-style-type: none;

  .item-container {
    background-color: white;
    width: 100%;
    padding: 1.5em;
    border-radius: 1rem;
    box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.15);
    margin-bottom: 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .content {
      width: 100%;
    }

    .icons {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const SubContent = styled.div`
  display: flex;
  align-items: "space-between";

  .priority {
    font-size: 0.8rem;
    margin-right: 1em;
  }
  .due_date {
    font-size: 0.8rem;
  }
`;

const Content = styled.input`
  border: none;
  outline: none;
  width: 50%;
  font-size: ${(props) => (props.readOnly ? "1.02rem" : "1.2rem")};
  margin-bottom: 0.5em;
`;

const IconContainer = styled.button`
  padding: 0.6rem;
  display: flex;
  outline: none;
  border: none;
  justify-content: center;
  align-items: center;
  margin-left: 1em;
  border-radius: 50%;
  background-color: black;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 0.7rem;
    margin-left: 0.8em;
  }
`;

const SaveBtn = styled.button`
  background-color: gray;
  padding: 0.8em;
  border-radius: 0.8rem;
  outline: none;
  border: none;
  color: white;
`;

const AssignTo = styled.p`
  padding: 0em 0.5em;
  border: 1px solid gray;
  border-radius: 2rem;
  font-size: 0.8rem;
`;

const ResultTitlt = styled.p`
  padding: 0.5rem 1rem;
  font-weight: "300";
`;

const Task = forwardRef((props, ref) => {
  const {
    id,
    message,
    priority,
    due_date,
    asigned_to,
    assign_name,
    deleteTaskHandler,
    openModal,
    provided,
  } = props;
  const [taskMessage, setTaskMessage] = useState(message);
  const [editable, setEditable] = useState(true);
  const titleRef = useRef(null);
  const dispatch = useDispatch();
  const handleEdit = () => {
    setEditable(false);
    titleRef.current.focus();
  };

  const updateHandler = () => {
    const data = {
      message: taskMessage,
      id,
      priority,
      due_date,
      asigned_to,
    };
    dispatch(updateTask(data));
    setEditable(true);
  };

  return (
    <li
      className="item-container"
      ref={ref}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="content">
        <Content
          ref={titleRef}
          readOnly={editable}
          value={taskMessage}
          onChange={(e) => setTaskMessage(e.target.value)}
          onBlur={updateHandler}
        />
        <SubContent>
          {assign_name && <AssignTo>{assign_name}</AssignTo>}
        </SubContent>
      </div>
      <div className="icons">
        {editable ? (
          <IconWrapper>
            <IconContainer onClick={handleEdit}>
              <AiOutlineEdit
                onClick={handleEdit}
                className="icon"
                size="16"
                color="white"
              />
            </IconContainer>
            <p className="label">Edit</p>
          </IconWrapper>
        ) : (
          <SaveBtn onClick={updateHandler}>Update</SaveBtn>
        )}
        <IconWrapper>
          <IconContainer onClick={() => openModal(id)}>
            <AiOutlineUser className="icon" size="16" color="white" />
          </IconContainer>
          <p className="label">AssignTo</p>
        </IconWrapper>
        <IconWrapper>
          <IconContainer onClick={() => deleteTaskHandler(id)}>
            <AiOutlineDelete className="icon" size="16" color="white" />
          </IconContainer>
          <p className="label">Delete</p>
        </IconWrapper>
      </div>
    </li>
  );
});

export default function Tasks(props) {
  const { searchQuery, order } = props;
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [assignTaskId, setAssignTaskId] = useState(null);
  const [finalTasks, setFinalTasks] = useState(tasks);
  const [searchCount, setSearchCount] = useState(0);

  const openModal = (id) => {
    setAssignTaskId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const sortList = (arr) => {
      if (order === "false") {
        return arr.sort((a, b) => a.priority - b.priority);
      } else if (order === "true") {
        return arr.sort((a, b) => b.priority - a.priority);
      }
    };
    if (searchQuery) {
      const fuse = new Fuse(tasks, { keys: ["message"] });
      const result = fuse.search(searchQuery);
      const formatResult = result.map((res) => res.item);
      const sortedResult = sortList(formatResult);
      setFinalTasks(sortedResult);
      setSearchCount(sortedResult.length);
    } else {
      const resultList = sortList(tasks);
      setFinalTasks(resultList);
    }
  }, [tasks, order, searchQuery]);

  const deleteTaskHandler = (id) => {
    dispatch(deleteTask(id));
  };

  const handleUser = (userId, userName) => {
    const task = tasks.filter((task) => task.id === assignTaskId);
    dispatch(
      updateTask({ ...task[0], assign_to: userId, assign_name: userName })
    );
    closeModal();
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleDrag = (result) => {
    if (!result.destination) return;
    const items = Array.from(finalTasks);
    const [reOrderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reOrderedItem);
    setFinalTasks(items);
  };

  return (
    <>
      {searchQuery && (
        <ResultTitlt>
          {searchCount} result Found for "{searchQuery}"
        </ResultTitlt>
      )}
      <DragDropContext onDragEnd={handleDrag}>
        <Container>
          <Droppable direction="vertical" droppableId="droppable">
            {(provided) => (
              <TasksContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {loading ? (
                  <p>loading..</p>
                ) : (
                  finalTasks.map((task, index) => {
                    return (
                      <Draggable
                        key={task.id}
                        draggableId={`${index}`}
                        index={index}
                        disableInteractiveElementBlocking={true}
                      >
                        {(provided) => (
                          <>
                            <Task
                              className="task"
                              index={index}
                              {...task}
                              ref={provided.innerRef}
                              provided={provided}
                              openModal={openModal}
                              deleteTaskHandler={deleteTaskHandler}
                            />
                            {provided.placeholder}
                          </>
                        )}
                      </Draggable>
                    );
                  })
                )}
              </TasksContainer>
            )}
          </Droppable>
        </Container>
      </DragDropContext>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <Users handleUser={handleUser} />
      </Modal>
    </>
  );
}
