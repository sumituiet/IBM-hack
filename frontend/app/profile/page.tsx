"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/_lib/supabaseClient";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: "",
    full_name: "",
    email: "",
    avatar_url: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error fetching session:", sessionError);
        return;
      }

      if (session) {
        const { data, error } = await supabase
          .from("profiles")
          .select("username, full_name, email, avatar_url")
          .eq("id", session.user.id)
          .single();

        if (data) {
          setProfile(data);
        } else if (error) {
          console.error("Error fetching profile:", error.message);
        } else {
          console.warn("No profile data found for this user.");
        }
      } else {
        console.warn("No active session. Redirecting to login.");
        router.push("/login");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Unexpected error fetching profile:", err.message);
      } else {
        console.error("Unexpected error fetching profile:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error fetching session for update:", sessionError);
        return;
      }

      if (session) {
        const { error } = await supabase
          .from("profiles")
          .update({
            username: profile.username,
            full_name: profile.full_name,
            email: profile.email,
            avatar_url: profile.avatar_url,
          })
          .eq("id", session.user.id);

        if (error) {
          console.error("Error updating profile:", error.message);
        } else {
          setIsEditing(false);
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Unexpected error updating profile:", err.message);
      } else {
        console.error("Unexpected error updating profile:", err);
      }    
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-yellow">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-navy text-yellow px-6">
      <div className="w-full max-w-sm bg-gray-800 rounded-lg p-8 shadow-lg bg-australia">
        <h1 className="text-3xl font-bold mb-8 text-center">Profile</h1>
        <img src={profile.avatar_url || "Sample_User_Icon.png"} alt="no profile picture found" />
        {isEditing ? (
          <>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Username</label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
                className="w-full px-4 py-2 mb-4 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Full Name</label>
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) =>
                  setProfile({ ...profile, full_name: e.target.value })
                }
                className="w-full px-4 py-2 mb-4 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled={true}
                className="w-full px-4 py-2 mb-4 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={updateProfile}
              className="w-full py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200 mb-2"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="w-full py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <p>
                <span className="font-bold">Username:</span> {profile.username}
              </p>
            </div>
            <div className="mb-4">
              <p>
                <span className="font-bold">Full Name:</span> {profile.full_name}
              </p>
            </div>
            <div className="mb-4">
              <p>
                <span className="font-bold">Email:</span> {profile.email}
              </p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2 bg-yellow text-navy font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
