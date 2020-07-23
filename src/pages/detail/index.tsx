import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Item {
    id: number,
    name: string,
    description: string
}

interface Param {
    item: Item
  }

const Detail = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const routeParam = route.params as Param;

    function handleNavigationBack() {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigationBack}>
                    <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "bold", color: "blue" }}>Voltar</Text>
                </TouchableOpacity>
        
                <View style={{ marginTop: 30 }}>
                    <Text>Nome:</Text>
                    <Text style={styles.itemName}>{routeParam.item.name}</Text>
                    <Text>Descrição:</Text>
                    <Text style={styles.itemName}>{routeParam.item.description}</Text>
                </View>
            </View>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 20,
    },
    
    itemName: {
      color: '#322153',
      fontSize: 28,
      marginBottom: 24,
    }
  });

export default Detail;