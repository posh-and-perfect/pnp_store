import { useState } from 'react';
import { useRouter } from 'next/router';

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '', // New field for phone
    address: '', // New field for address
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit the form data to the backend for signup
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to the dashboard or any other page after successful signup
        router.push('/account/signin');
      } else {
        // Handle signup error
        const errorData = await response.json();
        console.error('Failed to sign up:', errorData.error);
        // Display an error message to the user
      }
    } catch (error) {
      console.error('Failed to sign up:', error);
      // Display an error message to the user
    }
  };


  return (
    <form className="form-default" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-block btn-primary">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;

