import React, { useState } from "react";
import "./App.css";

interface User {
  name: string;
  email: string;
  a: string;
  b: string;
}

const InputRow: React.FC<{ user: User; onChange: (user: User) => void }> = ({
  user,
  onChange,
}) => {
  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...user,
      [name]: value,
    });
  };
  // total
  const total = parseFloat(user.a) + parseFloat(user.b);
  return (
    <tr>
      <td>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={valueChangeHandler}
        />
      </td>
      <td>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={valueChangeHandler}
        />
      </td>
      <td>
        <input
          type="number"
          name="a"
          value={user.a}
          onChange={valueChangeHandler}
        />
      </td>
      <td>
        <input
          type="number"
          name="b"
          value={user.b}
          onChange={valueChangeHandler}
        />
      </td>
      <td>{total}</td>
    </tr>
  );
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [formValues, setFormValues] = useState<User>({
    name: "",
    email: "",
    a: "",
    b: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  // console.log(formValues);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, a, b } = formValues;
    const newUser = {
      name,
      email,
      a,
      b,
    };
    // console.log(newUser);
    setUsers([...users, newUser]);
    setFormValues({
      name: "",
      email: "",
      a: "",
      b: "",
    });
  };

  const handleUserChange = (index: number, updatedUser: User) => {
    const updatedUsers = [...users];
    updatedUsers[index] = updatedUser;
    setUsers(updatedUsers);
  };

  // console.log(users);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <td>name</td>
              <td>email</td>
              <td>a</td>
              <td>b</td>
              <td>sum</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <InputRow
                key={index}
                user={user}
                onChange={(updatedUser) => handleUserChange(index, updatedUser)}
              />
            ))}
            <tr>
              <td>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={formValues.name}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={formValues.email}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="a"
                  onChange={handleChange}
                  value={formValues.a}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="b"
                  onChange={handleChange}
                  value={formValues.b}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">submit</button>
      </form>
    </>
  );
}
