import { useState } from 'react';
import './App.css'
import { hc } from 'hono/client';
import { ApiRotuer } from "../../server/app";

function App() {
  const [all, setAll] = useState<any>();

  const client = hc<ApiRotuer>("/");

  const getAll = async () => {
    const res = await client.api.todo.$get();
    const json = await res.json();
    setAll(json);
  }

  return (
    <>
      <button onClick={getAll}>获取所有todo</button>
      <pre>
        {
          JSON.stringify(all, null, 2)
        }
      </pre>
      <button>新建一个todo</button>
    </>
  )
}

export default App
