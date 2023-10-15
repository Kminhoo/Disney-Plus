const requests = {
  fetchNowplaying: '/movie/now_playing',
  fetchTrending: '/trending/all/week',
  fetchTopRated: '/movie/top_rated',
  fetchActionMoives: '/discover/movie?with_genres=28',
  fetchComedyMovies: '/discover/movie?with_genres=35',
  fetchHorroMovies: '/discover/movie?with_genres=27',
  fetchRomaceMovies: '/discover/movie?with_genres=10749',
  fetchDocumentaries: '/discover/movie?width_genres=99'
}

//서버요청으로 가져올 url의 쿼리 상세 부분을 작성한 리퀘스트 객체 데이터

export default requests