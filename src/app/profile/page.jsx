"use client"
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import styles from "./Profile.module.css"; // Importa tus estilos CSS módulos

const Profile = ({ session }) => {
  const [showMenu, setShowMenu] = useState(false); // Estado para mostrar/ocultar el menú

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    signOut();
  };

  if (!session) {
    // Manejar el caso en que el usuario no esté autenticado
    return <div>No estás autenticado.</div>;
  }

  return (
    <div>
      <section className={styles.profileSection}>
        <div className={styles.profileInfo}>
          <h4>Profile Info</h4>
          <h2>{session.user.name}</h2>
          <p>{session.user.email}</p>
          <img
            src={session.user.image}
            alt={`${session.user.name}'s profile picture`}
          />
        </div>
        <div className={styles.profileActions}>
          <button onClick={toggleMenu} className={styles.profileButton}>
            Opciones
          </button>
          {showMenu && (
            <div className={styles.menu}>
              <button onClick={handleLogout} className={styles.menuItem}>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </section>
      <button className={styles.profileButton}>Shopping</button>
      <button className={styles.profileButton}>Searches</button>
    </div>
  );
};

export default Profile;

