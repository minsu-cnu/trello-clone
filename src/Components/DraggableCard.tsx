import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { IToDo, toDoState } from "../atoms";

const Card = styled.div<{ $isDragging: boolean }>`
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.$isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.$isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

const DeleteCard = styled.button`
  padding: 0;
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DraggableCard({
  toDoId,
  toDoText,
  index,
  boardId,
}: IDraggableCardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const onDelete = (toDoId: number) => {
    setToDos((allBoards) => {
      const targetToDo = allBoards[boardId].filter(
        (board) => board.id !== toDoId
      );
      const newBoards = { ...allBoards, [boardId]: targetToDo };
      localStorage.setItem("toDo", JSON.stringify(newBoards));
      return newBoards;
    });
  };
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          $isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
          <DeleteCard onClick={() => onDelete(toDoId)}>X</DeleteCard>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
