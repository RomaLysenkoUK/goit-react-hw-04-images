import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Gallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleFormSubmit = query => {
    setSearchQuery(query);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <Gallery searchQuery={searchQuery} />
    </>
  );
};
