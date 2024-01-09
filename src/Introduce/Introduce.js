import {useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';

function App({navigation}) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate('Home');
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        paddingHorizontal: 40,
      }}>
      <View>
        <View>
          <Text style={{fontSize: 20}}>Nhóm 17</Text>
        </View>
        <View>
          <Text style={{fontSize: 16}}>
            20110562 - Đinh Hữu Tài. Sinh năm 2002, quê quán Đồng Nai
          </Text>
        </View>
        <View>
          <Text style={{fontSize: 16}}>20116325 - Phạm Anh Quốc</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

export default App;
