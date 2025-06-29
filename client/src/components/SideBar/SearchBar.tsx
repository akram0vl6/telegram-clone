import { useAllUsers } from "@/store/userStore";
import { userProps } from "@/types";
import { SearchIcon } from "@/utils/icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function SearchBar({ user }: { user: userProps }) {
  const [searchTerm, setSearchTerm] = useState("");
      const img = localStorage.getItem("avatarId");
  const { users, setFilteredUsers, filteredUsers, filterContacts } =
    useAllUsers((state: any) => ({
      users: state.users,
      filteredUsers: state.filteredUsers,
      setFilteredUsers: state.setFilteredUsers,
      filterContacts: state.filterContacts,
    }));

  useEffect(() => {
    // Ждём, пока и user, и users загрузятся
    if (!users || !users.length || !user) {
      return;
    }

    if (!searchTerm.trim()) {
      // Если строка поиска пустая — показываем контакты
      filterContacts(user.connections || [], users);
    } else {
      // Иначе — фильтрация по email
      const filtered = users.filter((u: userProps) =>
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [
    searchTerm,
    users,
    user, // отслеживаем загрузку user
    filterContacts, // и функцию фильтрации
    setFilteredUsers, // и функцию установки
  ]);

  return (
    <div className="flex gap-4">
      <div className="avatar">
        <div className="w-12 rounded-full ring">
          <Image
            src={`https://robohash.org/${img}.png`} 
            width={256}
            height={256}
            alt="avatar"
          />
        </div>
      </div>
      <div className="relative w-full">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search"
          className="input pl-12 rounded-full input-bordered w-full bg-gray-100 placeholder:text-gray-500"
        />
        <div
          onClick={() => console.log(filteredUsers)}
          className="w-6 h-6 absolute top-1/2 left-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
