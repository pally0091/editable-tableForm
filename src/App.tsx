import React, { useState } from "react";
import "./App.css";

interface User {
  name: string;
  amount: string;
  production: string;
  expiry: string;
  price: string;
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
  const total = parseFloat(user.price) + parseFloat(user.amount);
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
          name="amount"
          value={user.amount}
          onChange={valueChangeHandler}
        />
      </td>
      <td>
        <input
          type="month"
          name="production"
          value={user.production}
          onChange={valueChangeHandler}
        />
      </td>
      <td>
        <input
          type="month"
          name="expiry"
          value={user.expiry}
          onChange={valueChangeHandler}
        />
      </td>
      <td>{total}</td>
      <td>
        <input
          type="number"
          name="price"
          value={user.price}
          onChange={valueChangeHandler}
        />
      </td>
    </tr>
  );
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [formValues, setFormValues] = useState<User>({
    name: "",
    amount: "",
    production: "",
    expiry: "",
    price: "",
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
    const { name, amount, production, expiry, price } = formValues;
    const newUser = {
      name,
      amount,
      production,
      expiry,
      price,
    };
    // console.log(newUser);
    setUsers([...users, newUser]);
    setFormValues({
      name: "",
      amount: "",
      production: "",
      expiry: "",
      price: "",
    });
  };

  const handleUserChange = (index: number, updatedUser: User) => {
    const updatedUsers = [...users];
    updatedUsers[index] = updatedUser;
    setUsers(updatedUsers);
  };

  console.log(users);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Quantity</td>
              <td>Production</td>
              <td>Expiry</td>
              <td>Total</td>
              <td>Price</td>
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
                  name="amount"
                  onChange={handleChange}
                  value={formValues.amount}
                />
              </td>
              <td>
                <input
                  type="month"
                  name="production"
                  onChange={handleChange}
                  value={formValues.production}
                />
              </td>
              <td>
                <input
                  type="month"
                  name="expiry"
                  onChange={handleChange}
                  value={formValues.expiry}
                />
              </td>
              <td>
                <p>Total price</p>
              </td>

              <td>
                <input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  value={formValues.price}
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
