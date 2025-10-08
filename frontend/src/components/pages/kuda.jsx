import React, { useState } from "react";

function ProfilePage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    points: 250,
    history: [
      { id: 1, action: "Completed pickup task", date: "2025-10-01" },
      { id: 2, action: "Redeemed 100 points", date: "2025-10-03" },
      { id: 3, action: "Updated profile info", date: "2025-10-05" },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSave = () => {
    setUser({ ...user, ...editForm });
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="mx-auto rounded-full mb-4"
        />
        {!isEditing ? (
          <>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-yellow-600 font-semibold mt-3">
              ⭐ Points: {user.points}
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your name"
            />
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleEditChange}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your email"
            />
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* History Section */}
      <div className="bg-white shadow-lg rounded-2xl mt-8 p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">📜 History</h3>
        <ul className="divide-y divide-gray-200">
          {user.history.map((item) => (
            <li key={item.id} className="py-2">
              <p className="text-gray-700">{item.action}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;
