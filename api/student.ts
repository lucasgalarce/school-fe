import { AxiosResponse } from "axios";
import { instance as api } from "./index";
import { Student, CreateStudentType } from "../context/types";

const apiHost = process.env.NEXT_PUBLIC_API_HOST ?? "";
const base = apiHost + "/students";

export const fetchStudents = async (name: string | undefined) => {
  let url = base;
  if (name) url += `?name=${name}`;
  const response: AxiosResponse<Student> = await api.get(`${url}`);

  return response.data;
};

export const fetchCourse = async (id: unknown) => {
  const response: AxiosResponse = await api.get(`${base}/${id}`);

  return response.data;
};

export const createStudent = async (data: CreateStudentType) => {
  const response = await api.post(base, { ...data });

  return response.data;
};
