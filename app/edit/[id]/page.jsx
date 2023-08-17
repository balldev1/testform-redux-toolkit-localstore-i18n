'use client'
import React, { useState } from 'react'
import { Button, Select, Form, Input, DatePicker, Radio, InputNumber, Space, } from 'antd';
import { useDispatch } from 'react-redux';
import { editPerson } from '../../../slice/slice'
import moment from 'moment';
import Navbar from '@/app/components/Navbar';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation, } from 'react-i18next';
import '/app/i18n';

const Edit = ({ params: { id } }) => {
    // เปลี่ยนภาษา

    const { t, i18n } = useTranslation();

    const [form] = Form.useForm();

    const dispatch = useDispatch();


    const router = useRouter();

    const { Option } = Select;
    const curvedInputStyle = {
        borderRadius: '5px', // Adjust the border radius as needed
    };

    const handleResetForm = async () => {
        try {
            const shouldReset = await window.confirm("คุณต้องการล้างข้อมูลใช่หรือไม่?");
            if (!shouldReset) {
                return; // ไม่ดำเนินการรีเซ็ตถ้าผู้ใช้ไม่ยืนยัน
            }

            toast.success('รีเซทรียบร้อยแล้ว')
            // reset form
            form.resetFields();
        } catch (error) {
            console.log('error', error);
        }
    };


    const handleEdit = async (id) => {
        try {
            const shouldSubmit = await window.confirm("คุณต้องการส่งข้อมูลใช่หรือไม่?");
            if (!shouldSubmit) {
                return; // ไม่ดำเนินการส่งถ้าผู้ใช้ไม่ยืนยัน
            }
            form.validateFields().then((values) => {
                const formattedDate = moment(values.birthday).format('DD,MM,YYYY');
                dispatch(editPerson({ id, ...values, birthday: formattedDate }));
                router.push(`/`)
            });
            setTimeout(() => {
                toast.success('แก้ไขข้อมูลเรียบร้อย')
            }, 1000);
        } catch (error) {
            console.log('error')
        }
    };

    return (

        <div className='flex flex-col justify-center items-center py-5'>
            <div className='flex flex-col  my-10 mx-10 gap-10'>
                <div>
                    <Navbar />     <h className='font-bold text-xl'>{t('แก้ไขข้อมูล')}</h>
                </div>
                <div className=' sm:w-[1000px] border-2  border-black rounded-md sm:px-3 sm:py-3 px-4'>
                    <Form form={form}  >
                        {/* {1} */}
                        <div className='sm:flex sm:flex-row sm:gap-5  flex flex-col'>
                            <div >
                                <Form.Item name='ef'
                                    label={t('คำนำหน้า')} rules={[
                                        {
                                            required: true,
                                            message: 'Please Select Ef!',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder={t('คำนำหน้า')}>
                                        <Option value='นาย' >{t('นาย')}</Option>
                                        <Option value='นาง'>{t('นาง')}</Option>
                                        <Option value='นางสาว'>{t('นางสาว')}</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div >
                                <Form.Item
                                    label={t('ชื่อจริง')} name="firstname" rules={[
                                        {
                                            required: true,
                                            message: 'Please input your firstname!',
                                        },
                                    ]}
                                >
                                    <Input className='w-[300px]' type='text' />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item
                                    label={t('นามสกุล')} name="lastname" rules={[
                                        {
                                            required: true,
                                            message: 'Please input your lastname!',
                                        },
                                    ]}
                                >
                                    <Input
                                        className='w-[320px]' type='text' />
                                </Form.Item>
                            </div>
                        </div>
                        {/* {2} */}
                        {
                            <div className='sm:flex sm:flex-row sm:gap-5'>
                                <div >
                                    <Form.Item
                                        label={t('วันเกิด')} name="birthday" rules={[
                                            {
                                                required: true,
                                                message: 'Please Select birthday!',
                                            },
                                        ]}
                                    >
                                        <DatePicker
                                            placeholder={t('เดือน/วัน/ปี')}

                                        />
                                    </Form.Item>
                                </div>
                                <div>
                                    <Form.Item name='nationality'
                                        label={t('สัญชาติ')} rules={[
                                            {
                                                required: true,
                                                message: 'Please input your nationality!',
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder={t('-- กรุณาเลือก --')} style={{ width: '300px' }}>
                                            <Option value='ไทย'
                                            >{t('ไทย')}</Option>
                                            <Option value='อังกฤษ'
                                            >{t('อังกฤษ')}</Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                        }
                        {/* {3} */} {/* {<sm show} */}
                        <div className='sm:flex sm:flex-row sm:gap-5  flex flex-col sm:block hidden'>
                            <div >
                                <Form.Item
                                    label={t('เลขบัตรประชาชน')} name="idcard"
                                >

                                    <Space.Compact
                                    >
                                        <Input
                                            type='number'
                                            maxLength={1}
                                            style={{ ...curvedInputStyle, width: '60px' }}
                                            onKeyDown={(event) => {
                                                const input = event.target;
                                                const currentValue = input.value;
                                                if (currentValue.length >= input.maxLength) { //ถ้า input มากกว่า maxlengthให้หยุด
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                        <h1 className='border-none px-3 text-xl'>               -</h1>
                                        <Input type='number'
                                            className='style:hidden' style={{ ...curvedInputStyle, width: '120px' }} maxLength={4}
                                            onKeyDown={(event) => {
                                                const input = event.target;
                                                const currentValue = input.value;
                                                if (currentValue.length >= input.maxLength) {
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                        <h1 className='border-none px-3 text-xl'>               -</h1>
                                        <Input type='number'
                                            style={{ ...curvedInputStyle, width: '120px' }} maxLength={5}
                                            onKeyDown={(event) => {
                                                const input = event.target;
                                                const currentValue = input.value;
                                                if (currentValue.length >= input.maxLength) { //ถ้า input มากกว่า maxlengthให้หยุด
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                        <h1 className='border-none px-3 text-xl'>               -</h1>
                                        <Input type='number'
                                            style={{ ...curvedInputStyle, width: '80px' }} maxLength={2}
                                            onKeyDown={(event) => {
                                                const input = event.target;
                                                const currentValue = input.value;
                                                if (currentValue.length >= input.maxLength) { //ถ้า input มากกว่า maxlengthให้หยุด
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                        <h1 className='border-none px-3 text-xl'>               -</h1>
                                        <Input type='number'
                                            style={{ ...curvedInputStyle, width: '60px' }} maxLength={1}
                                            onKeyDown={(event) => {
                                                const input = event.target;
                                                const currentValue = input.value;
                                                if (currentValue.length >= input.maxLength) { //ถ้า input มากกว่า maxlengthให้หยุด
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                    </Space.Compact>
                                    {/* {>sm hidden} */}

                                </Form.Item>
                            </div>
                        </div >
                        {/* {3.1} */} {/* {>sm hidden} */}
                        <div className='sm:flex sm:flex-row sm:gap-5  flex flex-col sm:hidden'>
                            <div >
                                <Form.Item
                                    label="เลขบัตรประชาชน :" name="idcard"   >

                                    <Space.Compact
                                    >
                                        <InputNumber style={{ ...curvedInputStyle, width: '40px' }} maxLength={1}
                                            onKeyDown={(event) => {
                                                const input = event.target;
                                                const currentValue = input.value;
                                                if (currentValue.length >= input.maxLength) { //ถ้า input มากกว่า maxlengthให้หยุด
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                        <h1 className='border-none px-1 text-xl'>               -</h1>
                                        <InputNumber style={{ ...curvedInputStyle, width: '70px' }} maxLength={4}
                                            onKeyDown={(event) => {
                                                const input = event.target;
                                                const currentValue = input.value;
                                                if (currentValue.length >= input.maxLength) { //ถ้า input มากกว่า maxlengthให้หยุด
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                        <h1 className='border-none px-1 text-xl'>               -</h1>
                                        <InputNumber style={{ ...curvedInputStyle, width: '70px' }} maxLength={5}
                                            onKeyDown={(event) => {
                                                const input = event.target;
                                                const currentValue = input.value;
                                                if (currentValue.length >= input.maxLength) { //ถ้า input มากกว่า maxlengthให้หยุด
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                        <h1 className='border-none px-1 text-xl'>               -</h1>
                                        <InputNumber style={{ ...curvedInputStyle, width: '40px' }} maxLength={2}
                                            onKeyDown={(event) => {
                                                const input = event.target;
                                                const currentValue = input.value;
                                                if (currentValue.length >= input.maxLength) { //ถ้า input มากกว่า maxlengthให้หยุด
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                        <h1 className='border-none px-1 text-xl'>               -</h1>
                                        <InputNumber style={{ ...curvedInputStyle, width: '40px' }} maxLength={1}
                                            onKeyDown={(event) => {
                                                const input = event.target;
                                                const currentValue = input.value;
                                                if (currentValue.length >= input.maxLength) { //ถ้า input มากกว่า maxlengthให้หยุด
                                                    event.preventDefault();
                                                }
                                            }}
                                        />
                                    </Space.Compact>
                                    {/* {>sm hidden} */}

                                </Form.Item>
                            </div>
                        </div >
                        {/* {4} */}
                        <div className='sm:flex sm:flex-row sm:gap-5  flex flex-col '>
                            <div >
                                <Form.Item
                                    label={t('เพศ')} name="gender" rules={[
                                        {
                                            required: true,
                                            message: 'Please Select Gender!',
                                        },
                                    ]}
                                >
                                    <Radio.Group
                                    >
                                        <Radio value="ชาย" name='male'> {t('ผู้ชาย')}  </Radio>
                                        <Radio value="หญิง" name='female'> {t('ผู้หญิง')}  </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                        </div >
                        {/* {5} */}
                        <div className='flex sm:flex-row flex-row sm:gap-2'>
                            <div className='flex items-center'>
                                <Form.Item name='phone'
                                    label={t('หมายเลขโทรศัพท์')} rules={[
                                        {
                                            required: true,
                                            message: 'Please Select Ef!',
                                        },
                                    ]}
                                >
                                    <div className='flex'>
                                        <Select style={{ width: '100px' }}>
                                            <Option value="+66">+66</Option>
                                            <Option value="+77">+77</Option>
                                        </Select>
                                        <h1 className="px-3 text-xl">-</h1>
                                        <Input type='number'
                                            className='w-[200px]' />
                                    </div>
                                </Form.Item>
                            </div>
                        </div>
                        {/* {6} */}
                        <div className='flex sm:flex-row flex-row sm:gap-2'>
                            <div className='flex items-center'>
                                <Form.Item name='passport'
                                    label={t('หนังสือเดินทาง')}
                                >
                                    <Input
                                        className='w-[200px]' />
                                </Form.Item>
                            </div>
                        </div>
                        {/* {6} */}
                        <div className='flex sm:flex-row flex-row sm:gap-2'>
                            <div className='flex items-center'>
                                <Form.Item
                                    label={t('เงินเดือนที่คาดหวัง')} name="salary" rules={[
                                        {
                                            required: true,
                                            message: 'Please Select Salary!',
                                        },
                                    ]}

                                >
                                    <InputNumber
                                        className='w-[200px]' />
                                </Form.Item>
                            </div>
                            <div className=' sm:flex sm:ml-auto sm:mr-20'>
                                <div >
                                    <Button onClick={handleResetForm}
                                        className='bg-white '>{t('ล้างข้อมูล')}</Button>
                                </div>
                                <div className='sm:pr-20 sm:mx-20' >
                                    <Button onClick={() => handleEdit(id)}
                                        type='submit' className='bg-white sm:mt-0 mt-3'>{t('แก้ไขข้อมูล')}</Button>
                                </div>
                            </div>
                        </div>
                    </Form >
                </div >
            </div >
        </div >
    )
}

export default Edit