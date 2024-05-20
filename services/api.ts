import axios from 'axios';

const API_URL = 'https://6414e8c38dade07073cb2a6a.mockapi.io/api/v1/users';

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar Users:', error);
    return [];
  }
};

export const getUserById = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao carregar User:', error);
    return null;
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar User:', error);
    return null;
  }
};

export const editUser = async (userId: string, userData: any) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar User:', error);
    return null;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar User:', error);
    return null;
  }
};
