import React, { useEffect, useState } from "react";

export interface CounterProps {
  description: string;
  defaultCount: number;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export function Counter({ description, defaultCount }: CounterProps) {
  const [count, setCount] = useState(defaultCount);
  const [todo, setTodo] = useState<Todo>();
  useEffect(() => {
    async function loadData() {
      const resp = await fetch(
        "https://jsonplaceholder.typicode.com/todos/" + description
      );
      const json = await resp.json();
      setTodo(json);
    }
    loadData();
  }, [description]);
  return (
    <div>
      <h5>
        DESC: {description} - DC: {defaultCount}
        {todo?.title}
      </h5>

      <button
        onClick={() => {
          setTimeout(() => {
            setCount((prev) => prev - 1);
          }, 3000);
        }}
      >
        -
      </button>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
