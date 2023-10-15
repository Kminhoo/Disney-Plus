import axios from "axios"; 
//fetch함수처럼 서버에 데이터를 요청하는 라이브러리

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3', //중복되는 url 부분
  params: {
    api_key: 'eadc39a38f88a953a906547dce75a48c', // 발급받은 apikey
    language: 'ko-KR' //언어 선택
  }
}) //인스턴스를 생성하여 서버요청시 사용되는 url을 생략할 수 있다.

export default instance

//fetch함수보다 axios를 사용하는 이유는 fetch는 받아온 데이터를 .json() 사용해 변환해주어야 하지만
//axios는 자동으로 변환 또한 중복되는 서버요청 url들을 생략할 수 있다는 장점이 있으며
//실무에서도 많이 사용되는 라이브러리이다.