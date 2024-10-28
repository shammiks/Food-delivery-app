import { View, Text, StatusBar, TextInput, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeadNav from '../component/HomeHeadNav'
import Categories from '../component/Categories'
import OfferSlider from '../component/OfferSlider'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../global/style'
import { firebase } from '../../Firebase/FireBaseConfig'
import CardSlider from '../component/CardSlider'
import BottomNav from '../component/BottomNav'

const HomeScreen = ({ navigation }) => {
    const [foodData, setFoodData] = useState([]);
    const [vegData, setvegData] = useState([]);
    const [nonvegData, setnonvegData] = useState([]);
    const [breakfast, setbreakfast] = useState([]);
    const [Dinner, setDinner] = useState([]);
    const [Starters, setStarters] = useState([]);
    const [search, setsearch] = useState('');

    const foodRef = firebase.firestore().collection('FoodData');

    // Fetching food data from Firestore
    useEffect(() => {
        const unsubscribe = foodRef.onSnapshot(snapshot => {
            setFoodData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // Ensure 'id' is available
        });
        return unsubscribe;
    }, []);

    // Filtering the food data based on food type and meal type
    useEffect(() => {
        setvegData(foodData.filter(item => item.foodType === 'veg'));
        setnonvegData(foodData.filter(item => item.foodType === 'non-veg'));
        setbreakfast(foodData.filter(item => item.mealType === 'breakfast'));
        setDinner(foodData.filter(item => item.mealType === 'dinner'));
        setStarters(foodData.filter(item => item.mealType === 'starter'));
    }, [foodData]);

    // Handle search functionality
    const handleSearchPress = () => {
        const matchedItem = foodData.find(item => item.foodName.toLowerCase().includes(search.toLowerCase()));
        
        console.log("Matched Item:", matchedItem); // Debugging line

        if (matchedItem) {
            navigation.navigate('Productpage', { foodDetails: matchedItem });
            setsearch('');  // Clear search after navigation
        } else {
            alert('No matching food found');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            <HomeHeadNav navigation={navigation} />

            <View style={styles.bottomnav}>
                <BottomNav navigation={navigation} />
            </View>

            <ScrollView>

                <View style={styles.searchbox}>
                    <TouchableOpacity onPress={handleSearchPress}>
                        <AntDesign name="search1" size={24} color="black" style={styles.searchicon} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder='Search'
                        onChangeText={(text) => setsearch(text)}
                        value={search}
                    />
                </View>

                {search !== '' && (
                    <View style={styles.seacrhresultsouter}>
                        <FlatList
                            style={styles.searchresultsinner}
                            data={foodData.filter(item => item.foodName.toLowerCase().includes(search.toLowerCase()))}
                            keyExtractor={(item) => item.id} // Ensure you have a unique key
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.searchresult}
                                    onPress={() => {
                                        navigation.navigate('Productpage', { foodDetails: item });
                                        setsearch('');  // Clear search after navigation
                                    }}
                                >
                                    <AntDesign name="arrowright" size={24} color="black" />
                                    <Text style={styles.searchresulttext}>{item.foodName}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}

                <Categories />
                <OfferSlider />

                <CardSlider title={"Today's Special"} data={foodData} navigation={navigation} />
                <CardSlider title={"Non-Veg"} data={nonvegData} navigation={navigation} />
                <CardSlider title={"Veg"} data={vegData} navigation={navigation} />
                <CardSlider title={"Breakfast"} data={breakfast} navigation={navigation} />
                <CardSlider title={"Dinner"} data={Dinner} navigation={navigation} />
                <CardSlider title={"Starters"} data={Starters} navigation={navigation} />

            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.col1,
        width: '100%',
        height: '100%',
    },
    searchbox: {
        flexDirection: 'row',
        width: '90%',
        backgroundColor: colors.col1,
        borderRadius: 30,
        alignItems: 'center',
        padding: 10,
        margin: 20,
        elevation: 10,
    },
    input: {
        marginLeft: 10,
        width: '90%',
        fontSize: 18,
        color: colors.text1,
    },
    searchicon: {
        color: colors.text1,
    },
    seacrhresultsouter: {
        width: '100%',
        marginHorizontal: 30,
        height: '100%',
        backgroundColor: colors.col1,
    },
    searchresultsinner: {
        width: '100%',
    },
    searchresult: {
        width: '100%',
        flexDirection: 'row',
        padding: 5,
    },
    searchresulttext: {
        marginLeft: 10,
        fontSize: 18,
        color: colors.text1,
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.col1,
        zIndex: 20,
    },
});

export default HomeScreen;
