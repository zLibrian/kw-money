import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface ITransaction {
  id: number;
  title: string;
  category: string;
  type: string;
  amount: number;
  createdAt: string;
}

type ITransactionInput = Omit<ITransaction, "id" | "createdAt">;

interface ITransactionProviderProps {
  children: ReactNode;
}

interface ITransactionContextData {
  transactions: ITransaction[];
  setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>;
  createTransaction: (transaction: ITransactionInput) => void;
}

export const TransactionContext = createContext<ITransactionContextData>(
  {} as ITransactionContextData
);

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = (props: ITransactionProviderProps) => {
  const { children } = props;

  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await api.get("transactions");
      setTransactions(data.transactions);
    };
    fetchTransactions();
  }, []);

  const createTransaction = async (transaction: ITransactionInput) => {
    await api.post("transactions", transaction);
  };

  const contextValue: ITransactionContextData = {
    transactions,
    setTransactions,
    createTransaction,
  };

  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
};
