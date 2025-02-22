"use server";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

// Simulated database data
const MOCK_TODOS: Todo[] = [
  { id: 1, title: "Learn Next.js", completed: false },
  { id: 2, title: "Build a project", completed: true },
  { id: 3, title: "Write documentation", completed: false },
];

export async function fetchTodos() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return MOCK_TODOS;
}

export async function toggleTodo(id: number) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real app, this would update the database
  const todo = MOCK_TODOS.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
  return MOCK_TODOS;
}

export async function createTodo(title: string) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real app, this would create a new todo in the database
  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false,
  };

  MOCK_TODOS.push(newTodo);
  return MOCK_TODOS;
}
