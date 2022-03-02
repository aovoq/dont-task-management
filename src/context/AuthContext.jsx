import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'

export const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState('')
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const unsubscribed = onAuthStateChanged(auth, (user) => {
         setUser(user)
         setLoading(false)
      })
      return () => unsubscribed()
   }, [])

   return <AuthContext.Provider value={{ user }}>{!loading && children}</AuthContext.Provider>
}
