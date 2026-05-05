export default function TaskCard({ task, onUpdate }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-3">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>

      <select
        value={task.status}
        onChange={(e) => onUpdate(task._id, e.target.value)}
        className="mt-3 border p-2 rounded w-full"
      >
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}
