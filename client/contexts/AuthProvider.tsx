"use client";
import {
  createUser,
  getUser,
  loginUser,
  logoutUser,
} from "@/services/requests/authentications";
import { User } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface UsersContextType {
  isLoading: boolean;
  isError: unknown;
  login: (email: string, password: string) => void;
  Signup: (user: User) => void;
  user: User | null;
  logout:()=>void
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("usersContext must be used within an AuthProvider'");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const {
    isLoading: isUserLoading,
    isError: isUserError,
    data: userData,
  } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);
  const signupMutation = useMutation({
    mutationFn: (data: User) => createUser(data),
    onSuccess: (data) => {
      console.log("User created Successfully!", data);
      toast.success("user created Sucessfully!");
      window.location.href = "/sign-in";
    },
    onError: (error) => {
      console.log("error while creating a user", error);
      toast.error(error);
    },
  });

  const Signup = (data: User) => {
    signupMutation.mutate(data);
  };

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      window.location.href = "/";
      console.log("User Logged In Successfully!", data);
      toast.success("User Logged In Successfully!");
    },
    onError: (error) => {
      console.log("error while login a user", error);
      toast.error("Error while login a User");
    },
  });

  const login = (email: string, password: string) => {
    loginMutation.mutate({ email, password });
  };
  const loGoutMutation=useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem("token");
      setUser(null);
      window.location.href = "/sign-in";
      console.log("User logged out successfully!");
      toast.success("User logged out successfully!");
    },
    onError: (error) => {
      console.log("Error while logging out a user", error);
      toast.error("Error while logging out a user");
    },
  })

  const logout = () => {
    loGoutMutation.mutate();
  };

  const isLoading = isUserLoading || signupMutation.isPending || loginMutation.isPending;
  const isError = isUserError || signupMutation.isError || loginMutation.isError;
  return (
    <UsersContext.Provider
      value={{
        isLoading,
        isError,
        login: login,
        Signup: Signup,
        user: user,
        logout
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
