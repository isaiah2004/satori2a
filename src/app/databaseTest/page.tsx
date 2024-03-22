"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Item {
   _id: string;
   name: string;
   description: string;
}

function DBPage() {
   const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    axios.get("/api/items")
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DBPage;