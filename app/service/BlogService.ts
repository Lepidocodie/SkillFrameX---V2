import db from "../../public/db.json";
import { BlogPost } from "@/types/schema";


export class BlogService {
  static async getAll(): Promise<BlogPost[]> {
    return (db.blogs as unknown as BlogPost[]) ?? [];
  }

  static async getById(id: string): Promise<BlogPost | null> {
    const blog = (db.blogs as unknown as BlogPost[]).find((b) => b.id === id);
    return blog ?? null;
  }
}
