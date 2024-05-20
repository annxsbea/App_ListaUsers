import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getUserById, createUser, editUser, deleteUser } from '../services/api';

const UserDetailsScreen = ({ route, navigation }) => {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const userId = route.params?.userId;

  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId);
      setIsEditing(true);
    }
  }, [userId]);

  const fetchUserDetails = async (id: string) => {
    const userData = await getUserById(id);
    if (userData) {
      setUser(userData);
    }
  };

  const handleSave = async () => {
    if (isEditing) {
      const updatedUser = await editUser(userId, user);
      if (updatedUser) {
        navigation.goBack();
      }
    } else {
      const newUser = await createUser(user);
      if (newUser) {
        navigation.goBack();
      }
    }
  };

  const handleDelete = async () => {
    const deletedUser = await deleteUser(userId);
    if (deletedUser) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 16, textAlign: 'center'}}>
        {isEditing ? 'Edit User' : 'Create User'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={user.firstName}
        onChangeText={(text) => setUser({ ...user, firstName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={user.lastName}
        onChangeText={(text) => setUser({ ...user, lastName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <View style={styles.buttonContainer}>
        <Button title={isEditing ? "Edit User" : "Create User"} onPress={handleSave} color={'#343476'} />
        {isEditing && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete User</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    marginTop: 0,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 12,
    paddingVertical: 8,
    
    width: '80%',
    alignSelf: 'center',
    marginTop: 36,
  },
  buttonContainer: {
    marginTop: 36,
    alignItems: 'center',
    
    
  },
  deleteButton: {
    backgroundColor: '#580202',

    paddingVertical: 8,
    height: 50,
    width: '50%',
    marginTop: 36,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserDetailsScreen;
