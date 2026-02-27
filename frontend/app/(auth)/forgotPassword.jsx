import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import Backbutton from "../../component/Backbutton";

import { sendotp , verifyotp , changepassword } from "../../src/api/auth.api";
const Forgotpassword = () =>{

  const router = useRouter()

  const handlesendotp =  async () =>{
    try {
   
      const res = await fetch("http://localhost:4000/api/auth/sendotp", {
        method: "POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({email : email})
      }
      )
      const data =  await res.json()
      console.log(data)
      if (res.ok) {
        // alert(data.message)
        setStep(2)
      }else{
        alert(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const verifyotp = async ( ) =>{
    try {
      const res = await fetch("http://localhost:4000/api/auth/verifyotp",{
        method: "POST",
        headers: {
        "Content-Type" : "application/json"
        },
        body: JSON.stringify({  otp})
      })
      // const data = await res.json()

      if (res.ok) {
        // alert(data.message)
        setStep(3)
      }else{
        alert(data.message)
      }
    } catch (error) {
     console.log(error) 
    }
  }

  const changepass = async () =>{
    try {
      const res = await fetch("http://localhost:4000/api/auth/resetpassword", {
        method: "POST",
        headers: {
        "Content-Type" : "application/json"
        },
        body: JSON.stringify({password : newpassword})
      })
      const data =  await res.json()
      console.log(data)
      if (res.ok) {
        router.push("(auth)/login")
      }else{
        alert(data.message)
      }
    } catch (error) {
     console.log(error) 
    }
  }

    const [step , setStep] = useState(1)

    const [email , setEmail] = useState("")

    const [ otp , setOtp] = useState("")

    const [newpassword ,  setNewpassword] = useState("")

    const [confirmPassword ,  setConfirmPassword ] = useState("")

return(
       <SafeAreaView style={styles.container}>
        <Backbutton />
        <View style={styles.content}>

<Text style={styles.title}> Forgot Password</Text>

{ step === 1 && (
    <>
    <TextInput 
    style={styles.input}
    placeholder="Enter ur register email"
     value={email}
     autoCapitalize="none"
     type="email"
  onChangeText={(text) => setEmail(text)}
    />
    <TouchableOpacity 
    style={styles.button}
     onPress={handlesendotp}
    >
        <Text style={styles.buttonText} >Send OTP</Text>
    </TouchableOpacity>
    </>
)}

{ 
    step === 2 &&  (
        <>
         <TextInput 
          style={styles.input}
          placeholder="Enter OTP"
        onChangeText={(text)=> setOtp(text)}
          keyboardType="number-pad"
         />
          <TouchableOpacity 
    style={styles.button}
     onPress={verifyotp}
    >
        <Text style={styles.buttonText} >Verify OTP</Text>
    </TouchableOpacity>
         
         </>
    )
}

{step === 3 && (
    <>
    
      <TextInput 
    style={styles.input}
    placeholder="Enter ur new password"
     value={newpassword}

     onChangeText={(text)=> setNewpassword(text)}
     secureTextEntry
    />

 <TouchableOpacity 
    style={styles.button}
     onPress={changepass}
    >
        <Text style={styles.buttonText} > Reset Password</Text>
    </TouchableOpacity>


    </>
)}


        </View>
       </SafeAreaView>
)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default Forgotpassword
