import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    members: [],
  });

  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  const load = async () => {
    try {
      const projectRes = await API.get("/projects");
      setProjects(projectRes.data);

      const taskRequests = projectRes.data.map((p) =>
        API.get(`/tasks/${p._id}`),
      );
      const taskResults = await Promise.all(taskRequests);
      setTasks(taskResults.flatMap((r) => r.data));

      const userRes = await API.get("/users");
      setUsers(userRes.data);
    } catch (err) {
      console.error("LOAD ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (!user) {
      nav("/login");
      return;
    }
    load();
  }, [user]);

  const createProject = async () => {
    if (!form.name) return alert("Project name required");

    try {
      console.log("SENDING:", form);

      await API.post("/projects", form);

      setForm({
        name: "",
        description: "",
        members: [],
      });

      load();
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.msg || "Error creating project");
    }
  };

  const toggleMember = (id) => {
    if (form.members.includes(id)) {
      setForm({
        ...form,
        members: form.members.filter((m) => m !== id),
      });
    } else {
      setForm({
        ...form,
        members: [...form.members, id],
      });
    }
  };

  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.status === "done").length,
    pending: tasks.filter((t) => t.status !== "done").length,
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow p-4 rounded">
          Total Tasks: {stats.total}
        </div>
        <div className="bg-green-100 p-4 rounded">Done: {stats.done}</div>
        <div className="bg-red-100 p-4 rounded">Pending: {stats.pending}</div>
      </div>

      {user?.role === "admin" && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-bold mb-2">Create Project</h2>

          {/* NAME */}
          <input
            className="input"
            placeholder="Project Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="input"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="border p-2 rounded max-h-40 overflow-y-auto">
            <p className="font-semibold mb-2">Select Members:</p>

            {users.length === 0 && (
              <p className="text-gray-500 text-sm">No users found</p>
            )}

            {users.map((u) => (
              <label key={u._id} className="block text-sm">
                <input
                  type="checkbox"
                  value={u._id}
                  checked={form.members.includes(u._id)}
                  onChange={() => toggleMember(u._id)}
                  className="mr-2"
                />
                {u.name} ({u.email})
              </label>
            ))}
          </div>

          <button
            onClick={createProject}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
          >
            Create Project
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.length === 0 ? (
          <p>No projects available</p>
        ) : (
          projects.map((p) => (
            <ProjectCard
              key={p._id}
              project={p}
              onClick={() => nav(`/project/${p._id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}
