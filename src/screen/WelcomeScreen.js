import React,{useState , useEffect} from 'react'
import { StyleSheet, Text,View ,Image, TouchableOpacity} from 'react-native'
import logo from '../../assets/logo.png'
import  {colors , hr80 ,text1} from '../global/style'
import {firebase} from '../../Firebase/FireBaseConfig'

const WelcomeScreen = ({navigation}) => {
    const [userlogged, setUserlogged] = useState(null);

    useEffect(() => {
        const checklogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // navigation.navigate('home');
                    setUserlogged(user);
                } else {

                    console.log('no user');
                }
            });
        }
        checklogin();
    }, [])

    const handlelogout = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            setUserlogged(null);
            console.log('signed out');
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to Foodie</Text>
        <View style={styles.logoout}>
            <Image 
            style={styles.logo}
            source={logo}/>
        </View>
        <View style={hr80}/>
        <Text style={styles.text}>Find the best food around you at lowest price.
            
        </Text>
    <View style={hr80}/>

    {userlogged === null ?

<View style={styles.btnout}>

    <TouchableOpacity onPress={()=> navigation.navigate('signup')}>
        <Text style={styles.btn}>SignUp</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> navigation.navigate('login')}>
        <Text style={styles.btn}>Log In</Text>
    </TouchableOpacity>
</View>
  :
  <View style={styles.logged}>
                    <Text style={styles.txtlog}>Signed in as &nbsp; <Text style={styles.txtlogin}>{userlogged.email}</Text></Text>
                    <View style={styles.btnout}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.btn}>Next</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlelogout()}>
                            <Text style={styles.btn}>Log Out</Text>
                        </TouchableOpacity>

                    </View>
                </View>
}
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff4242',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        color: colors.col1,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: '200',
    },
    logoout: {
        width: "80%",
        height: "30%",
        // backgroundColor: '#fff',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 18,
        width: '80%',
        color: colors.col1,
        textAlign: 'center',
    },
    btnout: {
        flexDirection: 'row',
    },
    btn: {
        fontSize: 20,
        color: colors.text1,
        textAlign: 'center',
        marginVertical: 30,
        marginHorizontal: 10,
        fontWeight: '700',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
    },
    logged: {
        alignItems: 'center',

    },
    txtlog: {
        fontSize: 16,
        color: colors.col1,
    },
    txtlogin: {
        fontSize: 16,
        color: colors.col1,
        fontWeight: '700',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    }
})
export default WelcomeScreen;


