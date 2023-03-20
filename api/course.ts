import { AxiosResponse } from "axios";
import { instance as api } from "./index";
import { CourseType, CreateCourseType } from "../context/types";

const apiHost = process.env.NEXT_PUBLIC_API_HOST ?? "";
const base = apiHost + "/courses";

export const fetchCourses = async (name: string | undefined) => {
  let url = base;
  if (name) url += `?name=${name}`;
  const response: AxiosResponse<CourseType[]> = await api.get(`${url}`);

  return response.data;
};

export const fetchCourse = async (id: unknown) => {
  const response: AxiosResponse = await api.get(`${base}/${id}`);

  return response.data;
};

export const createCourse = async (data: CreateCourseType) => {
  const response = await api.post(base, { ...data });

  return response.data;
};
