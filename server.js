const express = require('express');
const path = require('path');
const app = express();

// ชี้เป้าโฟลเดอร์สำหรับหน้าเว็บสติก (HTML/CSS/JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// คลังคำถาม 20 ข้อ แบ่งระดับความยาก
const quizData = [
    // === LEVEL 1: เริ่มต้นเบบี๋ (คำศัพท์พื้นฐานที่ต้องรู้) ===
    {
        id: 1,
        audio: 'https://www.purpleculture.net/mp3/ni3hao3.mp3',
        options: ['你好 (สวัสดี)', '谢谢 (ขอบคุณ)', '再见 (ลาก่อน)', '对不起 (ขอโทษ)'],
        correctAnswer: 0
    },
    {
        id: 2,
        audio: 'https://www.purpleculture.net/mp3/xie4xie5.mp3',
        options: ['再见 (ลาก่อน)', '你好 (สวัสดี)', '谢谢 (ขอบคุณ)', '没关系 (ไม่เป็นไร)'],
        correctAnswer: 2
    },
    {
        id: 3,
        audio: 'https://www.purpleculture.net/mp3/zai4jian4.mp3',
        options: ['对不起 (ขอโทษ)', '再见 (ลาก่อน)', '不客气 (ไม่เป็นไร)', '没关系 (ไม่เป็นไร)'],
        correctAnswer: 1
    },
    {
        id: 4,
        audio: 'https://www.purpleculture.net/mp3/dui4bu4qi3.mp3',
        options: ['谢谢 (ขอบคุณ)', '你好 (สวัสดี)', '请问 (ขอถามหน่อย)', '对不起 (ขอโทษ)'],
        correctAnswer: 3
    },
    {
        id: 5,
        audio: 'https://www.purpleculture.net/mp3/mei2guan1xi5.mp3',
        options: ['没关系 (ไม่เป็นไร)', '不客气 (ด้วยความยินดี)', '我知道 (ฉันรู้)', '好 (ตกลง)'],
        correctAnswer: 0
    },
    {
        id: 6,
        audio: 'https://www.purpleculture.net/mp3/bu2ke4qi5.mp3',
        options: ['再见 (ลาก่อน)', '对不起 (ขอโทษ)', '不客气 (ด้วยความยินดี)', '谢谢 (ขอบคุณ)'],
        correctAnswer: 2
    },
    {
        id: 7,
        audio: 'https://www.purpleculture.net/mp3/qing3wen4.mp3',
        options: ['请问 (ขอถามหน่อย)', '你好 (สวัสดี)', '谢谢 (ขอบคุณ)', '再见 (ลาก่อน)'],
        correctAnswer: 0
    },

    // === LEVEL 2: เริ่มจริงจัง (ตัวเลข เวลา และคำสรรพนามรอบตัว) ===
    {
        id: 8,
        audio: 'https://www.purpleculture.net/mp3/hao3.mp3',
        options: ['不知道 (ไม่รู้)', '对不起 (ขอโทษ)', '谢谢 (ขอบคุณ)', '好 (ตกลง/ดี)'],
        correctAnswer: 3
    },
    {
        id: 9,
        audio: 'https://www.purpleculture.net/mp3/bu4zhi1dao4.mp3',
        options: ['我知道 (ฉันรู้)', '不知道 (ไม่รู้)', '没关系 (ไม่เป็นไร)', '请问 (ขอถามหน่อย)'],
        correctAnswer: 1
    },
    {
        id: 10,
        audio: 'https://www.purpleculture.net/mp3/zhi1dao4.mp3',
        options: ['我知道 (ฉันรู้)', '不知道 (ไม่รู้)', '谢谢 (ขอบคุณ)', '再见 (ลาก่อน)'],
        correctAnswer: 0
    },
    {
        id: 11,
        audio: 'https://www.purpleculture.net/mp3/jia1.mp3',
        options: ['家 (บ้าน/ครอบครัว)', '学校 (โรงเรียน)', '商店 (ร้านค้า)', '医院 (โรงพยาบาล)'],
        correctAnswer: 0
    },
    {
        id: 12,
        audio: 'https://www.purpleculture.net/mp3/peng2you5.mp3',
        options: ['老师 (คุณครู)', '学生 (นักเรียน)', '朋友 (เพื่อน)', '医生 (หมอ)'],
        correctAnswer: 2
    },
    {
        id: 13,
        audio: 'https://www.purpleculture.net/mp3/shui3.mp3',
        options: ['米饭 (ข้าวสวย)', '水 (น้ำ)', '茶 (ชา)', '苹果 (แอปเปิ้ล)'],
        correctAnswer: 1
    },
    {
        id: 14,
        audio: 'https://www.purpleculture.net/mp3/jin1tian1.mp3',
        options: ['昨天 (เมื่อวาน)', '今天 (วันนี้)', '明天 (พรุ่งนี้)', '现在 (ตอนนี้)'],
        correctAnswer: 1
    },

    // === LEVEL 3: ปราบเซียน (ประโยคสนทนาสั้นและคำกริยาที่ซับซ้อนขึ้น) ===
    {
        id: 15,
        audio: 'https://www.purpleculture.net/mp3/xian4zai4ji3dian3.mp3',
        options: ['คุณชื่ออะไร?', 'ตอนนี้กี่โมงแล้ว?', 'คุณจะไปไหน?', 'คุณสบายดีไหม?'],
        correctAnswer: 1
    },
    {
        id: 16,
        audio: 'https://www.purpleculture.net/mp3/ni3shi4na3guo2ren2.mp3',
        options: ['คุณสบายดีไหม?', 'คุณมาจากไหน/คุณเป็นคนประเทศอะไร?', 'คุณอายุเท่าไหร่?', 'คุณกำลังทำอะไรอยู่?'],
        correctAnswer: 1
    },
    {
        id: 17,
        audio: 'https://www.purpleculture.net/mp3/wo3ai4ni3.mp3',
        options: ['ฉันรักคุณ', 'ฉันชอบคุณ', 'ฉันคิดถึงคุณ', 'ฉันขอบคุณคุณ'],
        correctAnswer: 0
    },
    {
        id: 18,
        audio: 'https://www.purpleculture.net/mp3/duo1shao5qian2.mp3',
        options: ['ราคาเท่าไหร่?', 'อยู่ที่ไหน?', 'อันไหน?', 'กี่คน?'],
        correctAnswer: 0
    },
    {
        id: 19,
        audio: 'https://www.purpleculture.net/mp3/tai4hao3le5.mp3',
        options: ['ไม่เลวเลย', 'ยินดีด้วย', 'ยอดเยี่ยมไปเลย/ดีเหลือเกิน', 'ไม่เป็นไร'],
        correctAnswer: 2
    },
    {
        id: 20,
        audio: 'https://www.purpleculture.net/mp3/zhen1de5ma5.mp3',
        options: ['จริงเหรอ?', 'ใช่ไหม?', 'ไม่ใช่หรอก', 'แน่นอน'],
        correctAnswer: 0
    }
];

