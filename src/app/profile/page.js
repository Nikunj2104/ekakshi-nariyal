"use client";
import { useSelector } from "react-redux";

const Profile = () => {
  const userName = useSelector((state) => state.auth?.userName);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <div>
      <h1>Welcome, {userName}!</h1>

      <h2>Your Wishlist:</h2>
      <ul>
        {/* TODO: make it good looking, remove and clear all feat */}
        {!wishlistItems?.length ? "Your wishlist is empty" : "Buy it out!"}
        {wishlistItems?.map((item, index) => (
          <li key={index}>{item?.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
