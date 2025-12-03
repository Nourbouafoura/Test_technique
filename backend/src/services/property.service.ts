import { Property, CreatePropertyDto, UpdatePropertyDto } from '../types/property';

const properties: Property[] = require('../data/properties.json');

export class PropertyService {
  findAll(): Property[] {
    return properties;
  }

  findById(id: string): Property | undefined {
    return properties.find(p => p.id === id);
  }

  create(data: CreatePropertyDto): Property {
    const newProperty: Property = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    properties.push(newProperty);
    return newProperty;
  }

  update(id: string, data: UpdatePropertyDto): Property | null {
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProperty = {
      ...properties[index],
      ...data,
      updatedAt: new Date()
    };

    properties[index] = updatedProperty;
    return updatedProperty;
  }

  delete(id: string): boolean {
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) return false;

    properties.splice(index, 1);
    return true;
  }
}