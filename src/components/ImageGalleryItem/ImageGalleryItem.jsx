/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export const GalleryItem = ({
  openModal,
  webformatURL,
  tags,
  largeImageURL,
}) => {
  return (
    <li className={s.itemGallery}>
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
  openModal: PropTypes.func.isRequired,
};
