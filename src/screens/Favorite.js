import React from 'react';
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {  deleteFavorite } from '../redux/reducer/favoriteCharacter';
const Favorite = ({ navigation }) =>{
    const arr = useSelector((state) => state.favorite.favorite)
    const dispatch = useDispatch();
    return(
          <View style={styles.all}>
              <View style = {styles.navbar}>
                <Text style= {styles.title}>Favorite Characters</Text>
              </View>
                <SafeAreaView style= {styles.window}>
                  <FlatList
                    data={arr}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Character Details', {id : item.id})}>
                      <View style={styles.item}>
                        <Image source={{uri: item.image}}
                          style={{width: 50, height: 50}} />
                        <Text style= {styles.name}>{item.name}</Text>
                      </View>
                      <TouchableOpacity onPress={() => {dispatch(deleteFavorite(item))}}><Image source={require("../images/delete_icon.png")} style={{width: 20, height: 20}}/></TouchableOpacity>
                      </TouchableOpacity>
                    )}
                  />
                </SafeAreaView>
          </View>
    )
};

export default Favorite


const styles = StyleSheet.create({
  title: {
    fontStyle:'normal',
    fontWeight: 'bold',
    fontSize: 20
  },
    name: {
      margin: 5,
    },
    all:{
      width: '100%',
      height: '100%'
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      flex: 1,
      alignSelf: 'stretch',
      flexDirection: 'row',
      margin: 10,
      alignItems: 'center',
    },
    window:{
      height: '80%',
      width: '100%'

    },
    navbar:{
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
      padding: 10,
      height: '10%',
      width: '100%',
      flexDirection: 'row',
      alignItems : 'center',
      justifyContent : 'space-between'
    },
})

