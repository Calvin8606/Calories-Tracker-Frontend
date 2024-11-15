import React, { useState, useEffect } from "react";
import CenteredForm from "../components/CenteredForm";
import { getUserDetails, updatePhoneNumber, updatePassword } from "../apis/api";

const SettingsPage: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string | null>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        console.log("User Details:", userDetails); // Debug line

        setFirstName(userDetails.firstName);
        setLastName(userDetails.lastName);
        setEmail(userDetails.email);
        setPhoneNumber(userDetails.phoneNumber || ""); // Set to empty if null
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Update phone number and password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      // Update phone number
      if (phoneNumber) {
        await updatePhoneNumber(phoneNumber);
      }

      // Update password only if the new password is filled
      if (newPassword) {
        await updatePassword(newPassword);
      }

      setMessage("Updates applied successfully.");
      setNewPassword("");
    } catch (error) {
      console.error("Failed to update settings:", error);
      setMessage("Failed to apply updates. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-700"
      style={{ marginLeft: "14rem" }}
    >
      <CenteredForm title="Settings">
        <input type="text" style={{ display: "none" }} name="username" />
        <h2 className="text-xl font-bold mb-6">User Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium">First Name</label>
            <input
              type="text"
              value={firstName}
              readOnly
              className="w-full p-3 border rounded bg-gray-200"
            />
          </div>
          <div>
            <label className="block font-medium">Last Name</label>
            <input
              type="text"
              value={lastName}
              readOnly
              className="w-full p-3 border rounded bg-gray-200"
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full p-3 border rounded bg-gray-200"
            />
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">Update Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="tel"
              name="phone_number_field"
              value={phoneNumber ?? ""}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              autoComplete={phoneNumber ? "tel" : "off"}
              className="w-full p-3 border rounded"
            />
          </div>
          <div>
            <label className="block font-medium">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-3 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Apply Updates
          </button>
        </form>

        {message && <p className="text-center mt-4 text-red-600">{message}</p>}
      </CenteredForm>
    </div>
  );
};

export default SettingsPage;
