import React, { useState } from 'react'
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  Alert,
  StyleSheet
} from 'react-native'
import { supabase } from '../lib/supabase'
import { router } from 'expo-router'
import logo from '../images/loginlogo.png'

const Login = () => {
  const [adminId, setAdminId] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
  if (!adminId || !password) {
    Alert.alert('Error', 'Please enter ID and password')
    return
  }

  const idNumber = Number(adminId)
  const passwordTrimmed = password.trim()

  console.log('Trying login:', { idNumber, passwordTrimmed })

  const { data, error } = await supabase
    .from('admin')
    .select('*')
    .eq('id', idNumber)
    .eq('password', passwordTrimmed)

  console.log('Supabase response:', { data, error })

  if (error) {
    Alert.alert('Error', error.message)
  } else if (!data || data.length === 0) {
    Alert.alert('Login Failed', 'Invalid ID or password')
  } else {
    Alert.alert('Login Success!')
    router.push('/Dashboard')
  }
}

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={logo} style={styles.image} />
        </View>
        <Text style={styles.welcome}>WELCOME BACK, ADMIN!</Text>
        <View style={styles.card}>
          <Text style={styles.signIn}>SIGN IN</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ADMIN ID:</Text>
            <TextInput
              placeholder="Enter your ID"
              placeholderTextColor="#999"
              value={adminId}
              onChangeText={setAdminId}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD:</Text>
            <TextInput
              placeholder="Enter password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>
          <Pressable
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'LOG IN'}</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#086575',
    paddingTop: 60,
  },

  imageContainer: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '80%',
    height: '100%',
    marginLeft: 30,
    resizeMode: 'contain',
    marginBottom: -10,
  },

  welcome: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 20,
  },

  card: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    padding: 25,
  },

  signIn: {
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 20,
    color: '#333',
  },

  inputGroup: {
    marginBottom: 15,
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  
  button: {
    marginTop: 15,
    backgroundColor: '#0f3f4f',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})