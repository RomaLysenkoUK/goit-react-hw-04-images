import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Gallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = query => {
    setSearchQuery(query);
  };

  const stateUpdate = (gallery, isLoading, error) => {
    setGallery(gallery);
    setIsLoading(isLoading);
    setError(error);
  };

  return (
    <>
      <Searchbar
        onSubmit={handleFormSubmit}
        gallery={gallery}
        isLoading={isLoading}
        error={error}
      />
      <Gallery searchQuery={searchQuery} onUpdate={stateUpdate} />
    </>
  );
};
