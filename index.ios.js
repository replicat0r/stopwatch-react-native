var React = require('react-native');
var formatTime = require ('minutes-seconds-milliseconds')
var {
  Text,
  View,
  AppRegistry,
  StyleSheet,
  TouchableHighlight
} = React;

var StopWatch = React.createClass({
  getInitialState:function(){
    return {
      timeElapsed: null,
      running:false,
      startTime: null,
      laps: []
    };
  },

  render:function(){
    return <View style={styles.container}>
      <View style={[styles.header,this.border('yellow')]}>
        <View style={[this.border('red'),styles.timerWrapper]}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={[this.border('green'),styles.buttonWrapper]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>

      <View style={[styles.footer,this.border('blue')]}>
          {this.laps()}
      </View>

    </View>
  },
  laps: function(){
    return this.state.laps.map(function(time,index){
      return <View style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{index + 1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(time)}
        </Text>
      </View>
    });
  },
  startStopButton:function (){
    var style = this.state.running ? styles.stopButton : styles.startButton

    return <TouchableHighlight
      underlayColor = "gray"
      style={[styles.button,style]}
      onPress={this.handleStartPress}>
      <Text>
        {this.state.running ? 'Stop' : "Start"}
      </Text>
    </TouchableHighlight>
  },
  handleStartPress: function(){

    if(this.state.running){
      clearInterval(this.interval)
      this.setState({running: false})
      return
    }
    this.setState({startTime: new Date()})
    this.interval = setInterval(()=>{
        this.setState({
          timeElapsed: new Date() - this.state.startTime,
          running: true
        });
    },30)
  },
  lapButton:function(){
    return  <TouchableHighlight
          style={styles.button}
          underlayColor="gray"
          onPress = {this.handleLapPress}
          >
      <Text>
        Lap
      </Text>
    </TouchableHighlight>
  },
  handleLapPress: function(){
    var lap = this.state.timeElapsed;
    this.setState({
      startTime:new Date(),
      laps: this.state.laps.concat([lap])
    })
  },
  border:function(color){
    return{
      borderColor:'white',
      borderWidth:4
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'stretch'
  },
  header:{
    flex:1
  },
  footer:{
    flex:1
  },
  timerWrapper:{
    flex:3,
    justifyContent: 'center',
    alignItems:'center'
  },
  buttonWrapper:{
    flex:2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center"
  },
  timer:{
    fontSize:60
  },
  button:{
    borderWidth:2,
    height:100,
    width:100,
    borderRadius:50,
    justifyContent:'center',
    alignItems: 'center',
  },
  startButton:{
    borderColor:'green'
  },
  stopButton:{
    borderColor:'#cc0000'
  },
  lap:{
    justifyContent: 'space-around',
    flexDirection: 'row'

  },
  lapText: {
    fontSize:30

  }

})

AppRegistry.registerComponent('stopwatch',function(){
  return StopWatch
})
