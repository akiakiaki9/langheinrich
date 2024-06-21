import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: require('./en.json'),
    },
    ru: {
        translation: require('./ru.json'),
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })
    .then(() => console.log('i18n initialized successfully'))
    .catch(err => console.error('Error initializing i18n:', err));

console.log('i18n instance:', i18n);

export default i18n;