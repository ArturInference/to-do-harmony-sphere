
import { useState } from "react";
import TodoList from "../components/TodoList";
import TodoInput from "../components/TodoInput";
import TodoFilters from "../components/TodoFilters";
import { Task } from "../types/todo";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [search, setSearch] = useState("");

  const addTask = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8 animate-slide-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-semibold text-gray-800">Tasks</h1>
          <p className="text-gray-500">Organize your day with elegance</p>
        </div>
        
        <div className="glass-card rounded-lg p-6 space-y-6">
          <TodoInput onAddTask={addTask} />
          <TodoFilters
            filter={filter}
            onFilterChange={setFilter}
            search={search}
            onSearchChange={setSearch}
          />
          <TodoList
            tasks={filteredTasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
