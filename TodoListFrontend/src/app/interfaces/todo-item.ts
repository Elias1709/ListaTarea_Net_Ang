export interface TodoItem {
  id: number;
  title: string;
  description: string;
  maxCompletionDate: string;
  isCompleted: boolean;
  createdAt?: string;
}