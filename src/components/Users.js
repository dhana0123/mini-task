import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 12rem;
  height: 20rem;
`;

const UserContainer = styled.button`
  width: 100%;
  padding: 0.9em;
  background: white;
  outline: none;
  border: none;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  &:hover {
    color: white;
    background: black;
  }

  .profile-img {
    object-fit: cover;
  }
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const Name = styled.p`
  font-size: 1rem;
  text-align: left;
`;

const User = ({ userId, name, handleUser }) => {
  return (
    <UserContainer onClick={() => handleUser(userId, name)}>
      <Name>{name}</Name>
    </UserContainer>
  );
};

export default function Users({ handleUser }) {
  const { users } = useSelector((state) => state.tasks);

  return (
    <Container>
      <Title>Assign Task</Title>
      {users.map((user) => (
        <User
          key={user.id}
          name={user.name}
          userId={user.id}
          handleUser={handleUser}
        />
      ))}
    </Container>
  );
}
