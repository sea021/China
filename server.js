const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ==========================================
// คลังคำถาม 1: พาร์ทฟังภาษาจีน (Listening) - ฟังเสียงแล้วตอบ
// ==========================================
const chineseListeningData = [
    { id: 1, audio: 'https://www.purpleculture.net/mp3/ni3hao3.mp3', options: ['你好\n(nǐhǎo) (สวัสดี)', '谢谢\n(xièxie) (ขอบคุณ)', '再见\n(zàijiàn) (ลาก่อน)', '对不起\n(duìbuqǐ) (ขอโทษ)'], correctAnswer: 0 },
    { id: 2, audio: 'https://www.purpleculture.net/mp3/xie4xie5.mp3', options: ['再见\n(zàijiàn) (ลาก่อน)', '你好\n(nǐhǎo) (สวัสดี)', '谢谢\n(xièxie) (ขอบคุณ)', '没关系\n(méiguānxi) (ไม่เป็นไร)'], correctAnswer: 2 },
    { id: 3, audio: 'https://www.purpleculture.net/mp3/zai4jian4.mp3', options: ['对不起\n(duìbuqǐ) (ขอโทษ)', '再见\n(zàijiàn) (ลาก่อน)', '不客气\n(búkèqi) (ไม่เป็นไร/ด้วยความยินดี)', '没关系\n(méiguānxi) (ไม่เป็นไร)'], correctAnswer: 1 },
    { id: 4, audio: 'https://www.purpleculture.net/mp3/dui4bu4qi3.mp3', options: ['谢谢\n(xièxie) (ขอบคุณ)', '你好\n(nǐhǎo) (สวัสดี)', '请问\n(qǐngwèn) (ขอถามหน่อย)', '对不起\n(duìbuqǐ) (ขอโทษ)'], correctAnswer: 3 },
    { id: 5, audio: 'https://www.purpleculture.net/mp3/mei2guan1xi5.mp3', options: ['没关系\n(méiguānxi) (ไม่เป็นไร)', '不客气\n(búkèqi) (ด้วยความยินดี)', '我知道\n(wǒ zhīdào) (ฉันรู้)', '好\n(hǎo) (ตกลง)'], correctAnswer: 0 },
    { id: 6, audio: 'https://www.purpleculture.net/mp3/bu2ke4qi5.mp3', options: ['再见\n(zàijiàn) (ลาก่อน)', '对不起\n(duìbuqǐ) (ขอโทษ)', '不客气\n(búkèqi) (ด้วยความยินดี)', '谢谢\n(xièxie) (ขอบคุณ)'], correctAnswer: 2 },
    { id: 7, audio: 'https://www.purpleculture.net/mp3/qing3wen4.mp3', options: ['请问\n(qǐngwèn) (ขอถามหน่อย)', '你好\n(nǐhǎo) (สวัสดี)', '谢谢\n(xièxie) (ขอบคุณ)', '再见\n(zàijiàn) (ลาก่อน)'], correctAnswer: 0 },
    { id: 8, audio: 'https://www.purpleculture.net/mp3/hao3.mp3', options: ['不知道\n(bù zhīdào) (ไม่รู้)', '对不起\n(duìbuqǐ) (ขอโทษ)', '谢谢\n(xièxie) (ขอบคุณ)', '好\n(hǎo) (ตกลง/ดี)'], correctAnswer: 3 },
    { id: 9, audio: 'https://www.purpleculture.net/mp3/bu4zhi1dao4.mp3', options: ['我知道\n(wǒ zhīdào) (ฉันรู้)', '不知道\n(bù zhīdào) (ไม่รู้)', '没关系\n(méiguānxi) (ไม่เป็นไร)', '请问\n(qǐngwèn) (ขอถามหน่อย)'], correctAnswer: 1 },
    { id: 10, audio: 'https://www.purpleculture.net/mp3/zhi1dao4.mp3', options: ['我知道\n(wǒ zhīdào) (ฉันรู้)', '不知道\n(bù zhīdào) (ไม่รู้)', '谢谢\n(xièxie) (ขอบคุณ)', '再见\n(zàijiàn) (ลาก่อน)'], correctAnswer: 0 },
    { id: 11, audio: 'https://www.purpleculture.net/mp3/jia1.mp3', options: ['家\n(jiā) (บ้าน/ครอบครัว)', '学校\n(xuexiào) (โรงเรียน)', '商店\n(shāngdiàn) (ร้านค้า)', '医院\n(yīyuàn) (โรงพยาบาล)'], correctAnswer: 0 },
    { id: 12, audio: 'https://www.purpleculture.net/mp3/peng2you5.mp3', options: ['老师\n(lǎoshī) (คุณครู)', '学生\n(xuéshēng) (นักเรียน)', '朋友\n(péngyou) (เพื่อน)', '医生\n(yīshēng) (หมอ)'], correctAnswer: 2 },
    { id: 13, audio: 'https://www.purpleculture.net/mp3/shui3.mp3', options: ['米饭\n(mǐfàn) (ข้าวสวย)', '水\n(shuǐ) (น้ำ)', '茶\n(chá) (ชา)', '苹果\n(píngguǒ) (แอปเปิ้ล)'], correctAnswer: 1 },
    { id: 14, audio: 'https://www.purpleculture.net/mp3/jin1tian1.mp3', options: ['昨天\n(zuótiān) (เมื่อวาน)', '今天\n(jīntiān) (วันนี้)', '明天\n(míngtiān) (พรุ่งนี้)', '现在\n(xiànzài) (ตอนนี้)'], correctAnswer: 1 },
    { id: 15, audio: 'https://www.purpleculture.net/mp3/xian4zai4ji3dian3.mp3', options: ['你叫什么名字？\n(Nǐ jiào shénme míngzi?)', '现在几点？\n(Xiànzài jǐ diǎn?)', '你去哪儿？\n(Nǐ qù nǎr?)', '你好吗？\n(Nǐ hǎo ma?)'], correctAnswer: 1 },
    { id: 16, audio: 'https://www.purpleculture.net/mp3/ni3shi4na3guo2ren2.mp3', options: ['你好吗？\n(Nǐ hǎo ma?)', '你是哪国人？\n(Nǐ shì nǎ guó rén?)', '你几岁了？\n(Nǐ jǐ suì le?)', '你在做什么？\n(Nǐ zài zuò shénme?)'], correctAnswer: 1 },
    { id: 17, audio: 'https://www.purpleculture.net/mp3/wo3ai4ni3.mp3', options: ['我爱你\n(Wǒ ài nǐ) (ฉันรักคุณ)', '我喜欢你\n(Wǒ xǐhuan nǐ)', '我想你\n(Wǒ xiǎng nǐ)', '我谢谢你\n(Wǒ xièxie nǐ)'], correctAnswer: 0 },
    { id: 18, audio: 'https://www.purpleculture.net/mp3/duo1shao5qian2.mp3', options: ['多少钱？\n(Duōshao qián?) (ราคาเท่าไหร่?)', '在哪儿？\n(Zài nǎr?)', '哪个？\n(Nǎ ge?)', '几个人？\n(Jǐ ge rén?)'], correctAnswer: 0 },
    { id: 19, Pattern: 'https://www.purpleculture.net/mp3/tai4hao3le5.mp3', options: ['不错\n(Búcuò)', '祝贺你\n(Zhùhè nǐ)', '太好了\n(Tài hǎo le) (ยอดเยี่ยมไปเลย)', '没关系\n(Méiguānxi)'], correctAnswer: 2 },
    { id: 20, audio: 'https://www.purpleculture.net/mp3/zhen1de5ma5.mp3', options: ['真的吗？\n(Zhēn de ma?) (จริงเหรอ?)', '是对吗？\n(Shì duì ma?)', '不是吧\n(Bú shì ba)', '当然\n(Dāngrán)'], correctAnswer: 0 }
];

