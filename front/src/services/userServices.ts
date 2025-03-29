import { IUser } from "../components/interfaces/interfaces"; 

const API_URL = 'http://localhost:3001'; 

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

// 🔐 PROTEGIDA
export const getUserById = async (id: number): Promise<IUser> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

// 🔐 PROTEGIDA
export const getUserByIosfa = async (iosfa: number): Promise<IUser> => {
  const response = await fetch(`${API_URL}/users/iosfa/${iosfa}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

// 🔐 PROTEGIDA
export const getUserByDni = async (dni: number): Promise<IUser> => {
  const response = await fetch(`${API_URL}/users/dni/${dni}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

// 🔐 PROTEGIDA
export const getUserByApellido = async (apellido: string): Promise<IUser[]> => {
  const response = await fetch(`${API_URL}/users/apellido/${apellido}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

// 🔐 PROTEGIDA
export const getUserByGrado = async (grado: string): Promise<IUser[]> => {
  const response = await fetch(`${API_URL}/users/grado/${grado}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

// 🔐 PROTEGIDA
export const getUserByCurso = async (curso: string): Promise<IUser[]> => {
  const response = await fetch(`${API_URL}/users/curso/${curso}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

// 🔐 PROTEGIDA
export const createUser = async (userData: IUser) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });

  if (!response.ok) throw new Error("Error al crear el usuario");
  return response.json();
};

// 🔐 PROTEGIDA
export const updateUser = async (id: number, userData: IUser) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });

  if (!response.ok) throw new Error("Error al actualizar el usuario");
  return response.json();
};

// 🔐 PROTEGIDA
export const deleteUser = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Error al eliminar el usuario");
  return response.json();
};
