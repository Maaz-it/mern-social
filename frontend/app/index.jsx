
import { Redirect } from "expo-router";
import { useContext } from "react";

import { AuthContext } from "@/src/auth/AuthContext";

export default function Index (){
  const {user} = useContext(AuthContext)
 if (user) return <Redirect href="/(app)/home" />
 return <Redirect href="/(auth)/login" />
}