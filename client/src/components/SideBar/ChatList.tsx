'use client';
import React, { useEffect, useState } from 'react';
import { useAllUsers, useOnlineContacts } from '@/store/userStore';
import { fetcAllhUsers, fetchUsers } from '@/lib/fetchers';
import ChatItem from './ChatItem';
import { useCookies } from 'react-cookie';
import { shallow } from 'zustand/shallow';
import { socket } from '@/lib/socket';
import { userProps } from '@/types';

function ChatList({ mySelf }: any) {
  const [cookie] = useCookies(['user']);
  const { onlineUsers, setOnlineUsers } = useOnlineContacts();

  const { users, filteredUsers, setUsers, setFilteredUsers, searchUsers, filterContacts } =
    useAllUsers<any>(
      (state: any) => ({
        users: state.users,
        filteredUsers: state.filteredUsers,
        setUsers: state.setUsers,
        setFilteredUsers: state.setFilteredUsers,
        searchUsers: state.searchUsers,
        filterContacts: state.filterContacts,
      }),
      shallow
    );

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // 🔥 Сокет-инициализация: авторизация и запрос онлайн-контактов
  useEffect(() => {
    const accessToken = cookie.user;
    if (!accessToken || !socket) return;

    // Авторизация на сокет-сервере
    socket.emit('identify', accessToken);

    // Запрашиваем онлайн-контакты
    socket.emit('get-online-contacts', accessToken);

    // Обработка ответа
    socket.on('online-contacts', (contacts) => {
      console.log('🟢 Онлайн контакты:', contacts);
      setOnlineUsers(contacts)
    });

    return () => {
      socket.off('online-contacts');
    };
  }, [cookie.user]);

  // Обновление при новом пользователе
  useEffect(() => {
    socket.on('new-user', () => {
      loadUsers();
    });

    return () => {
      socket.off('new-user'); // ❗️а не socket.disconnect(), иначе разорвёшь соединение
    };
  }, []);

  // Загрузка пользователей и контактов
  async function loadUsers() {
    setLoading(true);
    await fetcAllhUsers(mySelf, setUsers);
    await fetchUsers(mySelf, setFilteredUsers, cookie);
    setLoading(false);
  }

  // Первая загрузка
  useEffect(() => {
    loadUsers();
  }, []);

  // Поиск
  useEffect(() => {
    if (!search.trim()) {
      filterContacts(mySelf.connections || [], users);
    } else {
      searchUsers(search, users, mySelf.connections || []);
    }
  }, [search, users, mySelf.connections, filterContacts, searchUsers]);

  if (loading) {
    return (
      <ul className="my-5 flex justify-center">
        <span className="loading loading-ring w-16"></span>
      </ul>
    );
  }

  if (!filteredUsers || filteredUsers.length === 0) {
    return (
      <ul className="my-5 flex justify-center">
        <li className="text-gray-500">No users found.</li>
      </ul>
    );
  }

return (
  <ul className="my-5 flex flex-col">
    {filteredUsers
      .slice()
      .reverse()
      .map((u: userProps) => {
        const isOnline = onlineUsers.some((onlineUser: any) => onlineUser._id === u._id);
        return <ChatItem key={u._id} user={u} isOnline={isOnline} />;
      })}
  </ul>
);

}

export default ChatList;
