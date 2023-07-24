import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "../atoms";

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  padding: 0 10px;
  width: 100%;

  input {
    width: 50%;
  }
`;

interface IForm {
  boardName: string;
}

function CreateBoard() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ boardName }: IForm) => {
    setToDos((allBoards) => {
      const newBoards = { ...allBoards, [boardName]: [] };
      localStorage.setItem("toDo", JSON.stringify(newBoards));
      return newBoards;
    });
    setValue("boardName", "");
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("boardName", { required: true })}
        type="text"
        placeholder={`Add board`}
      />
    </Form>
  );
}

export default CreateBoard;
