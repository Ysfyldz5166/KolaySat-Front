/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { loadLoginState } from "../state/storage";
import './Profile.css'; // Profil sayfası için özel stiller

export function Profile() {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = loadLoginState()?.id;
        const response = await axios.get(`/api/v1/users/${userId}`);

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (currentPassword && newPassword) {
      try {
        const userId = loadLoginState()?.id;
        const response = await axios.put(`/api/v1/users/${userId}`, {
          ...userData,
          password: newPassword,
        });
        setMessage("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
      } catch (error) {
        setMessage("Error updating password");
      }
    } else {
      setMessage("Please provide current and new passwords");
    }
  };

  return (
    <div className="container mt-4 profile-container">
      <div className="user-info mb-4 p-4 shadow rounded bg-light">
        <h3>Kullanıcı Bilgileri</h3>
        <ul className="list-unstyled">
          <li><strong>Kullanıcı Adı:</strong> {userData.userName}</li>
          <li><strong>Email:</strong> {userData.email}</li>
        </ul>
      </div>
      <div className="password-reset p-4 shadow rounded bg-light">
        <h3>Şifre Yenileme</h3>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label">
              Mevcut Şifre
            </label>
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              Yeni Şifre
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Şifreyi Güncelle
          </button>
        </form>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
}
