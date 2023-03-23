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
  age: number | string;
  courseId: number | undefined;
};

export type AuthValuesType = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  logout: () => void;
  isInitialized: boolean;
  user: any;
  setUser: (value: any) => void;
  setIsInitialized: (value: boolean) => void;
  login: (params: LoginParams) => void;
};

export type LoginParams = {
  email: string;
  password: string;
};
