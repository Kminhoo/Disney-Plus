import React, { useEffect, useState } from 'react'
import styled  from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";


const NavWrapper = styled.nav`
position: fixed;
top: 0;
left: 0;
right: 0;
height: 70px;
background-color: ${props => props.show ? '#090b13' : 'transparent'};
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 36px;
letter-spacing: 16px;
z-index: 3;
`

const Logo = styled.a`
padding: 0;
width: 80px;
margin-top: 4px;
max-height: 70px;
font-size: 0;
display: inline-block;
img {
  display: block;
  width: 100%;
  cursor: pointer;
}
`

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all .2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }
`

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px 10px;
  border: none;
  outline: none;
`
const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 131, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display; flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`



const Nav = () => {
  // Nav 의 scrollY 위치를 감지하는 상태 높이 이상 커지면 값이 변하는 상태
  const [show, setShow] = useState(false)

  // Input 을 통해 검색되는 영화 사애 정보
  const [searchVale, setSearchValue] = useState("")

  const initialUserData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {}

  const [userData, setUserData] = useState(initialUserData)

  // url의 path 부분의 이름을 가져온다
  const { pathname } = useLocation()

  // 검색에 따라 경로를 이동시켜준다
  const navigate = useNavigate()

  const auth = getAuth()
  const provider = new GoogleAuthProvider()

  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUserData({}); //userData 초기화
      navigate('/') // login page 이동
    }).catch((error) => {console.log(error)})
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        if(pathname === '/') {
          navigate('/main')
        }
      } else {
        navigate('/')
      }
    })
  }, [auth, navigate, pathname])

  // 스크롤 y 변화에 따른 상태 변화 함수
  const handleScroll = () => {
    if(window.scrollY > 50) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  // input 값이 변함에 따라 상태를 변화하는 함수
  const inputChange = (e) => {
    setSearchValue(e.target.value)
    navigate(`/search?q=${e.target.value}`)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  //firebase 구글 로그인
  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user)
        localStorage.setItem('userData', JSON.stringify(result.user))
      })
      .catch(error => console.log(error))
  }
  
  return (
    //eslint-disable-next-line react/jsx-boolean-value
    <NavWrapper show={show}>
      <Logo>
        <img 
          alt='Disney Plus Logo'
          src='/images/logo.svg'
          onClick={() => {window.location.href = "/"}}
        />
      </Logo>
      {pathname === '/' 
        ? (<Login onClick={handleAuth}>Login</Login>) : 
        <>
          <Input 
            className='nav__input' 
            type='text' 
            placeholder="영화제목을 입력해주세요." 
            value={searchVale}
            onChange={inputChange}
          />

          <SignOut>
            <UserImg src={userData.photoURL} alt={userData.displayName} />
            <DropDown>
              <span onClick={handleLogOut}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      }
    </NavWrapper>
  )
}

export default Nav
