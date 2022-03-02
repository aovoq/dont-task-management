import { useState } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { Link, useNavigate } from 'react-router-dom'

const provider = new GoogleAuthProvider()

const SignIn = () => {
   const navigate = useNavigate()
   const [error, setError] = useState(false)

   const handleLogin = () => {
      signInWithPopup(auth, provider)
         .then((user) => {
            navigate('/')
         })
         .catch((error) => {
            console.log(error)
            setError(error.message)
         })
   }

   return (
      <main>
         <h1>signin</h1>
         {error && <p>{error}</p>}
         <button onClick={handleLogin}>signin with google</button>
         <hr />
         <Link to='/'>Home</Link>
      </main>
   )
}

export default SignIn
