import React from 'react';
import { View, StyleSheet } from 'react-native';
import Menubar from '../components/Menubar';
import Header from '../components/Header';

const Home = () => {
  return (
    <View style={styles.container}>
      <Menubar />
      <Header />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default Home;
