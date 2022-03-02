import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuthContext } from './context/AuthContext'
import { TasksProvider } from './context/TasksContext'
import { GlobalStyles } from './components/globalStyle'
import Home from './pages/Home'
import SignIn from './pages/SignIn'

const PrivateOutlet = () => {
   const { user } = useAuthContext()
   return user ? <Outlet /> : <Navigate to='/signin' />
}

const PublicOutlet = () => {
   const { user } = useAuthContext()
   return !user ? <Outlet /> : <Navigate to='/' />
}

const App = () => {
   return (
      <AuthProvider>
         <TasksProvider>
            <GlobalStyles />
            <Router>
               <Routes>
                  <Route path='/' element={<PrivateOutlet />}>
                     <Route path='' element={<Home />} />
                  </Route>
                  <Route path='/signin' element={<PublicOutlet />}>
                     <Route path='' element={<SignIn />} />
                  </Route>
                  <Route path='*' element={<Navigate to='/' />} />
               </Routes>
            </Router>
         </TasksProvider>
      </AuthProvider>
   )
}

export default App

// import { useState, useEffect } from 'react'
// import { auth } from './lib/firebase'
// import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
//
// const provider = new GoogleAuthProvider()
//
// const signInWithGoogle = () => signInWithPopup(auth, provider)
//    .then((result) => {
//       const credential = GoogleAuthProvider.credentialFromResult(result)
//       const token = credential.accessToken
//       const user = result.user
//    }).catch((error) => {
//       const errorCode = error.code
//       const errorMessage = error.message
//       const email = error.email
//       const credential = GoogleAuthProvider.credentialFromError(error)
//    })
//
// const SignIn = () => (<>
//    <button onClick={signInWithGoogle}>Sign In With Google</button>
// </>)
//
// const SignOutButton = (props) => {
//    return (<>
//       <button onClick={props.handleSubmit}>SignOut</button>
//    </>)
// }
//
//
// function App() {
//    const [user, setUser] = useState('')
//
//    useEffect(() => {
//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//          if (user) {
//             console.log(user)
//             setUser(user)
//          } else {
//             setUser('')
//          }
//       })
//       return () => unsubscribe()
//    }, [])
//
//    const handleSignOut = () => {
//       signOut(auth).then(() => {
//          console.log('logout')
//       }).catch((error) => {
//          console.log(error.message)
//       })
//    }
//
//    return (<>
//       <h1>app</h1>
//       {user
//          ? <div>in user</div>
//          : <div>no user</div>
//       }
//       <SignIn/>
//       <SignOutButton handleSubmit={handleSignOut}/>
//    </>)
// }
//
// export default App
