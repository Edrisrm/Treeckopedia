import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {esp} from './es.js';
import {eng} from './en.js';

const userLang = navigator.language || navigator.userLanguage;
const defaultLocale = userLang.substring(0,2);
i18n
    .use(initReactI18next)
    .init({
        fallbackLng: defaultLocale,
        lng: defaultLocale,
        interpolation:{
            escapeValue: false
        },
        resources:{
            en: {
                translation: eng, 
            },
            es: {
                translation: esp, 
            },
        }

    });

export default i18n;