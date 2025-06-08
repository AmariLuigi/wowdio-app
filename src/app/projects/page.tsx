"use client";
import { fetchProjects, fetchUsers, Project, User } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function ProjectsPage() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
  const { data: users } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Local state for modal and projects
  const [showModal, setShowModal] = useState(false);
  const [localProjects, setLocalProjects] = useState<Project[] | undefined>(undefined);

  // Form state
  const [form, setForm] = useState({ name: "", ownerId: users?.[0]?.id || "" });
  const [formError, setFormError] = useState("");

  // Use local projects if any, else fetched
  const projectList = localProjects ?? projects;

  function getOwnerInfo(ownerId: string) {
    const owner = users?.find((u) => u.id === ownerId);
    return owner ? `${owner.name} (${owner.email})` : ownerId;
  }

  function openModal() {
    setForm({ name: "", ownerId: users?.[0]?.id || "" });
    setFormError("");
    setShowModal(true);
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setFormError("Project name is required");
      return;
    }
    if (!form.ownerId) {
      setFormError("Owner is required");
      return;
    }
    const newProject: Project = {
      id: `p${Date.now()}`,
      name: form.name,
      ownerId: form.ownerId,
      createdAt: new Date().toISOString(),
    };
    setLocalProjects([...(projectList ?? []), newProject]);
    setShowModal(false);
  }

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={openModal}
        >
          + New Project
        </button>
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading projects.</div>}
      <table className="min-w-full border border-gray-200 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Owner</th>
            <th className="p-2 text-left">Created</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectList?.map((project) => (
            <tr key={project.id} className="border-t">
              <td className="p-2 font-medium">{project.name}</td>
              <td className="p-2">{getOwnerInfo(project.ownerId)}</td>
              <td className="p-2">{new Date(project.createdAt).toLocaleDateString()}</td>
              <td className="p-2">
                <button className="text-blue-600 hover:underline mr-2">View</button>
                <button className="text-gray-600 hover:underline mr-2">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Project</h2>
            <form onSubmit={handleCreate}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Project Name</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Owner</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  name="ownerId"
                  value={form.ownerId}
                  onChange={handleFormChange}
                  required
                >
                  <option value="" disabled>Select owner</option>
                  {users?.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>
              {formError && <div className="text-red-600 mb-2">{formError}</div>}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
} 