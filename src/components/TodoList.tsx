
import { Task } from "../types/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Flag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TodoListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TodoList = ({ tasks, onToggleTask, onDeleteTask }: TodoListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks found
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="space-y-2">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-200 ${
              task.completed ? "bg-gray-50" : "glass-card"
            }`}
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleTask(task.id)}
              className="transition-transform duration-200 hover:scale-110"
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-medium ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>
                <Flag
                  className={`h-3 w-3 ${
                    task.priority === "high"
                      ? "text-red-500"
                      : task.priority === "medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                />
              </div>
              {task.dueDate && (
                <span className="text-xs text-gray-500">
                  Due: {format(task.dueDate, "PPP")}
                </span>
              )}
            </div>

            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default TodoList;
