// frontend/src/pages/SettingsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, Lock, Mail, Phone } from 'lucide-react';

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { email, phoneNumber } = formData;
  const { oldPassword, newPassword, confirmNewPassword } = passwordData;

  // Mengambil data saat ini untuk ditampilkan di form
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      navigate('/login');
    } else {
      setFormData({
        email: userInfo.email || '',
        phoneNumber: userInfo.phoneNumber || '',
      });
    }
  }, [navigate]);

  const onSettingChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onPasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        'http://localhost:5000/api/users/profile/settings',
        { email, phoneNumber },
        config
      );

      // Update localStorage
      const updatedUserInfo = { ...userInfo, email: data.email, phoneNumber: data.phoneNumber, token: data.token };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

      setMessage(data.message || 'Pengaturan berhasil diperbarui.');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memperbarui pengaturan.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError('Password baru tidak cocok.');
      return;
    }
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        'http://localhost:5000/api/users/profile/password',
        { oldPassword, newPassword },
        config
      );
      setMessage(data.message || 'Password berhasil diperbarui.');
      setPasswordData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memperbarui password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full max-w-2xl mx-auto">
      {message && <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">{message}</div>}
      {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}

      {/* --- Kartu Pengaturan Akun --- */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="flex items-center p-4 border-b">
          <Mail className="h-6 w-6 mr-3 text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-800">Pengaturan Akun</h3>
        </div>
        <form onSubmit={handleSettingsSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onSettingChange}
              className="w-full p-2 border rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]"
              placeholder="Email Anda"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phoneNumber">
              Nomor Telepon
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={phoneNumber}
              onChange={onSettingChange}
              className="w-full p-2 border rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]"
              placeholder="Nomor Telepon Anda"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#3a9bdc] text-white rounded-lg font-semibold hover:bg-[#2582c0] disabled:bg-gray-400"
            >
              {loading ? 'Menyimpan...' : 'Simpan Pengaturan'}
            </button>
          </div>
        </form>
      </div>

      {/* --- Kartu Ganti Password --- */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="flex items-center p-4 border-b">
          <Lock className="h-6 w-6 mr-3 text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-800">Ganti Password</h3>
        </div>
        <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="oldPassword">
              Password Lama
            </label>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              value={oldPassword}
              onChange={onPasswordChange}
              className="w-full p-2 border rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="newPassword">
              Password Baru
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={newPassword}
              onChange={onPasswordChange}
              className="w-full p-2 border rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmNewPassword">
              Konfirmasi Password Baru
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={onPasswordChange}
              className="w-full p-2 border rounded-lg focus:ring-[#3a9bdc] focus:border-[#3a9bdc]"
              placeholder="••••••••"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#3a9bdc] text-white rounded-lg font-semibold hover:bg-[#2582c0] disabled:bg-gray-400"
            >
              {loading ? 'Mengubah...' : 'Ubah Password'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SettingsPage;