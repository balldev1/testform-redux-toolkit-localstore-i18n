'use client'
import React from 'react'
import { Button } from 'antd';
import { Select } from 'antd';
import { useRouter } from 'next/navigation';
import { useTranslation, } from 'react-i18next';
import '/app/i18n';

const Navbar = () => {
    // เปลี่ยนภาษา
    const { t, i18n } = useTranslation();
    const handleLanguageChange = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage);
    };

    const { Option } = Select;

    const router = useRouter();

    const handleHome = () => {
        router.push('/')
    }

    return (
        <div className='flex flex-row justify-between '>
            <div className='sm:text-2xl text-xl font-bold'>
                {t('การจัดการหน้าฟอร์ม')}
            </div>
            <div className='flex flex-col gap-2'>
                <Select value={i18n.language} onChange={handleLanguageChange}
                    defaultValue="th" >
                    <Option value="th">Thai</Option>
                    <Option value="en">English</Option>
                </Select>
                <Button onClick={handleHome}
                    className='bg-white text-md'>{t('หน้าหลัก')}</Button>
            </div>
        </div>
    )
}

export default Navbar
