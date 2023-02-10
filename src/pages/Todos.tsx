import React, {useEffect} from 'react';
import {shallow} from "zustand/shallow";

import Todo from "../components/widgets/Todo/Todo";
import BaseButton from "../components/shared/BaseButton/BaseButton";
import {TodoProps} from "../core/model/types";
import {useTodos} from "../store";

const Todos: React.FC = (props: any) => {
    const todos: TodoProps[] = useTodos(state => state.todos);
    const setTodos = useTodos(state => state.setTodos);
    const { loading, error, fetchTodos } = useTodos(state => ({
        loading: state.loading,
        error: state.error,
        fetchTodos: state.fetchTodos
    }), shallow);
    useEffect(() => {
        fetchTodos();
    }, []);
    if(props.items) {
        setTodos(props.items);
    }

    return (
        <>
            <div className={"flex justify-center"}>
                <BaseButton
                    disabled={loading}
                    className={"!bg-gray-100 !text-dark max-w-xs mx-auto mb-8"}
                    onClick={fetchTodos}
                >
                    {!error ? "Get todos" : error}
                </BaseButton>
            </div>
            <div className={"flex flex-col gap-2 max-w-md mx-auto"}>
                {props.items && props.items.map((todo: TodoProps) => (
                    <Todo key={todo.id} item={todo}/>
                ))}
                {todos && todos.map((todo: TodoProps) => (
                    <Todo key={todo.id} item={todo}/>
                ))}
            </div>
        </>
    );
};

export default Todos;
