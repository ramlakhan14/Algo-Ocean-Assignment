import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function FormPage() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', dob: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.dob) {
      return setError('Please fill in all fields');
    }

    try {
      await axios.post('http://localhost:5000/api/user', formData);
      localStorage.setItem('user', JSON.stringify(formData));
      navigate('/display');
    } catch {
      setError('❌ Failed to save user. Please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-4">👤 User Registration</h3>

        {error && (
          <div className="alert alert-danger text-center py-2" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="Enter first name"
              onChange={handleChange}
              value={formData.firstName}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Enter last name"
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="form-control"
              onChange={handleChange}
              value={formData.dob}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            🚀 Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormPage;
