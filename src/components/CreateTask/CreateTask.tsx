import React, { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { createNewTask } from "src/api/createTask.ts";
import { useGetTasks } from "src/hooks/useGetTasks.ts";
import { errorMessage } from "src/utils/errorMessage.ts";

export const CreateTask = () => {
  const [newTask, setNewTask] = useState<string>("");
  const { refetch } = useGetTasks();

  const { mutateAsync, status } = useMutation({
    mutationFn: createNewTask,
    onError: (error: AxiosError) => {
      toast.error(
        errorMessage({
          status: error.response.status,
          message: error.response.data,
        }),
      );
    },
    onSuccess: (data) => {
      toast.success(`Task ${data?.data?.name} successfully created`);
      setNewTask("");
      refetch();
    },
  });

  const handleTaskInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      if (inputValue.trim().length !== 0) {
        setNewTask(inputValue);
      } else {
        setNewTask('')
      }
    },
    [],
  );

  const handleCreateNewTask = useCallback((e) => {
    e.preventDefault();
    if (newTask) {
      mutateAsync(newTask);
    }
  }, [newTask, mutateAsync]);

  return (
    <form  onSubmit={handleCreateNewTask}className="mt-50 layout-row align-items-center justify-content-center">
      <input
        id="create-task-input"
        type="text"
        className="large"
        placeholder="New task name"
        data-testid="create-task-input"
        value={newTask}
        onChange={handleTaskInput}
      />
      <button
        type="submit"
        className="ml-30"
        data-testid="create-task-button"
        disabled={status === "pending"}
      >
        Create task
      </button>
    </form>
  );
};
