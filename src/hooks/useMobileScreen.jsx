import { useState, useEffect } from "react";

const useMobileScreen = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobileScreen = () => {
      setIsMobile(window.innerWidth <= 768); // Ajuste para resoluciones móviles
    };

    checkMobileScreen(); // Comprobar cuando carga
    window.addEventListener("resize", checkMobileScreen); // Comprobar al cambiar el tamaño de la ventana

    return () => window.removeEventListener("resize", checkMobileScreen);
  }, []);

  return isMobile;
};

export default useMobileScreen;
