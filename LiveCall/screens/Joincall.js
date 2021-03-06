import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

class Joincall extends Component {
  static navigationOptions={
    headerTitle:"Join call"
  }

  constructor(){
    super();
    this.handleJoinCall=this.handleJoinCall.bind(this);
    this.state={
      user:{},
      socket:{}
    }
  }

  componentDidMount(){
    const { navigation } = this.props;
    const user = navigation.getParam('user', {});
    const socket = navigation.getParam('socket', {});
    this.setState({
      user,
      socket
    });
  }

  handleJoinCall=(e)=>{
    const { user, socket } = this.state;
    // calling process for specified user
    socket.emit("joincall",user);

    socket.on('callreceived', (user) => {
      console.log("callreceived");
      this.props.navigation.navigate("Videocall", {
        username: user.name,
        caller:true,
        socket
      })
    });
  }

  render() {
    const { user, socket } = this.state;
    console.log(this.state.user);
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: user.image}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.info}>Active now</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
              
              < TouchableOpacity style = {
                styles.buttonContainer
              }
              onPress = {this.handleJoinCall} >
                <Text>Join Call</Text>  
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

export default Joincall;

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});