// import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

export const Searchbar = ({ onSubmit, isLoading, error, gallery }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  const notify = () =>
    toast.warn('Did not find anything! Please change the request.');

  return (
    <header className="searchbar">
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.submit} onClick={notify}>
          <BsSearch />
        </button>
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
          value={searchQuery}
        />
      </form>
      {isLoading && !error && gallery.length < 1 && <ToastContainer />}
    </header>
  );
};

Searchbar.propTypes = {
  gallery: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
