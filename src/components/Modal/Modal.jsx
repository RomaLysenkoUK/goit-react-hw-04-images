// eslint-disable-next-line
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export const Modal = ({ closeModal, image }) => {
 
  // const closeByEscape = e => {
  //   if (e.code === 'Escape') {
  //     closeModal();
  //   }
  // };

  const closeByBackdrop = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  useEffect(() => {
    const closeByEscape = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };
    window.addEventListener('keydown', closeByEscape);
    return () => {
      window.removeEventListener('keydown', closeByEscape);
    };
  }, [closeModal]);

    const {
      image: { src, alt },
    } = this.props;
    return (
      <div className={s.backdrop} onClick={closeByBackdrop}>
        <div className={s.modal}>
          <img src={src} alt={alt} width="1000" height="600" />
        </div>
      </div>
    );
  }


Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired
}