import { Request, Response } from 'express';
import { PropertyService } from '../services/property.service';
import { createPropertySchema, updatePropertySchema } from '../schemas/property.schema';

const propertyService = new PropertyService();

export class PropertyController {
  async getAll(req: Request, res: Response) {
    try {
      const properties = propertyService.findAll();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const property = propertyService.findById(id);
      
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const validation = createPropertySchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          error: 'Validation error', 
          details: validation.error.issues 
        });
      }

      const property = propertyService.create(validation.data);
      res.status(201).json(property);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const validation = updatePropertySchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: 'Validation error', 
          details: validation.error.issues 
        });
      }

      const updatedProperty = propertyService.update(id, validation.data);
      
      if (!updatedProperty) {
        return res.status(404).json({ error: 'Property not found' });
      }
      
      res.json(updatedProperty);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = propertyService.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Property not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}