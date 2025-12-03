export interface Property {
  id: string;
  title: string;
  city: string;
  price: number;
  surface: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreatePropertyDto = Omit<Property, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePropertyDto = Partial<CreatePropertyDto>;