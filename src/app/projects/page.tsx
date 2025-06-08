"use client";
import { fetchProjects, fetchUsers, Project, User } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

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

  // Add state for confirmation modal
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

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

  function handleDelete(projectId: string) {
    setConfirmDeleteId(projectId);
  }

  function confirmDelete() {
    if (confirmDeleteId) {
      setLocalProjects((prev) => (prev ?? projectList)?.filter((p) => p.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    }
  }

  function cancelDelete() {
    setConfirmDeleteId(null);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-white">
      <div className="w-full max-w-5xl mx-auto px-4 pt-12">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Projects</h1>
          <ShimmerButton onClick={openModal}>+ New Project</ShimmerButton>
        </div>
        {isLoading && (
          <div className="flex justify-center items-center h-40 text-lg text-gray-500">Loading projects...</div>
        )}
        {error && (
          <div className="flex justify-center items-center h-40 text-lg text-red-600">Error loading projects.</div>
        )}
        {!isLoading && !error && (!projectList || projectList.length === 0) && (
          <div className="flex flex-col items-center justify-center h-60 text-gray-400 text-lg">
            No projects found. Create your first project!
          </div>
        )}
        {projectList && projectList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
            {projectList.map((project) => (
              <MagicCard key={project.id} className="p-0 shadow-md rounded-2xl bg-white border border-gray-100">
                <div className="p-6 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold mb-1">{project.name}</h2>
                  <div className="text-sm text-gray-500 mb-2">
                    Owner: <span className="font-medium">{getOwnerInfo(project.ownerId)}</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-4">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <ShimmerButton className="px-3 py-1 text-sm">View</ShimmerButton>
                    <ShimmerButton className="px-3 py-1 text-sm">Edit</ShimmerButton>
                    <ShimmerButton
                      className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </ShimmerButton>
                  </div>
                </div>
              </MagicCard>
            ))}
          </div>
        )}
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Create Project</h2>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 font-medium">Project Name</label>
                <input
                  className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Owner</label>
                <select
                  className="w-full border rounded px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
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
              {formError && <div className="text-red-600 mb-2 text-center">{formError}</div>}
              <div className="flex justify-end gap-2 mt-2">
                <ShimmerButton
                  type="button"
                  className="px-4 py-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </ShimmerButton>
                <ShimmerButton type="submit" className="px-4 py-2">
                  Create
                </ShimmerButton>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Confirmation Modal for Delete */}
      <ConfirmationModal
        open={!!confirmDeleteId}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </main>
  );
} 