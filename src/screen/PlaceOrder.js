import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { btn1, colors, hr80, navbtn, navbtnin } from '../global/style';
import { firebase } from '../../Firebase/FireBaseConfig';
import { AntDesign } from '@expo/vector-icons';

const PlaceOrder = ({ navigation, route }) => {
    const [orderdata, setOrderdata] = useState([]);
    const [totalCost, setTotalCost] = useState('0');
    const { cartdata } = route.params;

    useEffect(() => {
        setOrderdata(JSON.parse(cartdata));
    }, [cartdata]);

    // User data
    const [userloggeduid, setUserloggeduid] = useState(null);
    const [userdata, setUserdata] = useState(null);

    useEffect(() => {
        const checklogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    setUserloggeduid(user.uid);
                } else {
                    console.log('no user');
                }
            });
        };
        checklogin();
    }, []);

    useEffect(() => {
        const getuserdata = async () => {
            const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid);
            const doc = await docRef.get();
            if (!doc.empty) {
                doc.forEach((doc) => {
                    setUserdata(doc.data());
                });
            } else {
                console.log('no user data');
            }
        };
        getuserdata();
    }, [userloggeduid]);

    useEffect(() => {
        if (cartdata != null) {
            const foodprice = JSON.parse(cartdata).cart;
            let totalfoodprice = 0;
            foodprice.map((item) => {
                totalfoodprice = (parseInt(item.data.foodPrice) * parseInt(item.Foodquantity)) +
                    (parseInt(item.data.foodAddonPrice) * parseInt(item.Addonquantity)) + totalfoodprice;
            });
            setTotalCost(JSON.stringify(totalfoodprice));
        }
    }, [cartdata]);

    const placenow = async () => {
        try {
            const docRef = firebase.firestore().collection('UserOrders').doc(new Date().getTime().toString());
            await docRef.set({
                orderid: docRef.id,
                orderdata: orderdata.cart,
                orderstatus: 'pending',
                ordercost: totalCost,
                orderdate: firebase.firestore.FieldValue.serverTimestamp(),
                orderaddress: userdata.address,
                ordername: userdata.name,
                orderuseruid: userloggeduid,
                orderpayment: 'online',
                paymenttotal: totalCost
            });
            alert('Order Placed Successfully');
            // Uncomment and use one of the navigation options as needed
            // navigation.navigate('home');
            // navigation.navigate('trackorders');
        } catch (error) {
            console.error("Error placing order: ", error);
            alert('Failed to place the order. Please try again.');
        }
    };

    return (
        <FlatList
            data={orderdata.cart}
            renderItem={({ item }) => (
                <View style={styles.rowout}>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={styles.qty}>{item.Foodquantity}</Text>
                            <Text style={styles.title}>{item.data.foodName}</Text>
                            <Text style={styles.price1}>₹{item.data.foodPrice}</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.totalprice}>₹{parseInt(item.Foodquantity) * parseInt(item.data.foodPrice)}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={styles.qty}>{item.Addonquantity}</Text>
                            <Text style={styles.title}>{item.data.foodAddon}</Text>
                            <Text style={styles.price1}>₹{item.data.foodAddonPrice}</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.totalprice}>₹{parseInt(item.Addonquantity) * parseInt(item.data.foodAddonPrice)}</Text>
                        </View>
                    </View>
                </View>
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
                <>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <View style={navbtn}>
                            <AntDesign name="back" size={24} color="black" style={navbtnin} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.container}>
                        <Text style={styles.head1}>Your Order Summary</Text>
                    </View>
                </>
            }
            ListFooterComponent={
                <View style={styles.container}>
                    <View style={hr80}></View>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={styles.title}>Order Total :</Text>
                        </View>
                        <View style={styles.left}>
                            <Text style={styles.totalpriceitem}>₹{totalCost}</Text>
                        </View>
                    </View>
                    <View style={hr80}></View>
                    <View style={styles.userdataout}>
                        <Text style={styles.head1}>Your Details</Text>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.title}>Name :</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.title}>{userdata?.name}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.title}>Email :</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.title}>{userdata?.email}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.title}>Address :</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.title}>{userdata?.address}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={hr80}></View>
                    <View style={{ top: -30 }}>
                        <TouchableOpacity style={{
                              width:'80%',
                              height:50,
                              backgroundColor:'red',
                              justifyContent:'center',
                              alignItems:'center',
                              elevation:10,
                              color:'white',
                              borderRadius:10,
                              marginBottom:20,
                              bottom:-30
                        }}>
                            <Text style={styles.btntext} onPress={() => placenow()}>Proceed to Payment</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        />
    );
};

export default PlaceOrder;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    head1: {
        fontSize: 30,
        fontWeight: '200',
        color: colors.text1,
        margin: 10,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
    },
    rowout: {
        flexDirection: 'column',
        margin: 10,
        elevation: 10,
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,
    },
    qty: {
        width: 40,
        height: 30,
        backgroundColor: colors.text1,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 10,
        color: colors.col1,
        fontSize: 17,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
    },
    price1: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
        color: colors.text1,
    },
    left: {
        flexDirection: 'row',
       
    },
    right: {
        flexDirection: 'row',
    },
    totalprice: {
        fontSize: 17,
        fontWeight: 'bold',
        borderColor: colors.text1,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
    },
    totalpriceitem: {
        fontSize: 25,
        fontWeight: 'bold',
        borderColor: colors.text1,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
    },
    btntext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.col1,
        margin: 10,
    },
    userdataout: {
        top: -20
    }
});
