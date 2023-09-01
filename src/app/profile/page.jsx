"use client"
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import styles from "./profile.module.css"; // Importa tus estilos CSS módulos

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

  // Función para redirigir al usuario a la página de su cuenta
  const goToAccountPage = () => {
    router.push("/account"); // Cambia "/account" con la ruta correcta
    setShowMenu(false); // Cierra el menú después de redirigir
  };

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
              <button onClick={goToAccountPage} className={styles.menuItem}>
                My Account
              </button>
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
