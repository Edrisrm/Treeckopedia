// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link si estás usando React Router
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../helpers/Lenguages";

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const onChangeLang = (e) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
  };

  return (
    <nav className="bg-green-200 shadow dark:bg-green-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  className="block h-8 w-auto"
                  src="https://imgs.search.brave.com/vH0van8SO-zsnE55NKq7P__15Ciwslvzih65lFcgXQc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2lraWEubm9j/b29raWUubmV0L3Bv/a2Vtb24tcGxhbmV0/L2ltYWdlcy82LzYy/L1Bva2Vtb25fVHJl/ZWNrby5wbmcvcmV2/aXNpb24vbGF0ZXN0/P2NiPTIwMTUwOTIw/MTE1OTQ3"
                  alt="treeckopedia"
                />
                <span className="ml-2 text-2xl font-bold text-gray-800 dark:text-white">
                  Treeckopedia
                </span>
              </Link>
            </div>
          </div>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {/* Botón de menú para pantallas pequeñas */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navbar links */}
          <div
            className={`hidden sm:flex sm:space-x-4 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <Link
              to="/"
              className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-green-800 px-3 py-2 rounded-md text-xl font-medium"
            >
              {t('Home')}
            </Link>
            <Link
              to="/pokedex"
              className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-green-800 px-3 py-2 rounded-md text-xl font-medium"
            >
              Pokedex
            </Link>
            <Link
              to="/minigames"
              className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-green-800 px-3 py-2 rounded-md text-xl font-medium"
            >
              {t('Contact')}
            </Link>
            <Link
              to="/contact"
              className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-green-800 px-3 py-2 rounded-md text-xl font-medium"
            >
              {t('Games')}
            </Link>
            {/* Select de cambio de idioma */}
            <div className="lang">
              <select
                className="form-select  dark:hover:bg-green-800 dark:bg-green-900 text-gray-800 dark:text-white px-3 py-2 rounded-md text-xl font-medium"
                defaultValue={i18n.language}
                onChange={onChangeLang}
              >
                {LANGUAGES.map(({ code, label }) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-green-800 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/pokedex"
            className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-green-800 block px-3 py-2 rounded-md text-base font-medium"
          >
            Pokedex
          </Link>
          <Link
            to="/minigames"
            className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-green-800 block px-3 py-2 rounded-md text-base font-medium"
          >
            {t('Games')}
          </Link>
          <Link
            to="/contact"
            className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-green-800 block px-3 py-2 rounded-md text-base font-medium"
          >
            {t('Contact')}
          </Link>
           {/* Select de cambio de idioma en el menú móvil */}
           <div className="lang">
            <select
              className="form-select bg-gray-200 dark:bg-green-800 text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
              defaultValue={i18n.language}
              onChange={onChangeLang}
            >
              {LANGUAGES.map(({ code, label }) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
