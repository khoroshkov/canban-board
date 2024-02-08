import axios, { AxiosResponse } from "axios";

const getAllTasksUrl: string = "/tasks";

export const getAllTasks = async (): Promise<AxiosResponse> => {
  const headers = {
    "Content-Type": "application/json",
  };

  return await axios.get(getAllTasksUrl, { headers });
};
