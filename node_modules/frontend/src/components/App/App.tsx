import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import Tasks from "../../pages/Tasks/Tasks";
import TaskDetails from "../../pages/TaskDetails/TaskDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/tasks/:id" element={<TaskDetails />} />
    </Routes>
  );
}
