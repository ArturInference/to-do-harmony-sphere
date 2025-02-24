
import { useState } from "react";
import { Task, Priority } from "../types/todo";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Flag } from "lucide-react";
import { format } from "date-fns";

interface TodoInputProps {
  onAddTask: (task: Task) => void;
}

const TodoInput = ({ onAddTask }: TodoInputProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      priority,
      dueDate,
      createdAt: new Date(),
    };

    onAddTask(newTask);
    setTitle("");
    setPriority("medium");
    setDueDate(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-[42px] p-0 ${
                priority === "high"
                  ? "text-red-500"
                  : priority === "medium"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              <Flag className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-2">
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500"
                onClick={() => setPriority("high")}
              >
                <Flag className="mr-2 h-4 w-4" />
                High Priority
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-yellow-500"
                onClick={() => setPriority("medium")}
              >
                <Flag className="mr-2 h-4 w-4" />
                Medium Priority
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-green-500"
                onClick={() => setPriority("low")}
              >
                <Flag className="mr-2 h-4 w-4" />
                Low Priority
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-[42px] p-0 ${dueDate ? "text-primary" : ""}`}
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={setDueDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button type="submit">Add</Button>
      </div>
    </form>
  );
};

export default TodoInput;
