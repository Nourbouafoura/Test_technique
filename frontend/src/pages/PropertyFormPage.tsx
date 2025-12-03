import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropertyForm from '../components/PropertyForm';
import { CreatePropertyDto, UpdatePropertyDto, Property } from '../types/property';
import { propertyApi } from '../services/api';
import './PropertyFormPage.css';

const PropertyFormPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchProperty(id);
    }
  }, [id]);

  const fetchProperty = async (propertyId: string) => {
    try {
      setLoading(true);
      const data = await propertyApi.getById(propertyId);
      setProperty(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement de la propriété');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: CreatePropertyDto | UpdatePropertyDto) => {
    try {
      setSubmitting(true);
      setError(null);

      if (isEditMode && id) {
        await propertyApi.update(id, formData);
      } else {
        await propertyApi.create(formData as CreatePropertyDto);
      }

      navigate('/');
    } catch (err: any) {
      console.error('Erreur lors de la sauvegarde:', err);
      
      if (err.response?.data?.details) {
        const validationErrors: { [key: string]: string } = {};
        err.response.data.details.forEach((issue: any) => {
          validationErrors[issue.path[0]] = issue.message;
        });
        setError('Erreurs de validation');
      } else {
        setError('Erreur lors de la sauvegarde');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="form-page-container">
      <div className="form-page-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Retour
        </button>
        <h1>{isEditMode ? 'Modifier la propriété' : 'Nouvelle propriété'}</h1>
      </div>

      {error && (
        <div className="error-alert">
          <p>{error}</p>
        </div>
      )}

      <div className="form-page-content">
        <PropertyForm
          initialData={property || undefined}
          onSubmit={handleSubmit}
          isLoading={submitting}
        />
      </div>
    </div>
  );
};

export default PropertyFormPage;