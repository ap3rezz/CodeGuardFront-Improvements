export interface SolutionsResponse {
  exercise_id: string;
  solutions: { [username: string]: string };
}
