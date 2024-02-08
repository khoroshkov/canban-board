import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "src/api/tasks";
import { Task, stagesNames } from "src/models";

export type GetTasksResponse = {
  data?: Task[];
  status: number;
  statusText: string;
};

export const useGetTasks = () => {
  const { isLoading, data, error, refetch } = useQuery<GetTasksResponse, unknown>({
    queryKey: ["getAllTasks"],
    queryFn: getAllTasks,
  });

  let stagesTasks: Task[][] = [];

  if (data?.data) {
    stagesTasks = Array.from({length: stagesNames.length}, () => []);

    for (const task of data.data) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }
  }

  return { isLoading, tasks: stagesTasks, error, refetch };
};
