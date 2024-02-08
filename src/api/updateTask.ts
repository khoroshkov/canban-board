import axios, { AxiosResponse } from "axios";

const updateTaskUrl: string = "/tasks";

type UpdateTaskProps = {
  taskName: string;
  taskStage: number;
};

export const updateTask = async ({
  taskName,
  taskStage,
}: UpdateTaskProps): Promise<AxiosResponse> => {
  return await axios.put(`${updateTaskUrl}/${taskName}`, {
    stage: taskStage,
  });
};
