import { configureStore } from '@reduxjs/toolkit';
import slice from '../slice/slice';

// ดึงค่าข้อมูล localstore
export const store = configureStore({
    reducer: {
        persons: slice,
    },
});

