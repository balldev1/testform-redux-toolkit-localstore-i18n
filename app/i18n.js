import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ไฟล์แปลภาษาที่คุณสร้างไว้
import enTranslation from './local/en/translation'
import thTranslation from './local/th/translation'


i18n
    .use(initReactI18next)
    .init({
        resources: {
            th: {
                translation: thTranslation
            },
            en: {
                translation: enTranslation
            }
        },
        lng: 'th', // กำหนดภาษาเริ่มต้น
        fallbackLng: 'th', // กำหนดภาษา fallback หากภาษาที่ร้องขอไม่พบ
        interpolation: {
            escapeValue: false // อนุญาตให้ใช้ HTML tags ในแปลคำ
        }
    });

export default i18n;