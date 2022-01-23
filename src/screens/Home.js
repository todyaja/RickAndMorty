import React from 'react';
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      page : 1
    }
  }

    componentDidMount(){
      this.getData()
    }

    getData =  async() => {
      fetch('https://rickandmortyapi.com/api/character?page='+this.state.page)
        .then((response) => response.json() )
        .then ( (responseJson) => {
            
          this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.concat(responseJson.results)
          })
        })
        .catch((error) => {
          console.log(error)
        });
        
    }

    handleLoadMore = () =>{
      this.setState({
        page: this.state.page + 1
      }, this.getData)
    }


    render(){

      if(this.state.isLoading){
        return (
            <View style = {styles.container}>
              <ActivityIndicator animating={true} size="large" style={{opacity:1}} color="#add8e6" />
            </View>
        )
      }else{
          const data = this.state.next
          return (
          <View style={styles.all}>
              <View style = {styles.navbar}>
                <Text style= {styles.title}>Rick and Morty Characters</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Favorite Screen')}><Image source={require("../images/favourited_icon_red.png")} style={{width: 30, height: 30}}/></TouchableOpacity>
              </View>
                <SafeAreaView style= {styles.window}>
                  <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.item} onPress={() => this.props.navigation.navigate('Character Details', {id : item.id})}>
                      <View style={styles.item}>
                        <Image source={{uri: item.image}}
                          style={{width: 50, height: 50}} />
                        <Text style= {styles.name}>{item.name}</Text>
                      </View>
                      </TouchableOpacity>
                    )}
                    onEndReached={this.handleLoadMore}
                  />
                </SafeAreaView>
          </View>
          );
      }

    } 
};

const styles = StyleSheet.create({
  title: {
    fontStyle:'normal',
    fontWeight: 'bold',
    fontSize: 20,
    color :'black'
  },
    name: {
      margin: 5,
      color : 'black'
    },
    all:{
      width: '100%',
      height: '100%',
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

