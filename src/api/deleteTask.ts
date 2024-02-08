import axios, { AxiosResponse } from "axios";

const deleteTaskUrl: string = "/tasks";

export const deleteTask = async (taskName: string): Promise<AxiosResponse> => {
  return await axios.delete(`${deleteTaskUrl}/${taskName}`);
};
