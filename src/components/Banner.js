import axios from '../api/axios'
import React, { useState, useEffect } from 'react'
import request from '../api/request'
import styled from 'styled-components'
import './Banner.css'

const Container  = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: colimn;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;



const Banner = () => {
  //영화 데이터 상태
  const [movie, setMovie] = useState([])
  // 비디오 영상 재생 유무 상태
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])
  
  const fetchData = async () => {

    // 영화 데이터 가져오기
    const response =  await axios.get(request.fetchNowplaying)
    
    // 가져온 데이터에서 랜덤한 영화 데이터의 id값만을 가져오기
    const movieId = response.data.results[
      Math.floor(Math.random() * response.data.results.length)
    ].id

    // id정보를 기반으로 더 상세한 영화 정보 가져오기(비디오 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" }
    })
    setMovie(movieDetail)
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + '...' : str
  }

  if(isClicked) {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}
              ?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
              width="640"
              height="360"
              frameborder="0"
              allow="autoplay; fullscreen"
            >
            </Iframe>
          </HomeContainer>
        </Container>
        <button onClick={() => {setIsClicked(false)}}>
          X
        </button>
      </>
    )
  } else {
    return (
      <header 
        className='banner' 
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover"
        }}>
          {/* {console.log(movie)} */}
          <div className='banner__contents'>
  
            <h1 className='banner__title'>
              {movie.title || movie.name || movie.original_name}
            </h1>
  
            <div className='banner__buttons'>
              {movie?.videos?.results[0]?.key &&
                <button className='banner__button play'
                        onClick={() => {setIsClicked(true)}}
                >
                  Play
                </button>
              }
            </div>
  
            <p className='banner__description'>
              {truncate(movie.overview, 100)}
            </p>
          </div>
          <div className='banner--fadeBottom'/>
      </header>
    )
  }
};

export default Banner