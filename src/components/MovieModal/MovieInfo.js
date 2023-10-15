import React, { useRef } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside';
import './MovieInfo.css'

const MovieInfo = ({ movieInfo, setModalOpen }) => {

  const ref = useRef();
  
  useOnClickOutside(ref, () => {
    setModalOpen(false)
  })

  return (
    <div className='presentation' role="presentation">
      <div className='wrapper-modal'>
        <div className='modal' ref={ref} >

          <span 
            onClick={() => {setModalOpen(false)}}
            className="modal-close"
          >
            X
          </span>

          <img 
            className='modal__poster-img'
            src={`https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path}`}
            alt='modal-img'
          />

          <div className='modal__content'>
            <p className='modal__details'>
              <span className='modal__user-perc'>
                100% for you
              </span>{" "}
              {movieInfo.release_date ? movieInfo.release_date : movieInfo.first_air_date}
            </p>
            <h2 className='modal__title'>{movieInfo.title ? movieInfo.title : movieInfo.name}</h2>
            <p className='modal__overview'>평점: {movieInfo.vote_average}</p>
            <p className='modal__overview'>{movieInfo.overview}</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default MovieInfo