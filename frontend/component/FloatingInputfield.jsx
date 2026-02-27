import React, { useState } from "react"
import { View , Text} from "react-native"

const  FloatingInputfield = ({placeholder , value , onChangeText , secureTextEntry ,  keyboardType}) =>{

    const [isfocused , setIsfocused] = useState(false)


    return (
        <View style={{marginBottom : 20}}>

{(isfocused || value) && (
    <Text>{placeholder}</Text>
)}
        </View>
    )

}