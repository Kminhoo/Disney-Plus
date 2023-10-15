import axios from '../api/axios'
import React, { useState, useEffect, useCallback } from 'react'
import './Row.css'
import MovieInfo from './MovieModal/MovieInfo'
import styled from 'styled-components'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'

//swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Container = styled.div`
  padding: 0 0 26px;
`

const Content = styled.div``

const Wrap = styled.div`
 width: 95%;
 heigth: 95%;
 padding-top: 56.25%;
 border-radius: 10px;
 box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
             rgb(0 0 0 / 73%) 0px 16px 10px -10px;
 cursor: pointer;
 overflow: hidden;
 position: relative;
 transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
 border: 3px solid rgba(249, 249, 249, 0.1);

 img {
  inset: 0px;
  display: block;
  height: 100%;
  object-fit: cover;
  opacity: 1;
  position: absolute;
  transition: opacity 500ms ease-in-out 0s;
  width: 100%;
  z-index: 1;
  // top: 0;
 }

 &:hover {
  box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
              rgb(0 0 0 / 72%) 0px 30px 22px -10px;
  transform: scale(0.98);
  border-color: rgba(249, 249, 249, 0.8)
 }
`

const Row = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]) //영화 정보 상태
  const [modalOpen, setModalOpen] = useState(false) //Modal 상태
  const [movieSelected, setMovieSelection] = useState({}) // 선택한 영화의 상태

  // 컴포넌트가 렌더링 될때마다 함수도 다시 실행되는데 그럴필요가 없을 때마다 useCallBack hook을 사용
  // 두번째 인자로 fecthUrl 이 변경될 때마다 useCallback을 통해 함수를 실행한다는 의미
  const fetchMovieData = useCallback(async () => {
    const res = await axios.get(fetchUrl)
    setMovies(res.data.results)
    return res
  }, [fetchUrl])
  
  useEffect(() => {
    fetchMovieData()
  }, [fetchMovieData])

  const handleClick = (movie) => {
    setModalOpen(true)
    setMovieSelection(movie)
  }

  return (
    <Container>
      <h2>{title}</h2>

      <Swiper 
        //install swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        loop={true} //use loop
        navigation={true} // arrow btn use
        pagination={{ clickable: true}} //page btn use
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3
          },
        }}
      >
        <Content id={id}>
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Wrap>
                  <img 
                    // 리엑트 key프롭은 리스트의 최상위에 주어져야 한다. 그래서 img에 있던 키를 swiperslide로 할당
                    // className='row__poster' 기존의 row.css 사용. 삭제
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    alt={movie.name}
                    onClick={() => handleClick(movie)}
                  />
                </Wrap>
              </SwiperSlide>
            ))}
        </Content>

      </Swiper>

      {modalOpen && 
        <MovieInfo 
          movieInfo={movieSelected}
          setModalOpen={setModalOpen} 
        />
      }
    </Container>
  )
}

export default Row