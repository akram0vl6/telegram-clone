import { selectedUserState, userState } from "@/types";
import { create } from "zustand";

export const useUser = create<userState>((set) => ({
    myUser: undefined,
    setUser:(user)=>set({myUser:user}),
}))


interface OnlineContactsState {
  onlineUsers: any; // или User[] — зависит от того, что приходит от сокета
  setOnlineUsers: (users: any) => void;
}

export const useOnlineContacts = create<OnlineContactsState>((set) => ({
  onlineUsers: [],
  setOnlineUsers: (users) => set({ onlineUsers: users }),
}));

export const useAllUsers = create((set) => ({
  users: [],           // все пользователи
  filteredUsers: [],   // отображаемые пользователи (контакты или поиск)

  setUsers: (users: any[]) => set({ users }),
  setFilteredUsers: (filtered: any[]) => set({ filteredUsers: filtered }),

  filterContacts: (contactsIds: string[], users: any[]) => {
    const contacts = users.filter(user => contactsIds.includes(user._id.toString()));
    set({ filteredUsers: contacts });
  },

  searchUsers: (searchText: string, users: any[], contactsIds: string[]) => {
    if (!searchText.trim()) {
      // Показать контакты если нет поиска
      const contacts = users.filter(user => contactsIds.includes(user._id.toString()));
      set({ filteredUsers: contacts });
      return;
    }
    // Поиск по имени среди всех пользователей
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    set({ filteredUsers: filtered });
  }
}));



export const useSelectedUser = create<selectedUserState>((set) => ({
    selectedUser: undefined,
    setSelectedUser:(user)=>set({selectedUser:user})
}))

export const useMessages = create((set) => ({
  messages: [],
  setMessages: (update: any[] | ((prev: any[]) => any[])) => {
    if (typeof update === "function") {
      // Обработка функционального обновления
      set((state: any) => {
        const newMessages = update(state.messages);
        if (!Array.isArray(newMessages)) {
          console.warn("⛔ Функция setMessages вернула не массив:", newMessages);
          return {};
        }
        return { messages: newMessages };
      });
    } else if (Array.isArray(update)) {
      // Прямое обновление массива
      set({ messages: update });
    } else {
      console.warn("⛔ Попытка записать не-массив в messages:", update);
    }
  },
}));

