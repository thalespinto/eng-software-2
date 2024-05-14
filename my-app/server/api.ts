import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const createSession = async (cpf: string, senha: string) => {
  try {
    const response = await api.post("/user/login", { cpf, senha });
    console.log("API Response:", response);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios Error Response:", error.response);
      return error.response?.data;
    }
    throw error;
  }
};
