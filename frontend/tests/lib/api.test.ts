import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchTasks, createTask, fetchTaskById } from "../../src/lib/api";
import type { ResponseAPI, TasksFormData } from "../../src/lib/api";
import type { Task } from "../../src/types/task";

vi.mock("axios", () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
      patch: vi.fn(),
      defaults: { baseURL: "" },
    },
  };
});

const mockedGet = axios.get as unknown as ReturnType<typeof vi.fn>;
const mockedPost = axios.post as unknown as ReturnType<typeof vi.fn>;

describe("API Service Functions (TypeScript)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should transform tag 'All' to undefined in fetchTasks params", async () => {
    const mockBackendResponse: { data: ResponseAPI } = {
      data: {
        page: 1,
        limit: 12,
        totalTasks: 0,
        totalPages: 0,
        tasks: [],
      },
    };

    mockedGet.mockResolvedValueOnce(mockBackendResponse);

    await fetchTasks("typescript", 1, 12, "All");

    expect(mockedGet).toHaveBeenCalledWith("/tasks", {
      params: {
        q: "typescript",
        tag: undefined,
        page: 1,
        perPage: 12,
      },
    });
  });

  it("should fetch task by id correctly", async () => {
    const mockTask: Task = {
      _id: "123",
      title: "Test Task",
      content: "Valid content description longer than 10",
      tag: ["Frontend"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockedGet.mockResolvedValueOnce({ data: mockTask });

    const result = await fetchTaskById("123");

    expect(mockedGet).toHaveBeenCalledWith("/tasks/123");
    expect(result).toEqual(mockTask);
  });

  it("should send correct body when creating a task", async () => {
    const newTaskData: TasksFormData = {
      title: "New TS Task",
      content: "This is a new task content description written in TS",
      tag: ["Frontend"],
    };

    const mockCreatedTask: Task = {
      ...newTaskData,
      _id: "777",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockedPost.mockResolvedValueOnce({ data: mockCreatedTask });

    const result = await createTask(newTaskData);

    expect(mockedPost).toHaveBeenCalledWith("/tasks", newTaskData);
    expect(result).toHaveProperty("_id", "777");
    expect(result.title).toBe(newTaskData.title);
  });
});
