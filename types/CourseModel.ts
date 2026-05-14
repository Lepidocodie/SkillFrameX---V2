import { Course } from "./schema";


export class CourseModel {
  private readonly raw: Course;
  private readonly _completedLessons: ReadonlySet<string>;
  private readonly _enrolledCourses: ReadonlySet<string>;

  constructor(
    raw: Course,
    completedLessons: string[],
    enrolledCourses: string[]
  ) {
    this.raw = raw;
    this._completedLessons = new Set(completedLessons);
    this._enrolledCourses = new Set(enrolledCourses);
  }

  // ── Identity ────────────────────────────────────────────────────────────────

  get id(): string {
    return this.raw.id;
  }

  get name(): string {
    return this.raw.name;
  }

  get description(): string {
    return this.raw.description;
  }

  get category(): string {
    return this.raw.category;
  }

  get image(): string {
    return this.raw.image;
  }

  /** Raw lessons array — pass to child components that need the full list. */
  get lessons() {
    return this.raw.coursesDtl ?? [];
  }

  get firstLessonId(): string | undefined {
    return this.raw.coursesDtl?.[0]?.id;
  }

  // ── Enrollment ──────────────────────────────────────────────────────────────

  get isEnrolled(): boolean {
    return this._enrolledCourses.has(this.raw.id);
  }

  // ── Progress ────────────────────────────────────────────────────────────────

  get totalLessons(): number {
    return this.lessons.length;
  }

  get completedCount(): number {
    return this.lessons.filter((l) => this._completedLessons.has(l.id)).length;
  }

  /**
   * 0–100 integer. The single authoritative formula across the entire app.
   * Returns 0 when not enrolled or when there are no lessons.
   */
  get progress(): number {
    if (!this.isEnrolled || this.totalLessons === 0) return 0;
    return Math.round((this.completedCount / this.totalLessons) * 100);
  }

  get isCompleted(): boolean {
    return this.isEnrolled && this.progress === 100;
  }

  get isInProgress(): boolean {
    return this.isEnrolled && this.progress < 100;
  }

  // ── Search & Filter ─────────────────────────────────────────────────────────

  /**
   * Case-insensitive search across name, description, category, and lesson titles.
   * An empty term always matches.
   */
  matchesSearch(term: string): boolean {
    if (term === "") return true;
    const t = term.toLowerCase();
    return (
      this.raw.name?.toLowerCase().includes(t) ||
      this.raw.description?.toLowerCase().includes(t) ||
      this.raw.category?.toLowerCase().includes(t) ||
      this.lessons.some((l) => l.title?.toLowerCase().includes(t))
    );
  }

  /** "All" always matches; otherwise exact category comparison. */
  matchesCategory(category: string): boolean {
    return category === "All" || this.raw.category === category;
  }

  // ── Serialisation (for places that still need a plain object) ───────────────

  /**
   * Returns a plain object compatible with CourseCard's `course` prop,
   * including the `progress` and `totalLessons` fields it uses.
   */
  toCardProps(): Course & { progress: number; totalLessons: number } {
    return {
      ...this.raw,
      progress: this.progress,
      totalLessons: this.totalLessons,
    };
  }
}
