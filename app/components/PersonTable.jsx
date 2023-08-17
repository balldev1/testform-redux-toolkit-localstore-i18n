'use client'
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteAllPerson, deletePerson } from '../../slice/slice';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation, } from 'react-i18next';
import '/app/i18n';


const PersonTable = () => {
    // เปลี่ยนภาษา
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [dataSource, setDataSource] = useState(''); // เก็บค่า localstorage


    useEffect(() => {
        const storedPersonsString = localStorage.getItem('person');
        const storedPersons = storedPersonsString !== null ? JSON.parse(storedPersonsString) : [];
        const newData = storedPersons.map((person, index) => ({
            key: index,
            name: `${person.firstname || 'null'} ${person.lastname || 'null'}`,
            gender: person.gender || 'null',
            phone: person.phone || 'null',
            nationality: person.nationality || 'null',
        }));
        // เพิ่ม Event Listener ให้กับ storage เพื่อจับการเปลี่ยนแปลงใน localStorage
        setDataSource(newData); //
    }, []); // ข้อมูลอัพเดท ทันที่ เมือ dataSourceเปลี่ยนแปลง


    const columns = [
        {
            title: t('ชื่อ'),
            dataIndex: 'name',
            width: 300,
            fontsize: 1
        },
        {
            title: t('เพศ'),
            dataIndex: 'gender',
            sorter: {
                compare: (a, b) => a.gender - b.gender,
                multiple: 3,
            },
            width: 300
        },
        {
            title: t('หมายเลขโทรศัพท์'),
            dataIndex: 'phone',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 2,
            },
            width: 300
        },
        {
            title: t('สัญชาติ'),
            dataIndex: 'nationality',
            sorter: {
                compare: (a, b) => a.nationality - b.nationality,
                multiple: 1,
            },
            width: 300
        },
        {
            title: t('จัดการ'),
            dataIndex: 'handle',
            width: 100,
            render: (_, record) => (
                <span className='flex sm:gap-5 gap-1  '>
                    <Button onClick={() => handleEdit(record)}
                        type="summit" className='bg-orange-500 text-white sm:w-[100px]  w-[70px] sm:text-[15px] text-[12px]' >
                        EDIT
                    </Button>
                    <Button onClick={() => handleDelete(record)}
                        type="summit" className='bg-rose-500 text-white sm:w-[100px] w-[px] sm:text-[15px]  text-[12px]' >
                        DELETE
                    </Button>
                </span>
            ),
        },
    ];
    const handleEdit = async (record) => {
        // ส่ง action ในการลบบุคคลไปยัง store
        try {
            const shouldDelete = await window.confirm("คุณต้องการแก้ไขใช่หรือไม่?");
            if (!shouldDelete) {
                return; // ไม่ดำเนินการแก้ไขถ้าผู้ใช้ไม่ยืนยัน
            }
            toast.loading("loading...");
            dispatch(deletePerson({ key: record.key }));
            setTimeout(() => {
                router.push(`/edit/${record.key}`)
                toast.dismiss();
            }, 1000);
        } catch (error) {
            console.log('error')
        }
    }



    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const dispatch = useDispatch();

    const handleDelete = async (record) => {
        // ส่ง action ในการลบบุคคลไปยัง store
        try {
            const shouldDelete = await window.confirm("คุณต้องการลบใช่หรือไม่?");
            if (!shouldDelete) {
                return; // ไม่ดำเนินการลบถ้าผู้ใช้ไม่ยืนยัน
            }
            toast.success("ลบข้อมูลเรียบร้อยแล้ว");
            dispatch(deletePerson({ key: record.key }));
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.log('error')
        }
    };

    const handleAllDelete = async () => {
        try {
            const shouldDelete = await window.confirm("คุณต้องการลบทั้งหมดใช่หรือไม่?");
            if (!shouldDelete) {
                return; // ไม่ดำเนินการลบถ้าผู้ใช้ไม่ยืนยัน
            }
            toast.success("ลบข้อมูลเรียบร้อยแล้ว");
            // เรียกใช้ action โดยใช้ dispatch เพื่อลบข้อมูลทั้งหมด
            setTimeout(() => {
                dispatch(deleteAllPerson());
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.log('เกิดข้อผิดพลาด: ', error);
        }
    };



    return (
        <div >

            {/* {desktop} */}
            <div className='sm:block hidden '>
                <Toaster />
                <div className='flex gap-2 items-center '>
                    <div className='flex gap-1'>
                        <input type='checkbox' />
                        <h1>{t('เลือกทั้งหมด')}</h1>
                    </div>
                    <Button onClick={handleAllDelete}
                        className='mb-3 bg-white flex mt-3'> {t('ลบข้อมูล')}</Button>
                </div>
                <Table columns={columns} dataSource={dataSource} onChange={onChange} style={{ width: '1500px' }} />;
            </div>
            {/* {mobile} */}
            <div className='sm:hidden w-[600px] '  >
                <div className='flex gap-2 ml-20'>
                    <div className='flex gap-1 ml-10 items-center'>
                        <input type='checkbox' />
                        <h1>{t('เลือกทั้งหมด')}</h1>
                    </div>
                    <Button onClick={handleAllDelete}
                        className='mb-3 bg-white mt-3'> {t('ลบข้อมูล')}</Button>
                </div>
                <Table columns={columns} dataSource={dataSource} onChange={onChange}
                    style={{ transform: 'scale(0.6)', position: 'relative', bottom: '3rem', }} />
            </div>
        </div>


    )
}

export default PersonTable




