import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import PropTypes from "prop-types";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.text); // 🔥 Fixed: Using "text" instead of "todo"

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, text: todoMsg }); // 🔥 Fixed: "text" instead of "todo"
    setIsTodoEditable(false);
  };

  return (
    <div
      className={`m-0.125 flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      {/* Checkbox for completion */}
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />

      {/* Editable Todo Input */}
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        }`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      {/* Edit/Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>

      {/* Delete Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

// 🔥 Fixed: Corrected PropTypes definition
TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired, // Fixed: ID is a number, not a string
    text: PropTypes.string.isRequired, // Fixed: Using "text" instead of "todo"
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
