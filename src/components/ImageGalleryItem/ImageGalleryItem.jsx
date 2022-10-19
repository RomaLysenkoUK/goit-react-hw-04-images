/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export const GalleryItem = ({
  openModal,
  id,
  webformatURL,
  tags,
  largeImageURL,
}) => {
  return (
    <li key={id} className={s.itemGallery}>
      <a
        href="#"
        onClick={() => {
          openModal({ src: largeImageURL, alt: tags });
        }}
        rel="noreferrer"
      >
        <img className={s.image} src={webformatURL} alt={tags} width="350" />
      </a>
    </li>
  );
};

GalleryItem.propTypes = {
  gallery: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
