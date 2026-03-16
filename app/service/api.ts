// Check this URL! It must match your backend server's address.
// Common ports are 8080, 5000, or 3001.

import { BlogPost } from "@/types/schema";
// Use Environment Variable for Production, fallback to localhost for development
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"; 

export const getAllCourses = async () => {
  try {
    const response = await fetch(`${API_URL}/courses`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    // Return an empty array so the app doesn't crash
    return [];
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};
  export const getCourseById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/courses/${id}`);
    if (!response.ok) throw new Error("Failed to fetch course");
    return await response.json();
  } catch (error) {
    console.error(`Error fetching course ${id}:`, error);
    return null;
  }
};
// ฟังก์ชันใหม่สำหรับ Blog
export const getAllBlogs = async (): Promise<BlogPost[]> => {
  const res = await fetch(`${API_URL}/blogs`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

export const getBlogById = async (id: string): Promise<BlogPost> => {
  const res = await fetch(`${API_URL}/blogs/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch blog post");
  return res.json();
};