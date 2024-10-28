import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../../Firebase/FireBaseConfig';
import { AntDesign } from '@expo/vector-icons';
import { colors, navbtn, navbtnin, navbtnout } from '../global/style';

const UserProfile = ({ navigation }) => {
  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserloggeduid(user.uid);
        } else {
          setUserloggeduid(null);
          navigation.navigate('login');
        }
      });
    };
    checklogin();
  }, []);

  const getuserdata = async () => {
    if (userloggeduid) {
      const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid);
      const doc = await docRef.get();
      if (!doc.empty) {
        doc.forEach((doc) => {
          setUserdata(doc.data());
        });
      } else {
        console.log('No user data');
      }
    }
  };

  useEffect(() => {
    getuserdata();
  }, [userloggeduid]);

  return (
    <View style={styles.containerout}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={navbtn}>
            <AntDesign name="back" size={24} color={colors.primary} style={navbtnin} />
          </View>
        </TouchableOpacity>
        <Text style={styles.head1}>Your Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/usericon.png')} // Placeholder image if not available
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userdata ? userdata.name : 'Loading...'}</Text>
        <Text style={styles.userEmail}>{userdata ? userdata.email : 'Loading...'}</Text>
        <Text style={styles.userAddress}>{userdata ? userdata.address : 'Loading...'}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  head1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileContainer: {
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#f8f8f8',
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
    marginBottom: 10,
  },
  userAddress: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserProfile;
