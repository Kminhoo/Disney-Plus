import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../api/axios'

const DetailPage = () => {
  let { movieId } = useParams(); //let movied = useParms().movieId 를 줄인것

  const [movie, setmovie] = useState({})

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/movie/${movieId}`)
      setmovie(response.data)
      console.log('response', response) //지울 내용
    }
    fetchData()
  }, [movieId])
  

  if(!movie) return null

  return (
    <section>
      <img
        className='modal__poster-img'
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt='modal-poster-img' 
      />
    </section>
  )
}

export default DetailPage