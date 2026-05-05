import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router-dom";
import TaskCard from "../components/TaskCard";

export default function ProjectDetails() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const load = () => {
    API.get(`/tasks/${id}`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    load();
  }, [id]);

  const updateTask = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, { status });
      load();
    } catch (err) {
      console.error(err);
    }
  };

  const createTask = async () => {
    if (!form.title) {
      return alert("Title required");
    }

    try {
      await API.post("/tasks", { ...form, projectId: id });
      setForm({
        title: "",
        description: "",
        dueDate: "",
      });
      load();
    } catch (err) {
      alert(err.response?.data?.msg || "Error creating task");
    }
  };

  return (
    <div>
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold mb-2">Add Task</h2>

        <div className="flex gap-2">
          <input
            className="input"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            className="input"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="date"
            className="input"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />

          <button
            onClick={createTask}
            className="bg-green-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>

      <h2 className="font-bold mb-4">Tasks</h2>

      {tasks.length === 0 && <p className="text-gray-500">No tasks yet</p>}

      {tasks.map((t) => (
        <TaskCard key={t._id} task={t} onUpdate={updateTask} />
      ))}
    </div>
  );
}
