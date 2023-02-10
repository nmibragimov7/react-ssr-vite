import {create, StateCreator} from "zustand";
import {devtools, persist, PersistOptions} from "zustand/middleware";
import axios from "axios";

import {TodoProps} from "../core/model/types";

interface ITodo {
    todos: TodoProps[];
    loading: boolean;
    error: string | null;
    addTodo: (value: string) => any;
    toggleTodo: (id: number) => any;
    fetchTodos: () => any;
    setTodos: (todos: TodoProps[]) => void;
}

interface IFilter {
    filter: string;
    setFilter: (value: string) => any
}

type MyPersist = (
    config: StateCreator<ITodo>,
    options: PersistOptions<ITodo>
) => StateCreator<ITodo>

type MyDevtools = (
    config: StateCreator<ITodo>
) => StateCreator<ITodo>

export const useTodos = create<ITodo>((devtools as  MyDevtools)((persist as MyPersist)(
    (set, get) => ({
        todos: [],
        loading: false,
        error: null,
        addTodo: (title: string) => {
            set({ todos: [...get().todos, { id: get().todos.length + 1, title, completed: false }] });
        },
        toggleTodo: (id: number) => {
            set({
                todos: get().todos.map((todo: TodoProps) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
            });
        },
        fetchTodos: async () => {
            set({ loading: true });
            try {
                const response: any = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10");
                if(response.status !== 200) throw new Error("Ошибка при загрузке данных");
                set({ todos: response.data, error: null });
            } catch (e: any) {
                set({ error: e.message });
            } finally {
                set({ loading: false });
            }
        },
        setTodos: (todos: TodoProps[]) => {
            set({ todos: todos });
        }
    }),
    {
        name: 'todos'
    }
)));

export const useFilter = create<IFilter>((set) => ({
    filter: "all",
    setFilter: (value: string) => set({ filter: value })
}));
