import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios'
import { useDebounce } from '../../hooks/useDebounce';
import './SearchPage.css'

const SearchPage = () => {
  //쿼리에서 가져온 값이 변화할 때 사용할 상태
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate()

  //url의 쿼리 정보즉 ? 이후의 주소를 가져와 저장하여 메소드를 활용한다. 
  //즉 q에 값으로 할당되어 있는 값을 가져온다. q의 값은 다른값으로 할 수 있다.
  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  let query = useQuery();
  const searchTerm = query.get("q")
  const debounceSearchTerm = useDebounce(searchTerm, 500)

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axios.get(`/search/multi?include_adult=fasle&query=${searchTerm}`)
      setSearchResults(response.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(debounceSearchTerm) {
      fetchSearchMovie(debounceSearchTerm)
    }
  }, [debounceSearchTerm])  

  if(searchResults.length > 0) {
    return (
      <section className='search-container'>
        {searchResults.map((movie) => {
          if(movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
            return (
              <div key={movie.id} className='movie'>
                <div 
                  className='movie__column-poster'
                  onClick={() => navigate(`/${movie.id}`)}
                >
                  <img 
                    src={movieImageUrl}
                    alt="movieImga"
                    className='movie__poster'
                  />
                </div>               
              </div>
            )
          } else {
            return null // Warning 해결하기위해 추가
          }
      })}
      </section>
    )
  } else {
    return (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>
            찾으려고 하는 "{debounceSearchTerm}" 에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    )
  }
}

export default SearchPage