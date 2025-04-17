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

  const insertOne = async () => {
    const res = await client.api.todo.$post({
      json: {
        title: ""
      }
    });
    if (!res.ok) {
      console.log(await res.text());
    }

    const json = await res.json();
    console.log(json);
  }

  return (
    <>
      <button onClick={getAll}>获取所有todo</button>
      <pre>
        {
          JSON.stringify(all, null, 2)
        }
      </pre>
      <button onClick={insertOne}>新建一个todo</button>
    </>
  )
}

export default App
