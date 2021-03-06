import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import io from 'socket.io-client';


class Home extends Component {
  static navigationOptions={
  }

  constructor(props) {
    super(props);
    this.getAllUsers=this.getAllUsers.bind(this)
    this.handleIncomingCall=this.handleIncomingCall.bind(this)
    this.state = {
      socket:{},
      users: [
        {id:1,  name: "Parjanya kumar",   date:"12 jan", time:'11:14 am', video:true, image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
        {id:2,  name: "Chitra B Rai",  date:"12 jul", time:'15:58 am', video:true, image:"https://bootdey.com/img/Content/avatar/avatar6.png"} ,
        {id:3,  name: "Akshaya kundar", date:"12 aug", time:'12:45 am', video:true,  image:"https://bootdey.com/img/Content/avatar/avatar5.png"} ,
        {id:4,  name: "Bharghavi", date:"12 feb", time:'08:32 am', video:true, image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:5,  name: "Deeksha shetty",   date:"12 oct", time:'07:45 am', video:true,  image:"https://bootdey.com/img/Content/avatar/avatar3.png"} ,
        {id:6,  name: "Subhramanya",   date:"12 jan", time:'09:54 am', video:true, image:"https://bootdey.com/img/Content/avatar/avatar2.png"} ,
        {id:8,  name: "Prakhyath",   date:"12 jul", time:'11:22 am', video:true,  image:"https://bootdey.com/img/Content/avatar/avatar1.png"} ,
        {id:9,  name: "John Doe",   date:"12 aug", time:'13:33 am', video:true, image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:10, name: "John Doe",   date:"12 oct", time:'11:58 am', video:true,  image:"https://bootdey.com/img/Content/avatar/avatar7.png"} ,
        {id:11, name: "John Doe",   date:"12 jan", time:'09:28 am', video:true, image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
      ],
      account:{ id:1, username:"prakhyath shetty", email:"prakhyath@gmail.com"}
    };
  }

  handleIncomingCall=(user)=>{
    const { socket } = this.state;
    this.props.navigation.navigate("Call",{user,socket});
  }

  getAllUsers=(users)=>{
    this.setState({ users });
  }

  componentDidMount(){
    const { navigation } = this.props;
    const account = navigation.getParam('account', {});
    this.setState({
      account
    });

    console.log('account',account);
    const socket = io('http://localhost:3000');

    console.log(socket);
    this.setState({ socket });

    //loged in user data
    socket.emit('userlogin', JSON.stringify(account ));

    socket.on('getAllUsers', (users) => {
      if(Array.isArray(users)){
        const newUsers = users.filter(x=>x.email!=account.email);
        this.getAllUsers(newUsers);
      }
    });

    socket.on('incomingcall', (user) => {
      this.handleIncomingCall(user);
    });

    socket.on('userDisconnected', (user) => {
    });
  }

  renderItem = ({item}) => {
    const { socket } = this.state;
    const user=item;
    callIcon = "https://img.icons8.com/color/48/000000/video-call.png";

    return (
      <TouchableOpacity
      onPress={()=>this.props.navigation.push('Joincall',{ user, socket})}>
        <View style={styles.row}>
          <Image source={{ uri: user.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{user.name}</Text>
            </View>
            <View style={styles.end}>
              <Image style={[styles.icon, {marginLeft:15, marginRight:5, width:14, height:14}]} source={{uri:"https://img.icons8.com/small/14/000000/double-tick.png"}}/>
              <Text style={styles.time}>{user.date} {user.time}</Text>
            </View>
          </View>
          <Image style={[styles.icon, { marginRight: 50 }]} source={{uri: callIcon}}/>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return(
      <View style={{ flex: 1 }} >
        <FlatList 
          extraData={this.state}
          data={this.state.users}
          keyExtractor = {(item,index) => item.id.toString()}
          renderItem={this.renderItem}/>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'space-between',

  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,

  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,

  },
  icon:{
    height: 28,
    width: 28, 
  }
});