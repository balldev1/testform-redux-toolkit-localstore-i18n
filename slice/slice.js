import { ConsoleSqlOutlined } from '@ant-design/icons';
import { createSlice } from '@reduxjs/toolkit';


const initialState = [];

export const slice = createSlice({
    name: 'persons',
    initialState,
    reducers: {
        addPerson: (state, action) => {
            const person = action.payload;
            // ดึงข้อมูลที่มีอยู่ใน localStorage ออกมา
            const existingPerson = JSON.parse(localStorage.getItem('person')) || [];
            // เพิ่ม person ใหม่ลงในอาร์เรย์ของข้อมูลเก่า
            const updatedPerson = [...existingPerson, person];
            // บันทึกสถานะใหม่ลงใน localStorage
            localStorage.setItem('person', JSON.stringify(updatedPerson));
            console.log(person);

            return [...state, person];

        },
        deletePerson: (state, action) => {
            const { key } = action.payload;

            // ดึงข้อมูลที่มีอยู่ใน Local Storage ออกมาและจัดเก็บไว้ใน existingPeople
            const existingPeople = JSON.parse(localStorage.getItem('person')) || [];

            // ลบข้อมูลที่ต้องการออกจาก existingPeople ตามตำแหน่ง key
            existingPeople.splice(key, 1);

            // อัพเดทข้อมูลใน Local Storage ด้วยข้อมูลใหม่ที่ไม่มีข้อมูลที่ถูกลบแล้ว
            localStorage.setItem('person', JSON.stringify(existingPeople));

            console.log(existingPeople)
                ;

            return [...state, existingPeople];
        },
        deleteAllPerson: (state, action) => {

            // ลบข้อมูลออกจาก Local Storage
            localStorage.removeItem('person');
        },
        editPerson: (state, action) => {

            const { id } = action.payload;
            const { ef, firstname, lastname, birthday, gender, idcard, nationality, passport, phone, salary } = action.payload; // ดึงค่า ef, firstname, และ lastname จาก action.payload
            const data = { ef, firstname, lastname, birthday, gender, idcard, nationality, passport, phone, salary }; // สร้าง object ชื่อ data เพื่อเก็บ ef, firstname, และ lastname
            // ดึงข้อมูลที่มีอยู่ใน localStorage ออกมา

            const existingPeople = JSON.parse(localStorage.getItem('person')) || [];

            if (existingPeople !== -1) {
                existingPeople[id] = data;

                // บันทึกข้อมูลอัปเดตลงใน localStorage
                localStorage.setItem('person', JSON.stringify(existingPeople));

                // อัปเดต state ใน Redux ด้วยข้อมูลที่แก้ไข
            } else {
                console.log('ไม่พบคนที่ต้องการแก้ไขใน localStorage');
            }
            return [...state, data];
        }
    }
});

// export function
export const { addPerson, deletePerson, deleteAllPerson, editPerson } = slice.actions;

export default slice.reducer;