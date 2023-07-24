import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "../atoms";

const Form = styled.form`
  padding: 0 10px;
  width: 100%;

  input {
    width: 100%;
  }
`;

interface IForm {
  toDo: string;
}

interface ICreateToDo {
  boardId: string;
}

function CreateToDo({ boardId }: ICreateToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      const newBoards = {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
      localStorage.setItem("toDo", JSON.stringify(newBoards));
      return newBoards;
    });
    setValue("toDo", "");
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", { required: true })}
        type="text"
        placeholder={`Add task on ${boardId}`}
      />
    </Form>
  );
}

export default CreateToDo;
