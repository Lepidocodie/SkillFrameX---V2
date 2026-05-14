import { Lesson } from "./schema";


export class LessonModel {
  private readonly raw: Lesson;
  private readonly _isCompleted: boolean;

  constructor(raw: Lesson, isCompleted: boolean) {
    this.raw = raw;
    this._isCompleted = isCompleted;
  }

  get id(): string {
    return this.raw.id;
  }

  get title(): string {
    return this.raw.title;
  }

  get duration(): string {
    return this.raw.duration || "15 min";
  }

  get isCompleted(): boolean {
    return this._isCompleted;
  }

  /** Convenience: build a LessonModel array from a raw lesson list + completed IDs. */
  static fromList(lessons: Lesson[], completedIds: string[]): LessonModel[] {
    const completed = new Set(completedIds);
    return lessons.map((l) => new LessonModel(l, completed.has(l.id)));
  }
}
