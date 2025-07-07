import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function calculateAge(dob) {
  const birth = new Date(dob);
  const ageDiff = Date.now() - birth.getTime();
  return new Date(ageDiff).getUTCFullYear() - 1970;
}

function DisplayPage() {
  const [user, setUser] = useState(null);
  const [dogImage, setDogImage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user');
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
      } catch {
        const local = localStorage.getItem('user');
        if (local) setUser(JSON.parse(local));
        else setError('No user data found');
      }

      try {
        const dog = await axios.get('https://dog.ceo/api/breeds/image/random');
        setDogImage(dog.data.message);
      } catch {
        setError('Failed to load dog image');
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="alert alert-danger mt-5 container">{error}</div>;
  if (!user) return <div className="container mt-5 text-center">Loading...</div>;

  return (
    <div className="container mt-5 text-center">
      <img src={dogImage} alt="Dog" className="img-thumbnail mb-3" style={{ width: 180 }} />
      <h3>{user.firstName} {user.lastName}</h3>
      <p><strong>DOB:</strong> {user.dob}</p>
      <p><strong>Age:</strong> {calculateAge(user.dob)} years</p>
      <button className="btn btn-secondary" onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
}

export default DisplayPage;
