import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Item {
    id: number,
    name: string,
    description: string
}

const Home = () => {

    const baseURL = 'https://api.github.com';
    const [ data, setData ] = useState<Item[]>([]);
    const [ page, setPage ] = useState<number>(1);
    const [ loading, setLoading ] = useState<Boolean>(false);

    const navigation = useNavigation();

    const loadRepositories = async () => {

        setLoading(true);

        const response = await fetch(`${baseURL}/search/repositories?q=react&per_page=20&page=${page}`);
        const repositories = await response.json();

        setData([ ...data, ...repositories.items ]);
        setPage(page + 1);
        setLoading(false);
    };

    const renderItem = ({ item }: { item: Item }) => (
        <TouchableWithoutFeedback onPress={ () => onItemPress(item)}>
            <View style={styles.listItem}>
              <Text style={styles.listItemName}>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    const renderFooter = () => {
        if (!loading) return null;
        return (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        );
      };

    const onItemPress = (item: Item) => {
      navigation.navigate('Detail', { item: item });
    };

    useEffect(() => {
        loadRepositories();
    }, []);

    return (
        <FlatList
          style={{ marginTop: 30 }}
          contentContainerStyle={styles.list}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          onEndReached={loadRepositories}
          onEndReachedThreshold={0.1} //A propriedade onEndReachedThreshold define basicamente o percentual de distância do fim que o usuário deve chegar para carregar novos dados, nesse caso, 0.1 significa 10%
          ListFooterComponent={renderFooter}
        />
    );
};

const styles = StyleSheet.create({
    list: {
      paddingHorizontal: 20,
    },
    listItem: {
      backgroundColor: '#CDD4E4',
      marginTop: 20,
      padding: 30,
    },
    listItemName: {
      fontWeight: "bold" 
    },
    loading: {
      alignSelf: 'center',
      marginVertical: 20,
    }
});

export default Home;