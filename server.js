const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ==========================================
// คลังคำถาม 1: พาร์ทฟังภาษาจีน (Chinese Listening)
// ==========================================
const chineseListeningData = [
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

// ==========================================
// คลังคำถาม 2: ประเพณีและวัฒนธรรมจีน (Culture ไฮบริด)
// ==========================================
const cultureData = [
    {
        id: 101,
        question: "เทศกาลใดของจีนที่มีธรรมเนียมการกิน 'ขนมบ๊ะจ่าง' และแข่งเรือมังกร?",
        audio: "https://www.purpleculture.net/mp3/duan1wu3jie2.mp3",
        options: ["เทศกาลตรุษจีน", "เทศกาลไหว้พระจันทร์", "เทศกาลขนมจ้าง (ตวนอู่)", "เทศกาลเชงเม้ง"],
        correctAnswer: 2
    },
    {
        id: 102,
        question: "สัตว์ชนิดใดที่เป็นสัญลักษณ์ของความทรงพลัง ความยิ่งใหญ่ และจักรพรรดิของจีน?",
        audio: "https://www.purpleculture.net/mp3/long2.mp3",
        options: ["มังกร (龙)", "หงส์ (凤凰)", "สิงโต (狮子)", "แพนด้า (熊猫)"],
        correctAnswer: 0
    },
    {
        id: 103,
        question: "ตามความเชื่อของชาวจีน สีใดที่สื่อถึงความสุข โชคลาภ และความเป็นสิริมงคลนิยมใช้ในงานมงคล?",
        audio: "https://www.purpleculture.net/mp3/hong2se4.mp3",
        options: ["สีขาว", "สีเหลือง", "สีดำ", "สีแดง"],
        correctAnswer: 3
    },
    {
        id: 104,
        question: "ในวันตรุษจีน เงินขวัญถุงที่ผู้ใหญ่จะมอบให้เด็ก ๆ บรรจุในซองสีแดง เรียกว่าอะไร?",
        audio: "https://www.purpleculture.net/mp3/hong2bao1.mp3",
        options: ["กิโมโน", "อั่งเปา / แต๊ะเอีย", "ขนมเข่ง", "เกี๊ยว"],
        correctAnswer: 1
    },
    {
        id: 105,
        question: "อาหารชนิดใดที่ชาวจีนนิยมทานในวันตรุษจีนเพราะมีรูปร่างคล้าย 'เงินตำลึงจีน' โบราณ สื่อถึงความมั่งคั่ง?",
        audio: "https://www.purpleculture.net/mp3/jiao3zi5.mp3",
        options: ["เกี๊ยว (饺子)", "เต้าหู้", "ก๋วยเตี๋ยวสายยาว", "ปอเปี๊ยะ"],
        correctAnswer: 0
    },
    {
        id: 106,
        question: "ศิลปะการต่อสู้และออกกำลังกายโบราณของจีนที่เน้นความนุ่มนวลและการคุมลมปราณคือข้อใด?",
        audio: "https://www.purpleculture.net/mp3/tai4ji2quan2.mp3",
        options: ["เทควันโด", "มวยไทย", "มวยไทเก๊ก (太极拳)", "คาราเต้"],
        correctAnswer: 2
    },
    {
        id: 107,
        question: "ตัวเลขใดในวัฒนธรรมจีนที่ออกเสียงคล้ายคำว่า 'ความร่ำรวย' (ฟา) และถือเป็นเลขมงคลสูงสุดในการทำธุรกิจ?",
        audio: "https://www.purpleculture.net/mp3/ba1.mp3",
        options: ["เลข 4", "เลข 7", "เลข 8", "เลข 9"],
        correctAnswer: 2
    }
];

// ฟังก์ชันสำหรับสุ่มสลับตำแหน่ง Array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// 1. API ส่งคำถาม (สุ่มข้อ + สุ่มสลับช้อยส์)
app.get('/api/quiz', (req, res) => {
    const { category } = req.query;
    let selectedData = [];

    if (category === 'culture') {
        selectedData = cultureData;
    } else {
        selectedData = chineseListeningData;
    }

    // สุ่มสลับลำดับโจทย์ทั้งหมดก่อน แล้วตัดเอามาสุ่มชุดละ 20 ข้อ
    const shuffledQuestions = shuffleArray(selectedData).slice(0, 20);

    // แมปข้อมูลและสั่งสุ่มตำแหน่งตัวเลือกภายในข้อ
    const secureQuiz = shuffledQuestions.map(q => {
        const optionsWithIndex = q.options.map((opt, idx) => ({ text: opt, originalIndex: idx }));
        const shuffledOptions = shuffleArray(optionsWithIndex);

        return {
            id: q.id,
            audio: q.audio || null,
            question: q.question || null,
            options: shuffledOptions.map(o => o.text),
            shuffledOrder: shuffledOptions.map(o => o.originalIndex) // แนบแมปตำแหน่งส่งไปหน้าบ้านใช้ถอดรหัส
        };
    });

    res.json(secureQuiz);
});

// 2. API ตรวจคำตอบ (ดักตรวจจากคลัง)
app.post('/api/check-answer', (req, res) => {
    const { questionId, selectedIndex } = req.body;
    
    let question = chineseListeningData.find(q => q.id === questionId);
    if (!question) {
        question = cultureData.find(q => q.id === questionId);
    }
    
    if (!question) {
        return res.status(404).json({ error: 'ไม่พบคำถามในคลังข้อสอบ' });
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server กำลังรันโลคอลที่ http://localhost:${PORT}`);
    });
}

module.exports = app;