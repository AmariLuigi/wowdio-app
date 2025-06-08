// TypeScript interfaces for core entities
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
}

export interface AudioJob {
  id: string;
  projectId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  audioUrl?: string;
}

export interface VoiceData {
  id: string;
  userId: string;
  sampleUrl: string;
  createdAt: string;
}

// Mock data
const users: User[] = [
  { id: 'u1', name: 'Alice', email: 'alice@example.com', avatarUrl: '/avatars/alice.png' },
  { id: 'u2', name: 'Bob', email: 'bob@example.com', avatarUrl: '/avatars/bob.png' },
];

const projects: Project[] = [
  { id: 'p1', name: 'Podcast Project', ownerId: 'u1', createdAt: '2024-06-01T10:00:00Z' },
  { id: 'p2', name: 'Audiobook Project', ownerId: 'u2', createdAt: '2024-06-02T12:00:00Z' },
];

const audioJobs: AudioJob[] = [
  { id: 'j1', projectId: 'p1', status: 'completed', createdAt: '2024-06-03T09:00:00Z', completedAt: '2024-06-03T10:00:00Z', audioUrl: '/audio/j1.mp3' },
  { id: 'j2', projectId: 'p2', status: 'processing', createdAt: '2024-06-04T11:00:00Z' },
];

const voiceData: VoiceData[] = [
  { id: 'v1', userId: 'u1', sampleUrl: '/voices/v1.wav', createdAt: '2024-06-01T15:00:00Z' },
  { id: 'v2', userId: 'u2', sampleUrl: '/voices/v2.wav', createdAt: '2024-06-02T16:00:00Z' },
];

// Mock async API functions
export async function fetchUsers(): Promise<User[]> {
  await delay(200);
  return users;
}

export async function fetchProjects(): Promise<Project[]> {
  await delay(200);
  return projects;
}

export async function fetchAudioJobs(projectId?: string): Promise<AudioJob[]> {
  await delay(200);
  return projectId ? audioJobs.filter(j => j.projectId === projectId) : audioJobs;
}

export async function fetchVoiceData(userId?: string): Promise<VoiceData[]> {
  await delay(200);
  return userId ? voiceData.filter(v => v.userId === userId) : voiceData;
}

// Utility to simulate network delay
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
} 