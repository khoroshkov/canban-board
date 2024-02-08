import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastNotification } from "./components/ToastNotification";
import KanbanBoard from "./components/kanban-board";
import Navbar from "./components/navbar";

import "./App.css";

const title = "Kanban Board";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastNotification>
        <Navbar header={title}></Navbar>
        <KanbanBoard />
      </ToastNotification>
    </QueryClientProvider>
  );
}

export default App;
