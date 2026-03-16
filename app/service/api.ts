import db from "../../public/db.json";
import { BlogPost, Course } from "@/types/schema";

export const getAllCourses = async () => {
  return db.courses;
};

export const getCategories = async () => {
  return db.categories;
};

export const getCourseById = async (id: string) => {
  const course = db.courses.find((c) => c.id === id);
  return course || null;
};

export const getAllBlogs = async (): Promise<BlogPost[]> => {
  return db.blogs as unknown as BlogPost[];
};

export const getBlogById = async (id: string): Promise<BlogPost> => {
  const blog = db.blogs.find((b) => b.id === id);
  if (!blog) throw new Error("Failed to fetch blog post");
  return blog as unknown as BlogPost;
};