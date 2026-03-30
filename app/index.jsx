import { StyleSheet, View, Image } from 'react-native'
import {Link} from 'expo-router'
import splash from '../images/Splashscreen.gif'
import React from 'react'

const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={splash} style={styles.image} />
      </View>
      <Link href="/Login" style={styles.link}>Proceed!</Link>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#086575'
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain'
    },
    imageContainer: {
      width: '100%',
      height: '76%',
      alignItems: 'center',
    },
    link: {
      fontWeight:'bold',
      marginBottom: 15,
      textAlign: 'center',
      width: 171,
      height: 56,
      color: '#086575',
      borderRadius: 39,
      padding: 12,
      fontSize: 20,
      backgroundColor: '#fbfeff',
    }
})