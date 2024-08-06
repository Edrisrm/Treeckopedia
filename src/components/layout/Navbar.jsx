import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../helpers/Lenguages.js";
import treeckoDex from "../../assets/treeckoDex.png"
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
    <nav className="sticky top-0 z-50 bg-green-200 shadow dark:bg-green-900">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  className="block h-20 w-auto"
                  src={treeckoDex}
                  alt="Treeckodex"
                />
                <span className="ml-2 text-2xl font-bold text-gray-800 dark:text-white ">
                  Treeckodex
                </span>
              </Link>
            </div>
          </div>
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
          <div
            className={`hidden sm:flex sm:space-x-4 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <Link
              to="/"
              className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-green-800  px-3 py-2 rounded-md text-xl font-medium hidden md:inline"
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
              {t("Games")}
            </Link>
            <Link
            to="https://www.linkedin.com/in/edris-rios-morales-56935b1a2/"
            className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-green-800 px-3 py-2 rounded-md text-xl font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("Contact")}
          </Link>
            {/* Select de cambio de idioma */}
            <div className="lang">
              <select
                className="form-select dark:hover:bg-green-800 dark:bg-green-900 text-gray-800 dark:text-white px-3 py-2 rounded-md text-xl font-medium"
                defaultValue={i18n.language}
                onChange={onChangeLang}
              >
                {LANGUAGES.map(({ code, label }) => (
                  <option key={code} value={code}>
                    {code}
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
            to="/pokedex"
            className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-green-800 block px-3 py-2 rounded-md text-base font-medium"
          >
            Pokedex
          </Link>
          <Link
            to="/minigames"
            className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-green-800 block px-3 py-2 rounded-md text-base font-medium"
          >
            {t("Games")}
          </Link>
          <Link
            to="https://www.linkedin.com/in/edris-rios-morales-56935b1a2/"
            className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-green-800 px-3 py-2 rounded-md text-xl font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("Contact")}
          </Link>
          <div className="lang">
            <label htmlFor="language-select" className="sr-only">
              Selecciona un idioma
            </label>
            <select
              id="language-select"
              className="form-select bg-gray-200 dark:bg-green-800 text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
              defaultValue={i18n.language}
              onChange={onChangeLang}
            >
              {LANGUAGES.map(({ code, label }) => (
                <option key={code} value={code}>
                  {code}
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
