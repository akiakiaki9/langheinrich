import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            welcome: "Welcome to our website!"
        },
    },
    ru: {
        translation: {
            welcome: "Добро пожаловать на наш сайт!"
        },
    },
    de: {
        translation: {
            welcome: "Willkommen auf unserer Website!"
        },
    },
    fr: {
        translation: {
            welcome: "Bienvenue sur notre site Web!"
        },
    },
    uz: {
        translation: {
            welcome: "Bizning veb-saytimizga xush kelibsiz!"
        },
    },
    ar: {
        translation: {
            welcome: "مرحبًا بكم في موقعنا!"
        },
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

export default i18n;