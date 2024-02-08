import React, { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { deleteTask, updateTask } from "src/api";
import { errorMessage } from "src/utils/errorMessage";
import { useGetTasks } from "src/hooks/useGetTasks.ts";
import { Task, stagesNames } from "src/models";

type TasksBoardProps = {
  tasks: Task[][];
};

export const TasksBoard = ({ tasks }: TasksBoardProps) => {
  const { refetch } = useGetTasks();

  const { mutateAsync, status } = useMutation({
    mutationFn: deleteTask,
    onError: (error: AxiosError) => {
      toast.error(
        errorMessage({
          status: error.response.status,
          message: error.response.data,
        }),
      );
    },
    onSuccess: () => {
      toast.success("Task successfully deleted");
      refetch();
    },
  });

  const { mutateAsync: updateTaskMutate } = useMutation({
    mutationFn: updateTask,
    onError: (error: AxiosError) => {
      toast.error(
        errorMessage({
          status: error.response.status,
          message: error.response.data,
        }),
      );
    },
    onSuccess: () => {
      toast.success("Task successfully updated");
      refetch();
    },
  });

  const handleDeleteTask = useCallback(
    (value: string) => {
      mutateAsync(value);
    },
    [mutateAsync],
  );

  const handleMoveForward = useCallback(
    (value: string, stage: number) => {
      updateTaskMutate({ taskName: value, taskStage: stage + 1 });
    },
    [updateTaskMutate],
  );

  const handleMoveBack = useCallback(
    (value: string, stage: number) => {
      updateTaskMutate({ taskName: value, taskStage: stage - 1 });
    },
    [updateTaskMutate],
  );

  return (
    <div className="mt-50 layout-row wrap gp-20">
      {tasks.map((tasksItem, i) => {
        return (
          <div className="card outlined mb-10 mt-0" key={`${i}`}>
            <div className="card-text">
              <h4>{stagesNames[i]}</h4>
              <ul className="styled mt-50" data-testid={`stage-${i}`}>
                {tasksItem.map((task, index) => {
                  return (
                    <li className="slide-up-fade-in" key={`${i}${index}`}>
                      <div className="li-content layout-row justify-content-between align-items-center">
                        <span
                          data-testid={`${task.name.split(" ").join("-")}-name`}
                        >
                          {task.name}
                        </span>
                        <div className="icons">
                          <button
                            className="icon-only x-small mx-2"
                            data-testid={`${task.name
                              .split(" ")
                              .join("-")}-back`}
                            disabled={task.stage === 0}
                            onClick={() =>
                              handleMoveBack(task.name, task.stage)
                            }
                          >
                            <i className="material-icons">arrow_back</i>
                          </button>
                          <button
                            className="icon-only x-small mx-2"
                            data-testid={`${task.name
                              .split(" ")
                              .join("-")}-forward`}
                            onClick={() =>
                              handleMoveForward(task.name, task.stage)
                            }
                            disabled={task.stage === stagesNames.length - 1}
                          >
                            <i className="material-icons">arrow_forward</i>
                          </button>
                          <button
                            className="icon-only danger x-small mx-2"
                            data-testid={`${task.name
                              .split(" ")
                              .join("-")}-delete`}
                            onClick={() => handleDeleteTask(task.name)}
                            disabled={status === "pending"}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};
