import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './CoreTeam.css';
import CoreTeamDetails from '../CoreTeamDetails/CoreTeamDetails';

const CoreTeam = () => {
  const [coreMembers, setCoreMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoreMembers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/core-members`);
        setCoreMembers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch core team members');
        setLoading(false);
        console.error('Error fetching core team members:', err);
      }
    };

    fetchCoreMembers();
  }, []);

  return (
    <>
      
      <section className="core-team-section">
        <div className="container">
          <h2 className="section-title">Our Core Team</h2>
          
          {loading ? (
            <div className="loader-container">
              <div className="spinner-loader">
                <div className="spinner-inner"></div>
              </div>
              <p>Loading amazing team members...</p>
            </div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <ul className="team-list">
              {coreMembers.map((member) => (
                <li key={member.id} className="team-list-item">
                  <CoreTeamDetails member={member} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default CoreTeam;
