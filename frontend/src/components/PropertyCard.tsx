import React from 'react';
import { Property } from '../types/property';
import { useNavigate } from 'react-router-dom';
import './PropertyCard.css';

interface PropertyCardProps {
  property: Property;
  onDelete?: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onDelete }) => {
  const navigate = useNavigate();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="property-card">
      <div className="property-card-header">
        <h3 className="property-title">{property.title}</h3>
        <span className="property-city">{property.city}</span>
      </div>
      
      <div className="property-card-content">
        <div className="property-price">{formatPrice(property.price)}</div>
        <div className="property-surface">{property.surface} m²</div>
        {property.description && (
          <p className="property-description">{property.description}</p>
        )}
        <div className="property-dates">
          <small>Ajouté le {formatDate(property.createdAt)}</small>
        </div>
      </div>
      
      <div className="property-card-actions">
        <button 
          className="btn btn-view"
          onClick={() => navigate(`/property/${property.id}`)}
        >
          Voir détails
        </button>
        <button 
          className="btn btn-edit"
          onClick={() => navigate(`/property/edit/${property.id}`)}
        >
          Modifier
        </button>
        {onDelete && (
          <button 
            className="btn btn-delete"
            onClick={() => {
              if (window.confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
                onDelete(property.id);
              }
            }}
          >
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;