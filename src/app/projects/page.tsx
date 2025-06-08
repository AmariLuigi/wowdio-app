"use client";
import { fetchProjects, Project } from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

export default function ProjectsPage() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
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
          {projects?.map((project) => (
            <tr key={project.id} className="border-t">
              <td className="p-2 font-medium">{project.name}</td>
              <td className="p-2">{project.ownerId}</td>
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
    </main>
  );
} 