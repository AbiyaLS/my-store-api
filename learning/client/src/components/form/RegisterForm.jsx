import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await registerUser(formData);

    if (data) {
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 flex flex-col gap-y-4">
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border"
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border"
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border"
        />
      </div>

      <button type="submit">Register</button>
      <Link to="/login">Already have account? Login</Link>
    </form>
  );
}
