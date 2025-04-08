import { IUser } from "../components/interfaces/interfaces";

// Detecta si estás en Electron
declare global {
  interface Window {
    process?: {
      type?: string;
    };
  }
}

const isElectron = Boolean(
  typeof process !== "undefined" &&
  process.versions &&
  process.versions.electron
);

// Si estás en Electron, usá rutas relativas. Si no, usá el backend local (desarrollo).
const API_URL = isElectron ? "" : "http://localhost:3001";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// 🔐 PROTEGIDA
export const getAllUsers = async (): Promise<IUser[]> => {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Error al obtener usuarios");
  return response.json();
};

export const getUserById = async (id: number): Promise<IUser> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

export const getUserByIosfa = async (iosfa: number): Promise<IUser> => {
  const response = await fetch(`${API_URL}/users/iosfa/${iosfa}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

export const getUserByDni = async (dni: number): Promise<IUser> => {
  const response = await fetch(`${API_URL}/users/dni/${dni}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

export const getUserByApellido = async (apellido: string): Promise<IUser[]> => {
  const response = await fetch(`${API_URL}/users/apellido/${apellido}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

export const getUserByGrado = async (grado: string): Promise<IUser[]> => {
  const response = await fetch(`${API_URL}/users/grado/${grado}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

export const getUserByCurso = async (curso: string): Promise<IUser[]> => {
  const response = await fetch(`${API_URL}/users/curso/${curso}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

export const createUser = async (userData: IUser) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });

  if (!response.ok) throw new Error("Error al crear el usuario");
  return response.json();
};

export const updateUser = async (id: number, userData: IUser) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });

  if (!response.ok) throw new Error("Error al actualizar el usuario");
  return response.json();
};

export const deleteUser = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Error al eliminar el usuario");
  return response.json();
};
