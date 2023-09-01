"use client"
import React, { useState } from "react";

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="profile-menu">
      <button className="menu-button" onClick={toggleMenu}>
        <img
          src="/path-to-your-avatar-image.jpg" // Reemplaza esto con la URL de tu imagen de perfil
          alt="Profile"
          className="profile-image"
        />
      </button>
      {isMenuOpen && (
        <div className="menu-dropdown">
          <ul>
            <li>
              <a href="/account">My Account</a>
            </li>
            <li>
              <a href="/myshopping">Shopping</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
