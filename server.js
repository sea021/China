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
const listeningData = [
{
    id: 1,
    audio: "https://www.purpleculture.net/mp3/ni3hao3.mp3",
    options: [
        "你好\n(nǐhǎo) (สวัสดี)",
        "谢谢\n(xièxie) (ขอบคุณ)",
        "再见\n(zàijiàn) (ลาก่อน)",
        "对不起\n(duìbuqǐ) (ขอโทษ)"
    ],
    correctAnswer: 0
},
{
    id: 2,
    audio: "https://www.purpleculture.net/mp3/xie4xie5.mp3",
    options: [
        "再见\n(zàijiàn) (ลาก่อน)",
        "你好\n(nǐhǎo) (สวัสดี)",
        "谢谢\n(xièxie) (ขอบคุณ)",
        "没关系\n(méiguānxi) (ไม่เป็นไร)"
    ],
    correctAnswer: 2
},
{
    id: 3,
    audio: "https://www.purpleculture.net/mp3/zai4jian4.mp3",
    options: [
        "对不起\n(duìbuqǐ) (ขอโทษ)",
        "再见\n(zàijiàn) (ลาก่อน)",
        "不客气\n(búkèqi) (ด้วยความยินดี)",
        "没关系\n(méiguānxi) (ไม่เป็นไร)"
    ],
    correctAnswer: 1
},
{
    id: 4,
    audio: "https://www.purpleculture.net/mp3/dui4bu4qi3.mp3",
    options: [
        "谢谢\n(xièxie) (ขอบคุณ)",
        "你好\n(nǐhǎo) (สวัสดี)",
        "请问\n(qǐngwèn) (ขอถามหน่อย)",
        "对不起\n(duìbuqǐ) (ขอโทษ)"
    ],
    correctAnswer: 3
},
{
    id: 5,
    audio: "https://www.purpleculture.net/mp3/mei2guan1xi5.mp3",
    options: [
        "没关系\n(méiguānxi) (ไม่เป็นไร)",
        "不客气\n(búkèqi) (ด้วยความยินดี)",
        "我知道\n(wǒ zhīdào) (ฉันรู้)",
        "好\n(hǎo) (ตกลง)"
    ],
    correctAnswer: 0
},
{
    id: 6,
    audio: "https://www.purpleculture.net/mp3/bu2ke4qi5.mp3",
    options: [
        "再见\n(zàijiàn) (ลาก่อน)",
        "对不起\n(duìbuqǐ) (ขอโทษ)",
        "不客气\n(búkèqi) (ด้วยความยินดี)",
        "谢谢\n(xièxie) (ขอบคุณ)"
    ],
    correctAnswer: 2
},
{
    id: 7,
    audio: "https://www.purpleculture.net/mp3/qing3wen4.mp3",
    options: [
        "请问\n(qǐngwèn) (ขอถามหน่อย)",
        "你好\n(nǐhǎo) (สวัสดี)",
        "谢谢\n(xièxie) (ขอบคุณ)",
        "再见\n(zàijiàn) (ลาก่อน)"
    ],
    correctAnswer: 0
},
{
    id: 8,
    audio: "https://www.purpleculture.net/mp3/hao3.mp3",
    options: [
        "不知道\n(bù zhīdào) (ไม่รู้)",
        "对不起\n(duìbuqǐ) (ขอโทษ)",
        "谢谢\n(xièxie) (ขอบคุณ)",
        "好\n(hǎo) (ตกลง/ดี)"
    ],
    correctAnswer: 3
},
{
    id: 9,
    audio: "https://www.purpleculture.net/mp3/bu4zhi1dao4.mp3",
    options: [
        "我知道\n(wǒ zhīdào) (ฉันรู้)",
        "不知道\n(bù zhīdào) (ไม่รู้)",
        "没关系\n(méiguānxi) (ไม่เป็นไร)",
        "请问\n(qǐngwèn) (ขอถามหน่อย)"
    ],
    correctAnswer: 1
},
{
    id: 10,
    audio: "https://www.purpleculture.net/mp3/zhi1dao4.mp3",
    options: [
        "我知道\n(wǒ zhīdào) (ฉันรู้)",
        "不知道\n(bù zhīdào) (ไม่รู้)",
        "谢谢\n(xièxie) (ขอบคุณ)",
        "再见\n(zàijiàn) (ลาก่อน)"
    ],
    correctAnswer: 0
}
];
// ==========================================
// คลังคำถาม 2: ประเพณีและวัฒนธรรมจีน (Culture) - ปรับ Path ชื่อไฟล์เป็นภาษาไทยตรงตามโฟลเดอร์ของพี่ซี
// ==========================================
const speakingData = [
{
    id:101,
    question:"หากต้องการกล่าวคำว่า 'สวัสดี' ควรพูดว่าอะไร",
    options:[
        {text:"你好", pinyin:"Nǐ hǎo"},
        {text:"谢谢", pinyin:"Xièxie"},
        {text:"再见", pinyin:"Zàijiàn"},
        {text:"对不起", pinyin:"Duìbuqǐ"}
    ],
    correctAnswer:0
},
{
    id:102,
    question:"หากต้องการกล่าวคำว่า 'ขอบคุณ'",
    options:[
        {text:"你好", pinyin:"Nǐ hǎo"},
        {text:"谢谢", pinyin:"Xièxie"},
        {text:"不客气", pinyin:"Bú kèqi"},
        {text:"请问", pinyin:"Qǐngwèn"}
    ],
    correctAnswer:1
},
{
    id:103,
    question:"หากต้องการกล่าวคำว่า 'ลาก่อน'",
    options:[
        {text:"谢谢", pinyin:"Xièxie"},
        {text:"你好", pinyin:"Nǐ hǎo"},
        {text:"再见", pinyin:"Zàijiàn"},
        {text:"请", pinyin:"Qǐng"}
    ],
    correctAnswer:2
},
{
    id:104,
    question:"หากต้องการกล่าวคำว่า 'ขอโทษ'",
    options:[
        {text:"没关系", pinyin:"Méi guānxi"},
        {text:"谢谢", pinyin:"Xièxie"},
        {text:"对不起", pinyin:"Duìbuqǐ"},
        {text:"你好", pinyin:"Nǐ hǎo"}
    ],
    correctAnswer:2
},
{
    id:105,
    question:"เมื่อมีคนพูดว่า '谢谢' ควรตอบว่า",
    options:[
        {text:"不客气", pinyin:"Bú kèqi"},
        {text:"你好", pinyin:"Nǐ hǎo"},
        {text:"再见", pinyin:"Zàijiàn"},
        {text:"对不起", pinyin:"Duìbuqǐ"}
    ],
    correctAnswer:0
},
{
    id:106,
    question:"หากต้องการถามว่า 'คุณชื่ออะไร'",
    options:[
        {text:"你叫什么名字？", pinyin:"Nǐ jiào shénme míngzi?"},
        {text:"你好吗？", pinyin:"Nǐ hǎo ma?"},
        {text:"你是哪国人？", pinyin:"Nǐ shì nǎ guó rén?"},
        {text:"你几岁？", pinyin:"Nǐ jǐ suì?"}
    ],
    correctAnswer:0
},
{
    id:107,
    question:"หากต้องการถามว่า 'คุณสบายดีไหม'",
    options:[
        {text:"你好吗？", pinyin:"Nǐ hǎo ma?"},
        {text:"你去哪儿？", pinyin:"Nǐ qù nǎr?"},
        {text:"多少钱？", pinyin:"Duōshǎo qián?"},
        {text:"几点了？", pinyin:"Jǐ diǎn le?"}
    ],
    correctAnswer:0
},
{
    id:108,
    question:"หากต้องการถามว่า 'ราคาเท่าไหร่'",
    options:[
        {text:"多少钱？", pinyin:"Duōshǎo qián?"},
        {text:"你叫什么名字？", pinyin:"Nǐ jiào shénme míngzi?"},
        {text:"你好吗？", pinyin:"Nǐ hǎo ma?"},
        {text:"谢谢", pinyin:"Xièxie"}
    ],
    correctAnswer:0
},
{
    id:109,
    question:"หากต้องการพูดว่า 'ฉันรักคุณ'",
    options:[
        {text:"我爱你", pinyin:"Wǒ ài nǐ"},
        {text:"我喜欢你", pinyin:"Wǒ xǐhuān nǐ"},
        {text:"我想你", pinyin:"Wǒ xiǎng nǐ"},
        {text:"谢谢你", pinyin:"Xièxie nǐ"}
    ],
    correctAnswer:0
},
{
    id:110,
    question:"หากต้องการถามว่า 'ตอนนี้กี่โมง'",
    options:[
        {text:"现在几点？", pinyin:"Xiànzài jǐ diǎn?"},
        {text:"你在哪儿？", pinyin:"Nǐ zài nǎr?"},
        {text:"今天星期几？", pinyin:"Jīntiān xīngqī jǐ?"},
        {text:"多少钱？", pinyin:"Duōshǎo qián?"}
    ],
    correctAnswer:0
}
];
// ==========================================
// คลังคำถาม 3: หมวดเติมคำศัพท์ภาษาจีนในประโยค (มีตัวจีน พินอิน และคำแปลครบถ้วน)
// ==========================================
const writingData = [

{
id:301,
question:"我___学生。",
pinyin:"Wǒ ___ xuésheng.",
options:[
    {text:"是",pinyin:"shì"},
    {text:"有",pinyin:"yǒu"},
    {text:"去",pinyin:"qù"},
    {text:"在",pinyin:"zài"}
],
correctAnswer:0
},


{
id:302,
question:"她___老师。",
pinyin:"Tā ___ lǎoshī.",
options:[
    {text:"是",pinyin:"shì"},
    {text:"有",pinyin:"yǒu"},
    {text:"去",pinyin:"qù"},
    {text:"吃",pinyin:"chī"}
],
correctAnswer:0
},


{
id:303,
question:"我喜欢___苹果。",
pinyin:"Wǒ xǐhuān ___ píngguǒ.",
options:[
    {text:"吃",pinyin:"chī"},
    {text:"喝",pinyin:"hē"},
    {text:"看",pinyin:"kàn"},
    {text:"写",pinyin:"xiě"}
],
correctAnswer:0
},


{
id:304,
question:"今天___星期一。",
pinyin:"Jīntiān ___ xīngqīyī.",
options:[
    {text:"是",pinyin:"shì"},
    {text:"有",pinyin:"yǒu"},
    {text:"去",pinyin:"qù"},
    {text:"做",pinyin:"zuò"}
],
correctAnswer:0
},


{
id:305,
question:"我___泰国人。",
pinyin:"Wǒ ___ Tàiguó rén.",
options:[
    {text:"是",pinyin:"shì"},
    {text:"叫",pinyin:"jiào"},
    {text:"住",pinyin:"zhù"},
    {text:"学",pinyin:"xué"}
],
correctAnswer:0
},


{
id:306,
question:"我们___学校学习。",
pinyin:"Wǒmen ___ xuéxiào xuéxí.",
options:[
    {text:"在",pinyin:"zài"},
    {text:"有",pinyin:"yǒu"},
    {text:"是",pinyin:"shì"},
    {text:"吃",pinyin:"chī"}
],
correctAnswer:0
},


{
id:307,
question:"他___汉语。",
pinyin:"Tā ___ Hànyǔ.",
options:[
    {text:"学习",pinyin:"xuéxí"},
    {text:"喝",pinyin:"hē"},
    {text:"睡",pinyin:"shuì"},
    {text:"跑",pinyin:"pǎo"}
],
correctAnswer:0
},


{
id:308,
question:"妈妈___饭。",
pinyin:"Māma ___ fàn.",
options:[
    {text:"做",pinyin:"zuò"},
    {text:"写",pinyin:"xiě"},
    {text:"听",pinyin:"tīng"},
    {text:"坐",pinyin:"zuò"}
],
correctAnswer:0
},


{
id:309,
question:"我___水。",
pinyin:"Wǒ ___ shuǐ.",
options:[
    {text:"喝",pinyin:"hē"},
    {text:"看",pinyin:"kàn"},
    {text:"说",pinyin:"shuō"},
    {text:"写",pinyin:"xiě"}
],
correctAnswer:0
},


{
id:310,
question:"姐姐___书。",
pinyin:"Jiějie ___ shū.",
options:[
    {text:"看",pinyin:"kàn"},
    {text:"听",pinyin:"tīng"},
    {text:"跑",pinyin:"pǎo"},
    {text:"跳",pinyin:"tiào"}
],
correctAnswer:0
}

];
 const readingData = [
{
id:201,
passage:"我叫小明。我是泰国人。我今年十八岁。",
pinyin:"Wǒ jiào Xiǎomíng. Wǒ shì Tàiguó rén. Wǒ jīnnián shíbā suì.",
question:"จากข้อความ ผู้พูดอายุเท่าไร",
options:["16 ปี","17 ปี","18 ปี","20 ปี"],
correctAnswer:2
},
{
id:202,
passage:"王老师在学校教汉语。",
pinyin:"Wáng lǎoshī zài xuéxiào jiāo Hànyǔ.",
question:"คุณหวังทำอาชีพอะไร",
options:["หมอ","ครู","ตำรวจ","นักเรียน"],
correctAnswer:1
},
{
id:203,
passage:"今天星期一，我们去学校上课。",
pinyin:"Jīntiān xīngqīyī, wǒmen qù xuéxiào shàngkè.",
question:"วันนี้วันอะไร",
options:["วันอาทิตย์","วันจันทร์","วันศุกร์","วันเสาร์"],
correctAnswer:1
},
{
id:204,
passage:"我的家有四个人。",
pinyin:"Wǒ de jiā yǒu sì ge rén.",
question:"ในครอบครัวมีกี่คน",
options:["2 คน","3 คน","4 คน","5 คน"],
correctAnswer:2
},
{
id:205,
passage:"我喜欢吃苹果。",
pinyin:"Wǒ xǐhuān chī píngguǒ.",
question:"ผู้พูดชอบกินอะไร",
options:["กล้วย","ส้ม","แอปเปิล","แตงโม"],
correctAnswer:2
},
{
id:206,
passage:"妹妹今年十岁。",
pinyin:"Mèimei jīnnián shí suì.",
question:"น้องสาวอายุเท่าไร",
options:["8 ปี","9 ปี","10 ปี","11 ปี"],
correctAnswer:2
},
{
id:207,
passage:"爸爸每天开车去公司。",
pinyin:"Bàba měitiān kāichē qù gōngsī.",
question:"คุณพ่อเดินทางไปทำงานอย่างไร",
options:["รถไฟ","จักรยาน","รถยนต์","รถเมล์"],
correctAnswer:2
},
{
id:208,
passage:"今天很热，我想喝水。",
pinyin:"Jīntiān hěn rè, wǒ xiǎng hē shuǐ.",
question:"ผู้พูดต้องการดื่มอะไร",
options:["ชา","กาแฟ","น้ำ","นม"],
correctAnswer:2
},
{
id:209,
passage:"现在是晚上九点。",
pinyin:"Xiànzài shì wǎnshang jiǔ diǎn.",
question:"ตอนนี้เป็นเวลาใด",
options:["09.00 น.","21.00 น.","18.00 น.","12.00 น."],
correctAnswer:1
},
{
id:210,
passage:"我的猫在桌子下面。",
pinyin:"Wǒ de māo zài zhuōzi xiàmian.",
question:"แมวอยู่ที่ไหน",
options:["บนโต๊ะ","ใต้โต๊ะ","หน้าประตู","บนเตียง"],
correctAnswer:1
}
];
app.get('/api/quiz', (req, res) => {

    const { category } = req.query;

    let selectedData = [];

    switch (category) {

        case "listening":
            selectedData = listeningData;
            break;

        case "speaking":
            selectedData = speakingData;
            break;

        case "reading":
            selectedData = readingData;
            break;

        case "writing":
            selectedData = writingData;
            break;

        default:
            selectedData = listeningData;
            break;
    }

    // สุ่ม 10 ข้อ
    const shuffledQuestions = shuffleArray(selectedData).slice(0, 10);

    const secureQuiz = shuffledQuestions.map(q => {

        // รองรับทั้งข้อมูลแบบเก่าและแบบใหม่
        const options = q.options.map((o, i) => {

            if (typeof o === "string") {

                return {
                    text: o,
                    pinyin: "",
                    originalIndex: i
                };

            }

            return {
                text: o.text,
                pinyin: o.pinyin || "",
                originalIndex: i
            };

        });

        const shuffled = shuffleArray(options);

        return {

            id: q.id,
            audio: q.audio || null,
            image: q.image || null,
            passage: q.passage || null,
            question: q.question || null,
            pinyin: q.pinyin || null,

            options: shuffled.map(o => ({
                text: o.text,
                pinyin: o.pinyin
            })),

            shuffledOrder: shuffled.map(o => o.originalIndex)

        };

    });

    res.json(secureQuiz);

});

            
app.post('/api/check-answer', (req, res) => {

    const { questionId, selectedIndex, shuffledOrder } = req.body;

    const question =
        listeningData.find(q => q.id === questionId) ||
        speakingData.find(q => q.id === questionId) ||
        readingData.find(q => q.id === questionId) ||
        writingData.find(q => q.id === questionId);

    if (!question) {
        return res.status(404).json({
            error: "ไม่พบข้อสอบ"
        });
    }

    // แปลงตำแหน่งที่ผู้ใช้เลือกกลับเป็นตำแหน่งเดิม
    const originalIndex = shuffledOrder[selectedIndex];

    const isCorrect = originalIndex === question.correctAnswer;

    res.json({
        correct: isCorrect,
        correctAnswerText: question.options[question.correctAnswer].text
    });

});
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

module.exports = app;