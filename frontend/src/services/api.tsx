import axios from 'axios';
import { Property, CreatePropertyDto, UpdatePropertyDto } from '../types/property';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const propertyApi = {
  getAll: async (): Promise<Property[]> => {
    const response = await api.get('/');
    return response.data;
  },

  getById: async (id: string): Promise<Property> => {
    const response = await api.get(`/get/${id}`);
    return response.data;
  },

  create: async (data: CreatePropertyDto): Promise<Property> => {
    const response = await api.post('/create', data);
    return response.data;
  },

  update: async (id: string, data: UpdatePropertyDto): Promise<Property> => {
    const response = await api.put(`/update/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/delete/${id}`);
  },

 
};