// 1. API ส่งคำถาม
app.get('/api/quiz', (req, res) => {
    const secureQuiz = quizData.map(q => ({
        id: q.id,
        audio: q.audio,
        options: q.options
    }));
    res.json(secureQuiz);
});

// 2. API ตรวจคำตอบ
app.post('/api/check-answer', (req, res) => {
    const { questionId, selectedIndex } = req.body;
    const question = quizData.find(q => q.id === questionId);
    
    if (!question) {
        return res.status(404).json({ error: 'ไม่พบคำถาม' });
    }

    let isCorrect = false;
    if (typeof selectedIndex === 'number') {
        isCorrect = question.correctAnswer === selectedIndex;
    } else {
        const correctText = question.options[question.correctAnswer];
        isCorrect = correctText === selectedIndex;
    }
    
    res.json({
        correct: isCorrect,
        correctAnswerIndex: question.correctAnswer
    });
});

// 🌟 แก้ไขจุดเจ้าปัญหาตรงนี้ครับ: ใช้พาร์ทกำหนดแบบเจาะจง ไม่ใช้เครื่องหมายดอกจันแปลก ๆ เพื่อตัดปัญหากับ Express ทุกเวอร์ชัน
app.use(express.static(path.join(__dirname, 'public')));
   
   app.get('/', (req, res) => {
       res.sendFile(path.join(__dirname, 'public', 'index.html'));
   });


// 🌟 ไฮบริดตรวจสอบระบบ: ถ้าเปิดบนคอมตัวเอง รันพอร์ต 3000 อัตโนมัติ
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server กำลังรันโลคอลที่ http://localhost:${PORT}`);
    });
}

module.exports = app;