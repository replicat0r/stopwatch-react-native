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
      timeElapsed: null
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
        <Text>
          list of laps
        </Text>
      </View>

    </View>
  },
  startStopButton:function (){
    return <TouchableHighlight
      underlayColor = "gray"
      onPress={this.handleStartPress}>
      <Text>
        Start
      </Text>
    </TouchableHighlight>
  },
  handleStartPress: function(){
    var startTime = new Date();
    setInterval(()=>{
        this.setState({
          timeElapsed: new Date() - startTime
        });
    },1)
  },
  lapButton:function(){
    return  <View>
      <Text>
        Lap
      </Text>
    </View>
  },
  border:function(color){
    return{
      borderColor:color,
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
  }

})

AppRegistry.registerComponent('stopwatch',function(){
  return StopWatch
})
