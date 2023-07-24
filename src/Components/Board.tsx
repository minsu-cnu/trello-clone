import { Droppable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import DraggableCard from "./DraggableCard";
import { atom, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  padding-top: 0;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const Area = styled.div<IAreaProps>`
  flex-grow: 1;
  padding: 20px;
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "#b2bec3"
      : props.$draggingFromThisWith
      ? "#dfe6e9"
      : "transparent"};
  transition: background-color 0.3s ease-in-out;
`;

interface IAreaProps {
  $isDraggingOver: boolean;
  $draggingFromThisWith: boolean;
}

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <CreateToDo boardId={boardId} />
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            $isDraggingOver={info.isDraggingOver}
            $draggingFromThisWith={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
                boardId={boardId}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
