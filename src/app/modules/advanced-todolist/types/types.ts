export interface TodoItem {
  id: number;
  datetime: Date;
  text: string;
  completed: boolean;
  extra?: string;
}