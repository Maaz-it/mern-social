import React, { use, useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker'; // 1. Import Picker
import { UpdateProfile } from "../../src/api/auth.api";

const EditProfile = ({ user, visible, setVisible }) => {
  // 2. State for the new image (defaults to current user image)
  const [selectedImage, setSelectedImage] = useState(user?.profileurl || null);

  const[name , setName] = useState(user?.name || null )

  const [userName , setUserNamel] = useState(user?.userName || null)

  const [bio , setBio] = useState(user?.bio || null)



  const [profetion , setProfetion] = useState(user?.profetion || null)


  const handleInput = async () =>{
    try {
        const formData = new FormData();

formData.append("name", name)
formData.append("username", userName)
formData.append("bio", bio)
formData.append("profession", profetion)

        // image thing 
        if (selectedImage && selectedImage !==  user?.profileurl) {
          const urlprofile = selectedImage.split(".")
          const filetype = urlprofile[urlprofile.length - 1]
        
        
          formData.append("image" , {
            uri: selectedImage,
            name: `photo.${filetype}`,
            type : `Image/${filetype}`
          })

        }
        const response = await UpdateProfile(formData)


        if (response.status === 200) {
            alert("profile Updated")
         
        }

    } catch (error) {
        console.error("UPdated daild" , error)
        alert("something went wrong")
    }
  }



  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Edit Profile</Text>

          {/* 3. Image Picker Section */}
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.profilePreview} />
            ) : (
              <View style={styles.placeholderCircle}>
                <Text style={{ fontSize: 12, color: 'gray' }}>Add Photo</Text>
              </View>
            )}
            <Text style={styles.changeText}>Change Profile Photo</Text>
          </TouchableOpacity>

          <TextInput style={styles.input} 
          placeholder="Name" defaultValue={user?.name} 
          value={name} onChangeText={setName}/>

          <TextInput style={styles.input} placeholder="username" 
          defaultValue={user?.username}  value={userName}
          onChangeText={setUserNamel} />
          <TextInput style={styles.input} 
          placeholder="bio" defaultValue={user?.bio}
          onChangeText={setBio} value={bio} />
          <TextInput style={styles.input}
           placeholder="Profession"
           onChangeText={setProfetion}
           value={profetion} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.close}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {handleInput()}}>
              <Text style={[styles.close, { color: 'green' }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    margin: 20,
  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePreview: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  placeholderCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  changeText: {
    marginTop: 8,
    color: '#0095f6',
    fontWeight: '600'
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center'
  },
  close: {
    color: "blue",
    marginTop: 20,
    fontWeight: 'bold'
  },
});

export default EditProfile;
