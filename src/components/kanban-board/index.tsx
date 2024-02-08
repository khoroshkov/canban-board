import React from "react";
import { useGetTasks } from "/src/hooks/useGetTasks.ts";

import { Loader } from "src/components/Loader";
import { CreateTask } from "src/components/CreateTask";
import { ErrorPlaceholder } from "src/components/ErrorPlaceholder";
import { TasksBoard } from "./TasksBoard";

import "./index.css";

const KanbanBoard = () => {
  const { isLoading, tasks, error } = useGetTasks();

  return (
    <div className="mt-20 layout-column justify-content-center align-items-center">
      <CreateTask />

      {isLoading && <Loader />}

      {!isLoading && Boolean(tasks.length) && <TasksBoard tasks={tasks} />}

      {!isLoading && error && <ErrorPlaceholder />}
    </div>
  );
};

export default KanbanBoard;
