import {Text, StyleSheet, View} from 'react-native';

function App() {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <Text style={{fontSize: 20, color: 'red'}}>Home Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default App;
