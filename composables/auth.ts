import { User } from "@/types";
import { storage } from "wxt/storage";
import { useApi } from "./api";

const user = ref<User | null>(null);

export const useAuth = () => {
  const api = useApi();

  const userStorageKey = "local:user";

  const setUser = async (_user: User) => {
    await storage.setItem(userStorageKey, _user);

    user.value = _user;
  };

  const login = async () => {
    try {
      const localUser = await storage.getItem<User>(userStorageKey);

      if (localUser != null) {
        return await setUser(localUser);
      }

      const data = await api.getToken({
        email: "test@maxint.com",
        password: "12345678",
      });

      if (data == null) {
        throw new Error("Failed to login");
      }

      return await setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    await storage.removeItem(userStorageKey);
    user.value = null;
  };

  /**
   * Actually this isn't properly authenticated
   * but it's good enough for now
   */
  const isAuthenticated = async () => {
    const localUser = await storage.getItem<User>(userStorageKey);

    if (localUser != null) {
      await setUser(localUser);
      return true;
    } else {
      return false;
    }
  };

  return {
    user: readonly(user),
    setUser,
    login,
    logout,
    isAuthenticated,
  };
};
