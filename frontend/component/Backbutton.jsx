import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity  , Text , StyleSheet} from "react-native";


const Backbutton = ({fallback}) =>{

    const router = useRouter()

    const navigation = useNavigation()

    const handleBack = () =>{
        if (navigation.canGoBack()) {
            router.back()
        }else if(fallback){
            router.replace(fallback)
        }
    }

    return(
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.text}>👈🏻</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    backgroundColor: "transparent", // Your black button style
    borderRadius: 5,
    alignSelf: 'flex-start',
    margin: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 40
  },
});


export default Backbutton