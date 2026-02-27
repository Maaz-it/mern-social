import { Stack } from "expo-router";

import { useState , useEffect } from "react";

import { getCurrentUSer } from "../src/api/user.api";

import { getToken , removeToken } from "../src/services/token.service";
import { AuthContext } from "../src/auth/AuthContext";

export default function RootLayout() {
  const [user , setUser] = useState(null)

  const [loading , setLoading] = useState(true)

  useEffect(()=>{

    const init = async () =>{
      try {
        const token = await getToken();
        if (!token) {
          setLoading(false)
          return 
        }

        const res = await getCurrentUSer()
        setUser(res.data)
      } catch (error) {
        // await removeToken()
        // setUser(null)
      }finally{
        setLoading(false)
      }
    }

    init()
  },[])

  if (loading) return null;

  return (
    <AuthContext.Provider value={{user , setUser}}> 
<Stack screenOptions={{headerShown: false}} />
    </AuthContext.Provider>
  )
}
