import React, { Profiler } from 'react'
import styled from 'styled-components'
import { useAuthContext } from '../context/AuthContext'

const Header = () => {
   const { user } = useAuthContext()

   return (
      <StickyHeader>
         <Container>
            <div>2022-03-03</div>
            <div>タスクやれ</div>
            <div>
               <ProfileImage src={user.photoURL} />
            </div>
         </Container>
      </StickyHeader>
   )
}

const StickyHeader = styled.header`
   position: sticky;
   top: 0;
`

const Container = styled.nav`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   align-items: center;
   padding: 0.5rem 0.625rem;
`

const ProfileImage = styled.img`
   width: 40px;
   height: 40px;
   border-radius: 40px;
`

export default Header
