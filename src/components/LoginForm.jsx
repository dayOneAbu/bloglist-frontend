import { useState } from "react";

function LoginForm({ onsubmitHandler }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h2>log into the application</h2>
      <form onSubmit={onsubmitHandler}>
        <div>
          <label htmlFor="userName">
            userName {""}
            <input
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password {""}
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
}
export default LoginForm;
