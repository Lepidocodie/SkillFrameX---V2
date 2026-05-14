import db from "../../public/db.json";
import { Course } from "@/types/schema";


export class CourseService {
  static async getAllCourses(): Promise<Course[]> {
    return (db.courses as Course[]) ?? [];
  }

  static async getCategories(): Promise<string[]> {
    return db.categories ?? [];
  }

  static async getCourseById(id: string): Promise<Course | null> {
    const course = (db.courses as Course[]).find((c) => c.id === id);
    return course ?? null;
  }
}
