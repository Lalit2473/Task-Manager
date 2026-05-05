export default function ProjectCard({ project, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-5 rounded shadow hover:shadow-lg transition cursor-pointer"
    >
      <h2 className="text-lg font-bold">{project.name}</h2>
      <p className="text-gray-600 mt-2">{project.description}</p>
    </div>
  );
}
