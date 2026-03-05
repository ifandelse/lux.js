import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom/client";
// Import stores first so they register with lux before components mount
import "./stores/todoStore";
import "./stores/filterStore";
// Import service to register customActionCreator
import { loadInitialTodos } from "./services/todoService";
import TodoApp from "./components/TodoApp";

ReactDOM.createRoot(document.getElementById("root")!).render(<TodoApp />);

// Seed initial data after mount (defers dispatch until components are subscribed)
setTimeout(() => loadInitialTodos(), 0);
