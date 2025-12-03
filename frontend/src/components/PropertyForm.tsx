import React, { useState, useEffect } from 'react';
import { CreatePropertyDto, UpdatePropertyDto } from '../types/property';
import './PropertyForm.css';

interface PropertyFormProps {
  initialData?: CreatePropertyDto | UpdatePropertyDto;
  onSubmit: (data: CreatePropertyDto | UpdatePropertyDto) => void;
  isLoading?: boolean;
  errors?: { [key: string]: string };
}

const PropertyForm: React.FC<PropertyFormProps> = ({ 
  initialData, 
  onSubmit, 
  isLoading = false,
  errors = {}
}) => {
  const [formData, setFormData] = useState<CreatePropertyDto>({
    title: '',
    city: '',
    price: 0,
    surface: 0,
    description: ''
  });

  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (initialData) {
      setFormData((prev: CreatePropertyDto) => ({  
        ...prev,
        ...initialData
      }));
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev: CreatePropertyDto) => ({  
      ...prev,
      [name]: name === 'price' || name === 'surface' ? parseFloat(value) || 0 : value
    }));

    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'La ville est requise';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Le prix doit être positif';
    }

    if (formData.surface <= 0) {
      newErrors.surface = 'La surface doit être positive';
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getError = (field: string): string => {
    return validationErrors[field] || errors[field] || '';
  };

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Titre *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={getError('title') ? 'error' : ''}
          placeholder="Ex: Belle maison avec jardin"
        />
        {getError('title') && <span className="error-message">{getError('title')}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="city">Ville *</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={getError('city') ? 'error' : ''}
          placeholder="Ex: Paris"
        />
        {getError('city') && <span className="error-message">{getError('city')}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Prix (€) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price || ''}
            onChange={handleChange}
            className={getError('price') ? 'error' : ''}
            min="0"
            step="1"
            placeholder="350"
          />
          {getError('price') && <span className="error-message">{getError('price')}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="surface">Surface (m²) *</label>
          <input
            type="number"
            id="surface"
            name="surface"
            value={formData.surface || ''}
            onChange={handleChange}
            className={getError('surface') ? 'error' : ''}
            min="0"
            step="1"
            placeholder="75"
          />
          {getError('surface') && <span className="error-message">{getError('surface')}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          rows={4}
          placeholder="Décrivez la propriété..."
        />
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="btn-submit"
          disabled={isLoading}
        >
          {isLoading ? 'Chargement...' : initialData ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;