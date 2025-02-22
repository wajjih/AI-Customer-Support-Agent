import { NextResponse } from "next/server";

// Example data
const EXAMPLE_DATA = [
  {
    id: 1,
    title: "Server-side Rendering",
    description:
      "Next.js automatically renders pages on the server for better performance.",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "API Routes",
    description:
      "Create API endpoints using file-system routing in the app/api directory.",
    createdAt: "2024-01-02T00:00:00.000Z",
  },
  {
    id: 3,
    title: "Data Fetching",
    description:
      "Use React Server Components to fetch data directly on the server.",
    createdAt: "2024-01-03T00:00:00.000Z",
  },
];

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return NextResponse.json(EXAMPLE_DATA);
}
