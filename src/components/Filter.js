import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
  width: 40%;
  margin-top: 2rem;
  h3 {
    margin-bottom: 2rem;
  }
`;

const FilterContainer = styled.div`
  padding: 1.2rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 0px 3px rgba(0, 0, 0, 0.2);
  width: 90%;
  margin: auto;

  .search-input {
    width: 100%;
    height; 3rem;
    border: 1px solid gray;
    outline: none;
    padding: 1em;
    border-radius: 1em;
    font-size: 1rem;
    margin-bottom: 1em;
  }

  .select {
    width: 100%;
    height: 3rem;
    outline: none;
    padding: 1em;
    border-radius: 1rem;
    border: none;
    background: black;
    color: white;
  }
`;

const Option = styled.option`
  padding: 1rem;
`;

export default function Filter(props) {
  const { setSearchQuery, setOrder, searchQuery, order } = props;
  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOptions = (e) => {
    setOrder(e.target.value);
  };

  return (
    <Container>
      <FilterContainer>
        <h3>Filter</h3>
        <input
          className="search-input"
          value={searchQuery}
          placeholder="Search"
          onChange={handleSearchQuery}
        />
        <select className="select" value={order} onChange={handleOptions}>
          <Option value={"true"}>Low Priority</Option>
          <Option value={"false"}>High Priority</Option>
        </select>
      </FilterContainer>
    </Container>
  );
}
