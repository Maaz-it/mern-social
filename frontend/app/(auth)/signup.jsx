import React, { useContext, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { AuthContext } from '../../src/auth/AuthContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { router } from 'expo-router';

import { saveToken } from '../../src/services/token.service';

import { signupApi } from '../../src/api/auth.api';
import Backbutton from '../../component/Backbutton';

const signup = () => {

    const [ userName , setuserName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPasssword] = useState("")
    const [loading , setLoading] = useState(false)
    const [name , setname] = useState("")

    
    const {setUser} = useContext(AuthContext)
    const handleSignup = async ()=>{
        if (!userName || !email || !password) {
            alert("All fields are required")
        }
        try {
            setLoading(true)
            const res = await signupApi({userName , email , password , name})
            await saveToken(res.data.token)
            setUser(res.data.user)
            router.replace("/(app)/home")
        } catch (error) {
            alert("Signup faildd")
            console.log(error)
        }
         const t = await AsyncStorage.getItem("token");
     console.log("SAVED TOKEN:", t);
    }
  return (
     <SafeAreaView style={styles.container}>
      <Backbutton />
    <View style={styles.content}>
    
    <Text style={styles.title}> Welcome Register</Text>
    <Text style={styles.subtitle}> Pls Register to ur account</Text>
    
    
    <View style={styles.form}>
    

  <TextInput 
     style={styles.input}
    placeholder='Name'
     placeholderTextColor="#aaa"
            
         onChangeText={setname}
            
    />

     <TextInput 
     style={styles.input}
    placeholder='Username'
     placeholderTextColor="#aaa"
            
         onChangeText={setuserName}
            
    />

    <TextInput 
     style={styles.input}
    placeholder='Email'
     placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
            onChangeText={setEmail}
    />
    
    <TextInput 
     style={styles.input}
    placeholder='password'
     placeholderTextColor="#aaa"
         secureTextEntry={true}
    onChangeText={setPasssword}
    />
    
    <TouchableOpacity style={styles.button}
   onPress={handleSignup}
    >
    <Text>Signup</Text>
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
    
              <Text>Dont have the account</Text>
    <TouchableOpacity
    > 
        <Text>Login </Text>
    </TouchableOpacity>
    
    
    </View>
    </View>
    
    
    
        </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  button: {
    backgroundColor: '#007AFF', // Modern iOS Blue
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotButton: {
    marginTop: 0,
    alignItems: 'center',
  },
  forgotText: {
    color: '#007AFF',
    fontSize: 14,
  },
});

export default signup;
;
