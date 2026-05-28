import { beforeAll, afterAll, afterEach } from "vitest";
import mongoose from "mongoose";

beforeAll(async () => {
  const mongoUri = process.env.VITE_API_URL
    ? "mongodb://localhost:27017/todo-test"
    : "mongodb://localhost:27017/todo-test";

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
