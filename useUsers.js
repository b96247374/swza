
import { useState, useEffect } from 'react';

const defaultUsers = [
  { id: 1, name: 'عبدالله صالح', username: 'commander', password: '123', rank: 'قائد', role: 'commander' },
  { id: 2, name: 'أحمد محمد علي', username: 'ahmed', password: '123', rank: 'رقيب أول', role: 'user' },
  { id: 3, name: 'خالد فهد', username: 'khaled', password: '123', rank: 'عريف', role: 'user' },
];

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem('report_system_users');
      if (savedUsers && JSON.parse(savedUsers).length > 0) {
        setUsers(JSON.parse(savedUsers));
      } else {
        setUsers(defaultUsers);
        localStorage.setItem('report_system_users', JSON.stringify(defaultUsers));
      }
    } catch (error) {
      console.error("Failed to load users from localStorage", error);
      setUsers(defaultUsers);
    }
  }, []);

  const updateUserList = (newUsers) => {
    setUsers(newUsers);
    localStorage.setItem('report_system_users', JSON.stringify(newUsers));
  };

  const addUser = (user) => {
    const newUser = { ...user, id: Date.now() };
    updateUserList([...users, newUser]);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );
    updateUserList(updatedUsers);
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    updateUserList(updatedUsers);
  };

  return { users, addUser, updateUser, deleteUser };
};
