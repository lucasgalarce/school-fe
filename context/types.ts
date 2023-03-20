export type CourseType = {
  id: number;
  name: string;
  students?: Student[];
};

export interface Courses {
  courses: CourseType[];
}

export type CreateCourseType = {
  name: string;
};

export type Student = {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  siblings?: Student[];
};

export interface Students {
  students: Student[];
}

export type CreateStudentType = {
  firstname: string;
  lastname: string;
  gender: string;
  age: number | null;
  courseId: number | undefined;
};
