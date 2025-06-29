import { userProps } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export async function handleSubmit(
  e: any,
  router: AppRouterInstance,
  avatarId: string,
  socket: any
) {
  e.preventDefault();
  console.log(e.target[1].value);
  try {
    const res = await fetch("http://localhost:4000/send-otp", {
      method: "POST",
      body: JSON.stringify({
        name: e.target[0].value,
        email: e.target[1].value,
        imageId: `https://robohash.org/${avatarId}.png`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.log("Error in creating user");
    }
    socket.emit("joined", "new user");
    router.push("/verify");
  } catch (err) {
    console.log(err);
  }
}

export async function fetchUser(
  cookie: { user?: userProps },
  setUser: { (user: userProps): void; (arg0: any): void }
) {
  const accessToken = cookie.user;
  console.log("Access Token:", accessToken);
  const response = await fetch("http://localhost:4000/user", {
    method: "GET",
    headers: {
      Authorization: `${accessToken}`,
    },
  });
  const user = await response.json();
  setUser(user[0]);
}

export async function fetcAllhUsers(mySelf: userProps, setUsers: any) {
  const data = await fetch("http://localhost:4000/users");
  const myUsers = await data.json();
  setUsers(myUsers.filter((user: userProps) => user.email !== mySelf?.email));
}

export async function fetchUsers(
  mySelf: userProps,
  setUsers: (users: any[]) => void,
  cookie: { user?: any }
) {
  const accessToken = cookie.user;
  if (!accessToken) {
    console.error("No access token provided");
    setUsers([]);
    return;
  }

  const data = await fetch("http://localhost:4000/connections", {
    method: "GET",
    headers: {
      Authorization: `${accessToken}`,
    },
  });

  if (!data.ok) {
    console.error("Failed to fetch users:", data.status);
    setUsers([]);
    return;
  }

  const myUsers = await data.json();

  if (!Array.isArray(myUsers)) {
    console.error("Users response is not an array:", myUsers);
    setUsers([]);
    return;
  }

  setUsers(myUsers.filter((user: any) => user.email !== mySelf?.email));
}

export async function fetchMessages(
  sender: any,
  reciver: any,
  setMessages: (msgs: any[]) => void
) {
  if (!sender?._id || !reciver?._id) return;

  try {
    const res = await fetch(
      `http://localhost:4000/messages?senderId=${sender._id}&reciverId=${reciver._id}`
    );
    if (!res.ok) throw new Error("Failed to fetch messages");
    const data = await res.json();
    setMessages(data);
  } catch (err) {
    console.error(err);
    setMessages([]);
  }
}
