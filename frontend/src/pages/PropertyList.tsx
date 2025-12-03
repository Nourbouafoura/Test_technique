import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { Property } from '../types/property';
import { propertyApi } from '../services/api';
import './PropertyList.css';

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    city: '',
    maxPrice: '',
    minSurface: ''
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); 

  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await propertyApi.getAll();
      setProperties(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des propriétés');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    if (filter.city && !property.city.toLowerCase().includes(filter.city.toLowerCase())) {
      return false;
    }
    if (filter.maxPrice && property.price > parseFloat(filter.maxPrice)) {
      return false;
    }
    if (filter.minSurface && property.surface < parseFloat(filter.minSurface)) {
      return false;
    }
    return true;
  });

  const totalItems = filteredProperties.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (id: string) => {
    try {
      await propertyApi.delete(id);
      setProperties(prev => prev.filter(p => p.id !== id));
      if (currentProperties.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      setError('Erreur lors de la suppression');
      console.error(err);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilter({
      city: '',
      maxPrice: '',
      minSurface: ''
    });
    setCurrentPage(1);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des propriétés...</p>
      </div>
    );
  }

  return (
    <div className="property-list-container">
      <div className="list-header">
        <h1>Liste des Propriétés ({filteredProperties.length})</h1>
        <button 
          className="btn-create animated-button"
          onClick={() => navigate('/property/new')}
        >
          + Ajouter une propriété
        </button>
      </div>

      {error && (
        <div className="error-alert">
          <p>{error}</p>
          <button onClick={fetchProperties} className="animated-button">Réessayer</button>
        </div>
      )}

      <div className="filter-section">
        <h3>Filtres</h3>
        <div className="filter-controls">
          <div className="filter-group">
            <label>Ville:</label>
            <input
              type="text"
              name="city"
              value={filter.city}
              onChange={handleFilterChange}
              placeholder="Filtrer par ville"
            />
          </div>
          
          <div className="filter-group">
            <label>Prix max (€):</label>
            <input
              type="number"
              name="maxPrice"
              value={filter.maxPrice}
              onChange={handleFilterChange}
              placeholder="Prix maximum"
              min="0"
            />
          </div>
          
          <div className="filter-group">
            <label>Surface min (m²):</label>
            <input
              type="number"
              name="minSurface"
              value={filter.minSurface}
              onChange={handleFilterChange}
              placeholder="Surface minimum"
              min="0"
            />
          </div>
          
          <button 
            className="btn-clear-filters animated-button"
            onClick={clearFilters}
          >
            Effacer les filtres
          </button>
        </div>
      </div>

      {filteredProperties.length > 0 && (
        <div className="pagination-controls">
          <div className="pagination-info">
            <span>Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, totalItems)} sur {totalItems} propriétés</span>
          </div>
          <div className="pagination-actions">
            <select 
              value={itemsPerPage} 
              onChange={handleItemsPerPageChange}
              className="page-select animated-button"
            >
              <option value="3">3 par page</option>
              <option value="6">6 par page</option>
              <option value="9">9 par page</option>
              <option value="12">12 par page</option>
            </select>
          </div>
        </div>
      )}

      {currentProperties.length === 0 ? (
        <div className="empty-state">
          <p>Aucune propriété trouvée</p>
          {(filter.city || filter.maxPrice || filter.minSurface) && (
            <button onClick={clearFilters} className="btn-clear-filters animated-button">
              Voir toutes les propriétés
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="properties-grid">
            {currentProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className={`pagination-btn ${currentPage === 1 ? 'disabled' : 'animated-button'}`}
              >
                ← Précédent
              </button>
              
              <div className="page-numbers">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => goToPage(pageNumber)}
                        className={`page-btn ${currentPage === pageNumber ? 'active' : 'animated-button'}`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                    return <span key={pageNumber} className="page-dots">...</span>;
                  }
                  return null;
                })}
              </div>
              
              <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className={`pagination-btn ${currentPage === totalPages ? 'disabled' : 'animated-button'}`}
              >
                Suivant →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyList;