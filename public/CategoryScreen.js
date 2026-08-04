import React, { useState } from 'react';
import CategoryScreen from './CategoryScreen'; // 1. ดึงไฟล์เข้ามา

export default function MainApp() {
  const [currentCategory, setCurrentCategory] = useState(null);

  // ฟังก์ชันรองรับเมื่อผู้ใช้กดเลือกหมวดหมู่
  const handleSelectCategory = (categoryId) => {
    setCurrentCategory(categoryId);
    // ตรงนี้สามารถเขียนโค้ดเปิดหน้าคำถามของหมวดนั้นๆ ต่อได้เลย
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ถ้ายังไม่ได้เลือกหมวด ให้แสดงหน้าเลือกหมวดหมู่ */}
      {!currentCategory ? (
        <CategoryScreen onSelectCategory={handleSelectCategory} />
      ) : (
        // ถ้าเลือกแล้ว ให้แสดงเนื้อหาของหมวดนั้นๆ
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">กำลังใช้งานหมวด: {currentCategory}</h1>
          <button 
            onClick={() => setCurrentCategory(null)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            ย้อนกลับไปหน้าเลือกหมวด
          </button>
        </div>
      )}
    </div>
  );
}