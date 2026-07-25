'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button"

export default function Counter() {
    const [count, setCount] = useState(0);

    function increase() {
        setCount(count + 1);
    }
    
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
      e.preventDefault();
  
      const formData = new FormData(e.currentTarget);
      const query = formData.get("query");
      alert("You searched: " + query);
  }  
  const fruits = ["Apple", "Banana"]

  return (
    
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        padding: "40px",
      }}
    >
      <h1>WHO</h1>
      <p>LET THE DOGS OUT</p>
      <h2>WHO WHO WHO</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <li>Cabage</li>
          </ul>
          </li>
        ))}
      </ul>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <input
          name="query"
          placeholder="Search..."
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            minWidth: "250px",
          }}
        />
  
        <Button type="submit">Search</Button>
      </form>

      <div>
        <label>
          Que es?{" "}
          <input
            name="input"
            style={{
              marginLeft: "8px",
              padding: "6px 10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </label>
      </div>
  
      <hr style={{ width: "100%", maxWidth: "400px" }} />
  
      <Button
        onClick={increase}
        style={{
          width: "80px",
          height: "80px",
          fontSize: "2rem",
          borderRadius: "50%",
        }}
      >
        {count}
      </Button>
    </div>
  );
}
