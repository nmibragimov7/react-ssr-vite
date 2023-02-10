import * as jsxRuntime from "react/jsx-runtime";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { NavLink, Outlet, Routes, Route } from "react-router-dom";
import { useState, memo, useEffect } from "react";
import { shallow } from "zustand/shallow";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";
const Fragment = jsxRuntime.Fragment;
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
const Layout = () => {
  const [user, setUser] = useState(false);
  const logoutHandler = () => {
    setUser((prev) => !prev);
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white-blue min-h-screen", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-blue shadow-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex justify-between py-8 px-8 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
        /* @__PURE__ */ jsx(NavLink, { to: "/", className: "text-primary-blue font-bold", children: "Главная" }),
        /* @__PURE__ */ jsx(NavLink, { to: "/todos", className: "text-primary-blue font-bold", children: "Todos" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-primary-blue font-bold cursor-pointer", onClick: logoutHandler, children: user ? "Выйти" : "Войти" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
};
const Main = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: "Main" });
};
const classes = (...args) => {
  return args.reduce((cls, classes2) => {
    if (typeof classes2 === "string") {
      cls.push(classes2);
    } else if (!!classes2) {
      const validCLs = Object.keys(classes2).filter((clsKey) => classes2[clsKey]);
      cls.push(validCLs.join(" "));
    }
    return cls;
  }, []).join(" ");
};
const styles$2 = {};
const BaseCheckbox = memo((props) => {
  const {
    name,
    classNames,
    children,
    value,
    setValue
  } = props;
  return /* @__PURE__ */ jsx("div", { className: classes(styles$2.BaseCheckbox), children: /* @__PURE__ */ jsxs(
    "label",
    {
      htmlFor: name,
      className: "flex items-center cursor-pointer",
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            id: name,
            type: "checkbox",
            className: "opacity-0 w-0 h-0",
            checked: value,
            onChange: () => setValue(!value)
          }
        ),
        /* @__PURE__ */ jsx("span", { className: classes(
          "w-6 h-6 rounded-md border border-solid border-gray-100 mr-2.5 relative",
          classNames || "",
          { "after:absolute after:content-[''] after:translate-x-[-50%] after:translate-y-[-50%] after:rounded after:w-4 after:h-4 after:top-1/2 after:left-1/2 after:bg-primary-blue": value }
        ) }),
        /* @__PURE__ */ jsx("span", { children })
      ]
    }
  ) });
});
const useTodos = create(devtools(persist(
  (set, get) => ({
    todos: [],
    loading: false,
    error: null,
    addTodo: (title) => {
      set({ todos: [...get().todos, { id: get().todos.length + 1, title, completed: false }] });
    },
    toggleTodo: (id) => {
      set({
        todos: get().todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
      });
    },
    fetchTodos: async () => {
      set({ loading: true });
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10");
        if (response.status !== 200)
          throw new Error("Ошибка при загрузке данных");
        set({ todos: response.data, error: null });
      } catch (e) {
        set({ error: e.message });
      } finally {
        set({ loading: false });
      }
    },
    setTodos: (todos) => {
      set({ todos });
    }
  }),
  {
    name: "todos"
  }
)));
create((set) => ({
  filter: "all",
  setFilter: (value) => set({ filter: value })
}));
const styles$1 = {};
const Todo = (props) => {
  const toggleTodo = useTodos((state) => state.toggleTodo);
  const {
    item,
    className
  } = props;
  return /* @__PURE__ */ jsx("div", { className: [styles$1.Todo, className].join(" "), children: /* @__PURE__ */ jsx(BaseCheckbox, { name: `todo-${item.id}`, value: item.completed, setValue: () => toggleTodo(item.id), children: item.title }) });
};
const BaseButton$1 = "_BaseButton_4dkrv_1";
const primary = "_primary_4dkrv_4";
const outline = "_outline_4dkrv_7";
const styles = {
  BaseButton: BaseButton$1,
  primary,
  outline
};
const BaseButton = (props) => {
  const { type = "primary", disabled = false, className, children, onClick } = props;
  return /* @__PURE__ */ jsx(
    "button",
    {
      disabled,
      className: classes(styles.BaseButton, className || "", styles[type]),
      onClick,
      children
    }
  );
};
const Todos = (props) => {
  const todos = useTodos((state) => state.todos);
  const setTodos = useTodos((state) => state.setTodos);
  const { loading, error, fetchTodos } = useTodos((state) => ({
    loading: state.loading,
    error: state.error,
    fetchTodos: state.fetchTodos
  }), shallow);
  useEffect(() => {
    fetchTodos();
  }, []);
  if (props.items) {
    setTodos(props.items);
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
      BaseButton,
      {
        disabled: loading,
        className: "!bg-gray-100 !text-dark max-w-xs mx-auto mb-8",
        onClick: fetchTodos,
        children: !error ? "Get todos" : error
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 max-w-md mx-auto", children: [
      props.items && props.items.map((todo) => /* @__PURE__ */ jsx(Todo, { item: todo }, todo.id)),
      todos && todos.map((todo) => /* @__PURE__ */ jsx(Todo, { item: todo }, todo.id))
    ] })
  ] });
};
const App = (props) => {
  return /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsxs(Route, { path: "/", element: /* @__PURE__ */ jsx(Layout, {}), children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(Main, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "todos", element: /* @__PURE__ */ jsx(Todos, { items: props.items }) })
  ] }) });
};
function render(url, _, props) {
  const html = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(StaticRouter, { location: `/${url}`, children: /* @__PURE__ */ jsx(App, { ...props }) })
  );
  return { html };
}
export {
  render
};
