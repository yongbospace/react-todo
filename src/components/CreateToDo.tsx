import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, IToDo, toDoState } from "../atom";

const InputToDo = styled.input`
  width: 140px;
`;
const InputCategory = styled.input`
  width: 80px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border: 0;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
`;

interface IForm {
  toDo: string;
  category?: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue<IToDo["category"]>(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo, category: custom }: IForm) => {
    setToDos((oldToDos) => [
      {
        text: toDo,
        id: Date.now(),
        category: (custom as IToDo["category"]) || category,
      },
      ...oldToDos,
    ]);
    setValue("toDo", "");
    setValue("category", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      {category === Categories.CUSTOM ? (
        <InputCategory
          {...register("category", {
            required: "Please write a Category",
          })}
          placeholder="Category"
        />
      ) : (
        ""
      )}
      <InputToDo
        {...register("toDo", { required: "Please write a To Do" })}
        placeholder="Write a to do"
      />
      <Button>Add</Button>
    </form>
  );
}

export default CreateToDo;
