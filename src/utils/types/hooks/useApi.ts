import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Transaction, User, Wallet } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const api = {
  getTransactions: () =>
    apiClient.get<Transaction[]>("/transactions").then((res) => res.data),

  getWallet: () => apiClient.get<Wallet>("/wallet").then((res) => res.data),

  getUser: () => apiClient.get<User>("/user").then((res) => res.data),
};

export const useApi = () => {
  const queryClient = useQueryClient();

  const useTransactions = () => {
    return useQuery({
      queryKey: ["transactions"],
      queryFn: api.getTransactions,
    });
  };

  const useWallet = () => {
    return useQuery({
      queryKey: ["wallet"],
      queryFn: api.getWallet,
    });
  };

  const useUser = () => {
    return useQuery({
      queryKey: ["user"],
      queryFn: api.getUser,
    });
  };

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
    queryClient.invalidateQueries({ queryKey: ["wallet"] });
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return {
    useTransactions,
    useWallet,
    useUser,
    invalidateAll,
  };
};
