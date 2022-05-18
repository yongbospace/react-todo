import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atom";

const Li = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  align-items: center;
`;

const SpanCategory = styled.span`
  border: 1px solid ${(props) => props.theme.textColor};
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
`;

const Buttons = styled.div`
  button {
    background-color: transparent;
    color: ${(props) => props.theme.textColor};
    border: 0;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteToDo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <Li>
      <SpanCategory>{category}</SpanCategory>
      <span>{text}</span>
      <Buttons>
        {category !== Categories.TO_DO && (
          <button name={Categories.TO_DO} onClick={onClick}>
            todo
          </button>
        )}
        {category !== Categories.DOING && (
          <button name={Categories.DOING} onClick={onClick}>
            doing
          </button>
        )}
        {category !== Categories.DONE && (
          <button name={Categories.DONE} onClick={onClick}>
            done
          </button>
        )}
        <button onClick={deleteToDo}>❌</button>
      </Buttons>
    </Li>
  );
}

export default ToDo;
