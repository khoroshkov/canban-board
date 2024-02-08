import axios, { AxiosResponse } from "axios";

const createTaskUrl: string = "/tasks";

export const createNewTask = async (
  taskName: string,
): Promise<AxiosResponse> => {
  return await axios.post(createTaskUrl, { name: taskName });
};
