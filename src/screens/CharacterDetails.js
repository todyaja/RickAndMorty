import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite } from '../redux/reducer/favoriteCharacter';


const CharacterDetails = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const array = useSelector((state) => state.favorite.favorite)
        useEffect(() => {
            getData()
        },[]);

        const getData = async () =>{
            const {id} = route.params;
            let response = await fetch('https://rickandmortyapi.com/api/character/'+id);
            let json = await response.json();
            setData(json)
            setIsLoading(false)
        }

        const findCharacterInFav = (id) =>{
            var index = array.findIndex(x=> x.id == id)
            if(index == '-1'){
                return (<View style={styles.favBtn}><Button onPress={() => {dispatch(addFavorite(data))}} title = 'Add to Favorite'/></View>)
            }else{
                return (<View style={styles.favBtn}><Button onPress={() => {dispatch(deleteFavorite(data))}} title = 'Remove Favorite'/></View>)
            }
        }

      return(
        isLoading==true&&data==null?(
            <View style = {styles.container}>
                <ActivityIndicator animating={true} size="large" style={{opacity:1, alignItems: 'center', justifyContent : 'center'}} color="#add8e6" />
              </View>
        ):(
            <View style={styles.all}>
                <View style={styles.img}>
                    <Image source={{uri: data.image}}
                     style={{width: 250, height: 250}} />
                </View>
                <View style={styles.desc}>
                    <Text style={styles.Title}>Name : </Text>
                    <Text style= {styles.data}>{data.name}</Text>
                    <Text style={styles.Title}>Origin : </Text>
                    <Text style= {styles.data}>{data.origin.name}</Text>
                    <Text style={styles.Title}>Location : </Text>
                    <Text style= {styles.data}>{data.location.name}</Text>
                    <Text style={styles.Title}>Appeared in : </Text>
                    <View style= {styles.window}>
                        <FlatList
                            const episodes = {data.episode}
                            data = {data.episode}
                            renderItem={({ item }) => (
                                <Text style={styles.eps}>Episode {item.replace("https://rickandmortyapi.com/api/episode/", '')}</Text>
                            )}
                        />  
                    </View>
                {findCharacterInFav(data.id)}
                </View>
            </View>
        )
      )
}

export default CharacterDetails;

const styles = new StyleSheet.create({
    data :{
        color: 'black',
        marginLeft:70,
    },
    favBtn:{
        width : '50%',
        marginTop: 10,
        marginBottom : 5,
        marginLeft : '25%'
    },
    name : {
        marginLeft:70,
        color : 'black'
    },
    all:{
        width: '100%',
        height: '100%',
        marginTop: 20,
    },
    img:{
        alignItems:'center'
    },
    desc:{
        width :'100%',
    },
    Title:{
        marginLeft:70,
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color : 'black'
    },
    window:{
        marginTop : 10,
        height: '30%',
        marginBottom : 0
    },
    eps: {
        marginTop: 5,
        color: 'black',
        marginLeft:70,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})
