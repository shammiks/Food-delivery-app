
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, veg, nonveg } from '../global/style'

const CardSlider = ({title , data , navigation}) => {

    const openproductpage = (item)=>{
            // console.log(item);
            navigation.navigate('Productpage',item)
    }

  return (
    <View style={styles.container}>
            <Text style={styles.cardouthead}>
                {title}
            </Text>
            <FlatList style={styles.cardsout}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data}
                renderItem={({ item }) => (
                   
                   
                        <View style={styles.card}>
                            <View style={styles.s1}>
                                <Image source={{
                                    uri: item.foodImageUrl
                                }} style={styles.cardimgin} />
                            </View>
                            <TouchableOpacity key={item.index} onPress={()=>{
                        openproductpage(item)
                    }}>
                            <View style={styles.s2}>
                                <Text style={styles.txt1}>{item.foodName}</Text>
                               
                                <View style={styles.s2in}>
                                    <Text style={styles.txt2}>Rs.{item.foodPrice}/-</Text>
                                    {item.foodType == 'veg' ? <Text style={veg}></Text> : <Text style={nonveg}></Text>}
                               
                                </View>

                            </View>
                            <View style={styles.s3}>
                                    <View style = {{flex:1,flexDirection:'row',margin:-10,}}>
                               
                                <TouchableOpacity 
                                   key={item.index} onPress={()=> openproductpage(item)}
                                style={{backgroundColor: colors.text1,
                                        color: colors.col1,
                                        paddingHorizontal: 5,
                                        paddingVertical: 5,
                                        fontSize: 20,
                                        borderRadius: 20,
                                        width: '80%',
                                        textAlign: 'center',
                                        top:60,
                                        margin:5,
                                        
                                        }}>
                                    <Text style={styles.buybtn}>Details</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        
                    </TouchableOpacity>
                    </View>
                )}
            />
        </View>
  )
}

export default CardSlider

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    //card
    cardouthead: {
        color: colors.text3,
        width: '90%',
        fontSize: 30,
        fontWeight: '300',
        borderRadius: 10,
        marginHorizontal: 10,
        color:'red'
    },
    cardsout: {
        width: '100%',
    },
    card: {
        width: 250,
        height: 300,
        margin: 10,
        // borderRadius: 30,
        // borderWidth: 1,
        borderColor: '#e8e8e8',
        backgroundColor: colors.col1,
    },
    cardimgin: {
        width: "100%",
        height: 210,
        borderRadius: 40,
    },
    s2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'aqua',

    },
    txt1: {
        fontSize: 18,
        color: colors.text3,
        marginHorizontal: 5,
        width: 150,
    },
    txt2: {
        fontSize: 20,
        color: colors.text2,
        marginRight: 10,
    },
    s2in: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,

    },
    s3: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 1,
        width: '100%',
    },
    buybtn: {
        backgroundColor: colors.text1,
        color: colors.col1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
         textAlign: 'center',
        
        
    }
})