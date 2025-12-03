import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Property } from '../types/property';
import { propertyApi } from '../services/api';
import './PropertyDetail.css';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      setError('Propriété non trouvée');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !property) return;
    
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      try {
        await propertyApi.delete(id);
        navigate('/');
      } catch (err) {
        setError('Erreur lors de la suppression');
        console.error(err);
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement de la propriété...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="error-container">
        <h2>{error || 'Propriété non trouvée'}</h2>
        <button onClick={() => navigate('/')}>Retour à la liste</button>
      </div>
    );
  }

  return (
    <div className="property-detail-container">
      <div className="detail-header">
        <button className="btn-back" onClick={() => navigate('/')}>
          ← Retour
        </button>
        <div className="header-actions">
          <button 
            className="btn-edit"
            onClick={() => navigate(`/property/edit/${property.id}`)}
          >
            Modifier
          </button>
          <button 
            className="btn-delete"
            onClick={handleDelete}
          >
            Supprimer
          </button>
        </div>
      </div>

      <div className="property-detail-card">
        <div className="detail-main">
          <div className="detail-header-info">
            <h1>{property.title}</h1>
            <div className="property-location">
              <span className="city-badge">{property.city}</span>
              <span className="price-badge">{formatPrice(property.price)}</span>
            </div>
          </div>

          <div className="property-stats">
            <div className="stat-item">
              <span className="stat-label">Surface</span>
              <span className="stat-value">{property.surface} m²</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Prix au m²</span>
              <span className="stat-value">
                {formatPrice(Math.round(property.price / property.surface))}
              </span>
            </div>
          </div>

          {property.description && (
            <div className="property-description">
              <h3>Description</h3>
              <p>{property.description}</p>
            </div>
          )}

          <div className="property-dates">
            <div className="date-info">
              <span>Créée le:</span>
              <strong>{formatDate(property.createdAt)}</strong>
            </div>
            <div className="date-info">
              <span>Dernière modification:</span>
              <strong>{formatDate(property.updatedAt)}</strong>
            </div>
          </div>
        </div>

        <div className="detail-actions">
          <button 
            className="btn-action btn-primary"
            onClick={() => navigate(`/property/edit/${property.id}`)}
          >
            Modifier cette propriété
          </button>
          <button 
            className="btn-action btn-secondary"
            onClick={() => navigate('/')}
          >
            Voir toutes les propriétés
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;