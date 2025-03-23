import { IUser } from "../components/interfaces/interfaces"; 

const API_URL = 'http://localhost:3001'; 

export const getAllUsers = async (): Promise<IUser[]> => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) throw new Error('Error al obtener usuarios');
  return response.json();
};

export const getUserById = async (id: number): Promise<IUser> => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) throw new Error('Usuario no encontrado');
  return response.json();
};

export const getUserByIosfa = async (iosfa: number): Promise<IUser> => {
  const response = await fetch(`${API_URL}/users/iosfa/${iosfa}`);
  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

export const getUserByDni = async (dni: number): Promise<IUser> => {
  const response = await fetch(`${API_URL}/users/dni/${dni}`);
  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

export const getUserByApellido = async (apellido: string): Promise<IUser[]> => {
  const response = await fetch(`${API_URL}/users/apellido/${apellido}`);
  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json(); // ← debe ser array de usuarios
};

export const getUserByGrado = async (grado: string): Promise<IUser[]> => {
  const response = await fetch(`${API_URL}/users/grado/${grado}`);
  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

export const getUserByCurso = async (curso: string): Promise<IUser[]> => {
  const response = await fetch(`${API_URL}/users/curso/${curso}`);
  if (!response.ok) throw new Error("Usuario no encontrado");
  return response.json();
};

export const createUser = async (userData: IUser) => {
  console.log('Datos del usuario:', userData);
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Error al crear el usuario');
  return response.json();
};


export const updateUser = async (id: number, userData: IUser) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Error al actualizar el usuario');
  return response.json();
};

export const deleteUser = async (id: number) => {
  console.log(id)
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar el usuario');
  return response.json();
};

