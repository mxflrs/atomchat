export interface Task {
  id?: string;
  title: string;
  description: string;
  createdAt: Date | { _seconds: number; _nanoseconds: number };
  completed: boolean;
  userEmail: string;
}
