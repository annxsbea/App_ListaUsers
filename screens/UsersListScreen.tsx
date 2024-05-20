import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import { getUsers } from '../services/api';
import { NavigationScreenProp } from 'react-navigation';
import AntDesign from '@expo/vector-icons/AntDesign';
import Notification from '../componentes /Notification';


interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface ScreenProps {}

const UsersListScreen: React.FC<{ navigation: NavigationScreenProp<ScreenProps> }> = ({ navigation }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const notifyMessage = (msg: string) => {
    return <Notification message={msg} />;
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        notifyMessage('Erro ao carregar Users: ' );
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUserPress = (userId: string) => {
    navigation.navigate('UserDetails', { userId });
  };
  

  const handleCreateUserPress = () => {
    navigation.navigate('UserDetails');
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#343476" />;

  }



  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
         <Text style={styles.title}>Lista de Users</Text>
         <View style={styles.addButtonContainer}>
         <Button title="+ User" onPress={handleCreateUserPress}  color={'#343476'} /> 
        </View>
        </View>
       
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userName}>{`${item.firstName} ${item.lastName}`}</Text>
            <TouchableOpacity style={styles.detailsButton} onPress={() => handleUserPress(item.id)}>
              <AntDesign name="eyeo" size={24} color="#343476" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: '#fff',
  
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  userContainer: {
    padding: 16,
    marginTop: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row', justifyContent: 'space-between'

  },
  userName: {
    fontSize: 16,
    marginBottom: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    addButtonContainer: {
      backgroundColor: '#343476',
      borderRadius: 8,
      padding: 10,
      marginVertical: 10,
      width: 100,
    },
    detailsButton: {
        flexDirection: 'row',
        backgroundColor: '#ead8f0',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      detailsButtonText: {
        color: 'black',
        fontSize: 16,
        marginRight: 8,
      },
  });


export default UsersListScreen;