// ==========================================
// คลังคำถาม 2: ประเพณีและวัฒนธรรมจีน (Culture) - ปรับ Path ชื่อไฟล์เป็นภาษาไทยตรงตามโฟลเดอร์ของพี่ซี
// ==========================================
const cultureData = [
    { id: 101, image: "/images/บ๊ะจ่าง.jpg", options: ["端午节\n", "春节\n", "中秋节\n", "清明节\n"], correctAnswer: 0 },
    { id: 102, image: "/images/มังกร.jpeg", options: ["龙 ", "凤凰 ", "狮子 ", "熊猫 "], correctAnswer: 0 },
    { id: 103, image: "/images/โคมไฟ.webp", options: ["白色 ", "黄色 ", "黑色 ", "红色 "], correctAnswer: 3 },
    { id: 104, image: "/images/อั่งเปา.jpg", options: ["和服 ", "红包 ", "年糕 ", "饺子 "], correctAnswer: 1 },
    { id: 105, image: "/images/เกี๊ยว.jpg", options: ["饺子 ", "豆腐 ", "长寿面 ", "春卷 "], correctAnswer: 0 },
    { id: 106, image: "/images/ไทเก๊ก.jpg", options: ["跆拳道", "泰拳 ", "太极拳 ", "空手道"], correctAnswer: 2 },
    { id: 107, image: "/images/เลข 8.jpg", options: ["四 ", "七 ", "八 ", "九 "], correctAnswer: 2 },
    { id: 108, image: "/images/ชาจีน.jpg", options: ["咖啡 ", "茶 (ชา)", "菊花茶 ", "白酒 "], correctAnswer: 1 },
    { id: 109, image: "/images/กี่เพ้า.webp", options: ["和服 ", "韩服 ", "旗袍 ", "纱丽 "], correctAnswer: 2 },
    { id: 110, image: "/images/เชงเม้ง.jpg", options: ["斋节 ", "清明节 ", "中元节 ", "水灯节"], correctAnswer: 1 },
    { id: 111, image: "/images/ไซอิ๋ว.jpg", options: ["三国演义 ", "西游记 ", "红楼梦", "水浒传"], correctAnswer: 1 },
    { id: 112, image: "/images/กู่เจิง.jpg", options: ["古筝 ", "笛子 ", "二胡 ", "琵琶 "], correctAnswer: 0 },
    { id: 113, image: "/images/เข็มทิศ.avif", options: ["造纸术 ", "指南针 ", "火药 ", "印刷术"], correctAnswer: 1 },
    { id: 114, image: "/images/กำแพงเมืองจีน.jpg", options: ["故宫 ", "长城 ", "天坛 ", "秦始皇陵"], correctAnswer: 1 },
    { id: 115, image: "/images/ขนมเปี๊ยะไหว้พระจันทร์.jpg", options: ["年糕 ", "粽子 ", "月饼 ", "发糕"], correctAnswer: 2 },
    { id: 116, image: "/images/ขงจื๊อ.jpg", options: ["孔子 ", "老子 ", "孟子 ", "秦始皇"], correctAnswer: 0 },
    { id: 117, image: "/images/เชิดสิงโต.jpg", options: ["舞龙 ", "舞狮 ", "京剧 ", "扇子舞"], correctAnswer: 1 },
    { id: 118, image: "/images/เลข 4.jpg", options: ["二 ", "四 ", "六 ", "八 )"], correctAnswer: 1 },
    { id: 119, image: "/images/ลูกคิดจีน.jpg", options: ["算盘 ", "笔记本 ", "算筹 ", "日晷"], correctAnswer: 0 },
    { id: 120, image: "/images/งิ้วปักกิ่ง.jpg", options: ["音乐剧", "民族舞", "京剧 ", "木偶戏"], correctAnswer: 2 }
];

