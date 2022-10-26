import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { axiosPicture } from '../../Services/picture-api';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ButtonPagination } from 'components/Button/Button';
import { Modal } from '../Modal/Modal';
import ThreeDots from '../Loader/Loader';
import s from './ImageGallery.module.css';
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Gallery = ({ searchQuery }) => {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [currentImage, setCurrentImage] = useState(null);
  const ref = useRef(null);
  const refPage = useRef(null);

  const notify = () => {
    toast.warn('Did not find anything! Please change the request.');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        let pictureData;

        if (searchQuery !== '' && ref.current !== searchQuery) {
          pictureData = await axiosPicture(searchQuery);
          setPage(1);
          setGallery(pictureData);
          ref.current = searchQuery;
        }

        if (page !== 1 && page !== refPage.current) {
          const pictureDataNextPage = await axiosPicture(searchQuery, page);
          setGallery(prevgallery => [...prevgallery, ...pictureDataNextPage]);
          refPage.current = page;
        }
        if (pictureData?.length === 0) {
          notify();
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, searchQuery]);

  const pagination = e => {
    e.preventDefault();
    setPage(prevState => prevState + 1);
  };
  const updateCurrentImage = data => {
    setCurrentImage(data);
  };
  const closeModal = () => {
    setCurrentImage(null);
  };

  return (
    <>
      {error && (
        <span className={s.error}>Oops! Something went wrong. {error}</span>
      )}
      {!isLoading && !error && gallery.length === 0 && <ToastContainer />}

      <ul className={s.gallery}>
        {!!gallery.length &&
          gallery.map(item => (
            <GalleryItem
              {...item}
              key={item.id}
              openModal={updateCurrentImage}
            />
          ))}
      </ul>
      {isLoading && <ThreeDots />}
      {!!gallery.length && gallery.length >= page * 12 && (
        <ButtonPagination pagination={pagination} />
      )}

      {currentImage && <Modal image={currentImage} closeModal={closeModal} />}
    </>
  );
};

Gallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