// ==========================================
// คลังคำถาม 3: หมวดเติมคำศัพท์ภาษาจีนในประโยค (มีตัวจีน พินอิน และคำแปลครบถ้วน)
// ==========================================
const chineseVocabData = [
    { id: 201, question: "今天天气很好，太阳很___。", options: ["大\n(dà) (ใหญ่/จ้า)", "小\n(xiǎo) (เล็ก)", "多\n(duō) (มาก)", "少\n(shǎo) (น้อย)"], correctAnswer: 0 },
    { id: 202, question: "我不舒服，想去___看医生。", options: ["医院\n(yīyuàn) (โรงพยาบาล)", "学校\n(xuéxiào) (โรงเรียน)", "商店\n(shāngdiàn) (ร้านค้า)", "家\n(jiā) (บ้าน)"], correctAnswer: 0 },
    { id: 203, question: "他是我的___，我们经常一起玩。", options: ["老师\n(lǎoshī) (ครู)", "学生\n(xuéshēng) (นักเรียน)", "朋友\n(péngyou) (เพื่อน)", "医生\n(yīshēng) (หมอ)"], correctAnswer: 2 },
    { id: 204, question: "口渴了，我想喝一杯___。", options: ["水\n(shuǐ) (น้ำ)", "米饭\n(mǐfàn) (ข้าว)", "苹果\n(píngguǒ) (แอปเปิ้ล)", "衣服\n(yīfu) (เสื้อผ้า)"], correctAnswer: 0 },
    { id: 205, question: "现在___三点ครึ่ง了，我们走吧。", options: ["昨天\n(zuótiān) (เมื่อวาน)", "现在\n(xiànzài) (ตอนนี้)", "明天\n(míngtiān) (พรุ่งนี้)", "今年\n(jīnnián) (ปีนี้)"], correctAnswer: 1 },
    { id: 206, question: "我不___高，她比我矮一点。", options: ["很\n(hěn) (มาก)", "太\n(tài) (เกินไป)", "最\n(zuì) (ที่สุด)", "都\n(dōu) (ล้วน)"], correctAnswer: 0 },
    { id: 207, question: "你叫什么___？我叫小明。", options: ["名字\n(míngzi) (ชื่อ)", "地方\n(dìfang) (สถานที่)", "衣服\n(yīfu) (เสื้อผ้า)", "钱\n(qián) (เงิน)"], correctAnswer: 0 },
    { id: 208, question: "这件衣服要___钱？", options: ["多少\n(duōshao) (เท่าไหร่)", "什么\n(shénme) (อะไร)", "哪个\n(nǎge) (อันไหน)", "几岁\n(jǐsuì) (กี่ขวบ)"], correctAnswer: 0 },
    { id: 209, question: "太___了！เราได้ที่หนึ่งเลย！", options: ["好\n(hǎo) (ดี)", "错\n(cuò) (ผิด)", "对\n(duì) (ถูก)", "累\n(lèi) (เหนื่อย)"], correctAnswer: 0 },
    { id: 210, question: "我不认识去车站的路，你___吗？", options: ["知道\n(zhīdào) (รู้)", "谢谢\n(xièxie) (ขอบคุณ)", "再见\n(zàijiàn) (ลาก่อน)", "没关系\n(méiguānxi) (ไม่เป็นไร)"], correctAnswer: 0 },
    { id: 211, question: "桌子上放着三___书。", options: ["本\n(běn) (เล่ม)", "个\n(gè) (ชิ้น/อัน)", "张\n(zhāng) (แผ่น)", "只\n(zhī) (ตัว)"], correctAnswer: 0 },
    { id: 212, question: "外面正在___，你出门记得带伞。", options: ["下雨\n(xià yǔ) (ฝนตก)", "刮风\n(guā fēng) (ลมพัด)", "下雪\n(xià xuě) (หิมะตก)", "晴天\n(qíngtiān) (แดดออก)"], correctAnswer: 0 },
    { id: 213, question: "爸爸每天坐___去公司上班。", options: ["火车\n(huǒchē) (รถไฟ)", "飞机\n(fēijī) (เครื่องบิน)", "地铁\n(dìtiě) (รถไฟใต้ดิน)", "自行车\n(zìxíngchē) (จักรยาน)"], correctAnswer: 2 },
    { id: 214, question: "妹妹最喜欢吃的水果是红___。", options: ["苹果\n(píngguǒ) (แอปเปิ้ล)", "香蕉\n(xiāngjiāo) (กล้วย)", "西瓜\n(xīguā) (แตงโม)", "葡萄\n(pútao) (องุ่น)"], correctAnswer: 0 },
    { id: 215, question: "老师，这道题我不太___，能再讲讲吗？", options: ["明白\n(míngbai) (เข้าใจ)", "高兴\n(gāoxìng) (ดีใจ)", "生气\n(shēngqì) (โกรธ)", "准备\n(zhǔnbèi) (เตรียมตัว)"], correctAnswer: 0 },
    { id: 216, question: "猫坐在椅子的___，正在睡觉呢。", options: ["下面\n(xiàmiàn) (ข้างใต้)", "前面\n(qiánmiàn) (ข้างหน้า)", "里面\n(lǐmiàn) (ข้างใน)", "左边\n(zuǒbiān) (ด้านซ้าย)"], correctAnswer: 0 },
    { id: 217, question: "你___说汉语吗？我会说一点点。", options: ["会\n(huì) (สามารถ/เป็น)", "想\n(xiǎng) (อยาก)", "要\n(yào) (เอา)", "喜欢\n(xǐhuan) (ชอบ)"], correctAnswer: 0 },
    { id: 218, question: "小狗在房间里跑来跑___，真可爱。", options: ["去\n(qù) (ไป)", "来\n(lái) (มา)", "上\n(shàng) (ขึ้น)", "下\n(xià) (ลง)"], correctAnswer: 0 },
    { id: 219, question: "晚上九点，我准备去___觉了。", options: ["睡\n(shuì) (นอน)", "吃\n(chī) (กิน)", "看\n(kàn) (ดู)", "写\n(xiě) (เขียน)"], correctAnswer: 0 },
    { id: 220, question: "这儿的人很___，排队排得很长。", options: ["多\n(duō) (มาก)", "少\n(shǎo) (น้อย)", "大\n(dà) (ใหญ่)", "冷\n(lěng) (หนาว)"], correctAnswer: 0 }
];
app.get('/api/quiz', (req, res) => {
    const { category } = req.query;
    let selectedData = [];

    if (category === 'culture') {
        selectedData = cultureData;
    } else if (category === 'chinese_vocab') {
        selectedData = chineseVocabData;
    } else {
        selectedData = chineseListeningData;
    }

    const shuffledQuestions = shuffleArray(selectedData).slice(0, 20);

    const secureQuiz = shuffledQuestions.map(q => {
        const optionsWithIndex = q.options.map((opt, idx) => ({ text: opt, originalIndex: idx }));
        const shuffledOptions = shuffleArray(optionsWithIndex);

        return {
            id: q.id,
            audio: q.audio || null,
            image: q.image || null,
            question: q.question || null,
            options: shuffledOptions.map(o => o.text),
            shuffledOrder: shuffledOptions.map(o => o.originalIndex)
        };
    });

    res.json(secureQuiz);
});

app.post('/api/check-answer', (req, res) => {
    const { questionId, selectedIndex } = req.body;
    
    let question = chineseListeningData.find(q => q.id === questionId);
    if (!question) question = cultureData.find(q => q.id === questionId);
    if (!question) question = chineseVocabData.find(q => q.id === questionId);
    
    if (!question) {
        return res.status(404).json({ error: 'ไม่พบชุดคำถามนี้ในระบบ' });
    }

    const isCorrect = question.correctAnswer === selectedIndex;
    const correctText = question.options[question.correctAnswer];
    
    res.json({ correct: isCorrect, correctAnswerText: correctText });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

module.exports = app;