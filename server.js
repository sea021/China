const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ฟังก์ชันสุ่มสลับตำแหน่ง Array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ==========================================
// คลังคำถาม 1: พาร์ทฟังภาษาจีนทั่วไป (Chinese Listening) - 20 ข้อ (ฟังเสียงแล้วตอบ)
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
    { id: 15, audio: 'https://www.purpleculture.net/mp3/xian4zai4ji3dian3.mp3', options: ['你叫什么名字？\n(Nǐ jiào shénme míngzi?) (คุณชื่ออะไร?)', '现在几点？\n(Xiànzài jǐ diǎn?) (ตอนนี้กี่โมงแล้ว?)', '你去哪儿？\n(Nǐ qù nǎr?) (คุณจะไปไหน?)', '你好吗？\n(Nǐ hǎo ma?) (คุณสบายดีไหม?)'], correctAnswer: 1 },
    { id: 16, audio: 'https://www.purpleculture.net/mp3/ni3shi4na3guo2ren2.mp3', options: ['你好吗？\n(Nǐ hǎo ma?) (คุณสบายดีไหม?)', '你是哪国人？\n(Nǐ Active nǎ guó rén?) (คุณเป็นคนประเทศอะไร?)', '你几岁了？\n(Nǐ jǐ suì le?) (คุณอายุเท่าไหร่?)', '你在做什么？\n(Nǐ zài zuò shénme?) (คุณกำลังทำอะไรอยู่?)'], correctAnswer: 1 },
    { id: 17, audio: 'https://www.purpleculture.net/mp3/wo3ai4ni3.mp3', options: ['我爱你\n(Wǒ ài nǐ) (ฉันรักคุณ)', '我喜欢你\n(Wǒ xǐhuan nǐ) (ฉันชอบคุณ)', '我想你\n(Wǒ xiǎng nǐ) (ฉันคิดถึงคุณ)', '我谢谢你\n(Wǒ xièxie nǐ) (ฉันขอบคุณคุณ)'], correctAnswer: 0 },
    { id: 18, audio: 'https://www.purpleculture.net/mp3/duo1shao5qian2.mp3', options: ['多少钱？\n(Duōshao qián?) (ราคาเท่าไหร่?)', '在哪儿？\n(Zài nǎr?) (อยู่ที่ไหน?)', '哪个？\n(Nǎ ge?) (อันไหน?)', '几个人？\n(Jǐ ge rén?) (กี่คน?)'], correctAnswer: 0 },
    { id: 19, audio: 'https://www.purpleculture.net/mp3/tai4hao3le5.mp3', options: ['不错\n(Búcuò) (ไม่เลวเลย)', '祝贺你\n(Zhùhè nǐ) (ยินดีด้วย)', '太好了\n(Tài hǎo le) (ยอดเยี่ยมไปเลย/ดีเหลือเกิน)', '没关系\n(Méiguānxi) (ไม่เป็นไร)'], correctAnswer: 2 },
    { id: 20, audio: 'https://www.purpleculture.net/mp3/zhen1de5ma5.mp3', options: ['真的吗？\n(Zhēn de ma?) (จริงเหรอ?)', '是对吗？\n(Shì duì ma?) (ใช่ไหม?)', '不是吧\n(Bú shì ba) (ไม่ใช่หรอก)', '当然\n(Dāngrán) (แน่นอน)'], correctAnswer: 0 }
];

// ==========================================
// คลังคำถาม 2: ประเพณีและวัฒนธรรมจีน (Culture) - 20 ข้อ (มีโจทย์ตัวหนังสือ + มีเสียงประกอบ)
// ==========================================
const cultureData = [
    { id: 101, question: "เทศกาลใดของจีนที่มีธรรมเนียมการกิน 'ขนมบ๊ะจ่าง' และแข่งเรือมังกร?", audio: "https://www.purpleculture.net/mp3/duan1wu3jie2.mp3", options: ["春节\n(Chūnjié) (เทศกาลตรุษจีน)", "中秋节\n(Zhōngqiūjié) (เทศกาลไหว้พระจันทร์)", "端午节\n(Duānwǔjié) (เทศกาลตวนอู่)", "清明节\n(Qīngmíngjié) (เทศกาลเชงเม้ง)"], correctAnswer: 2 },
    { id: 102, question: "สัตว์ชนิดใดที่เป็นสัญลักษณ์ของความทรงพลัง ความยิ่งใหญ่ และจักรพรรดิของจีน?", audio: "https://www.purpleculture.net/mp3/long2.mp3", options: ["龙\n(Lóng) (มังกร)", "凤凰\n(Fènghuáng) (หงส์)", "狮子\n(Shīzi) (สิงโต)", "熊猫\n(Xióngmāo) (แพนด้า)"], correctAnswer: 0 },
    { id: 103, question: "ตามความเชื่อของชาวจีน สีใดที่สื่อถึงความสุข โชคลาภ และความเป็นสิริมงคลนิยมใช้ในงานมงคล?", audio: "https://www.purpleculture.net/mp3/hong2se4.mp3", options: ["白色\n(Báisè) (สีขาว)", "黄色\n(Huángsè) (สีเหลือง)", "黑色\n(Hēisè) (สีดำ)", "红色\n(Hóngsè) (สีแดง)"], correctAnswer: 3 },
    { id: 104, question: "ในวันตรุษจีน เงินขวัญถุงที่ผู้ใหญ่จะมอบให้เด็ก ๆ บรรจุในซองสีแดง เรียกว่าอะไร?", audio: "https://www.purpleculture.net/mp3/hong2bao1.mp3", options: ["和服\n(Héfú) (กิโมโน)", "红包\n(Hóngbāo) (อั่งเปา / ซองแดง)", "年糕\n(Niángāo) (ขนมเข่ง)", "饺子\n(Jiǎozi) (เกี๊ยว)"], correctAnswer: 1 },
    { id: 105, question: "อาหารชนิดใดที่ชาวจีนนิยมทานในวันตรุษจีนเพราะมีรูปร่างคล้าย 'เงินตำลึงจีน' โบราณ สื่อถึงความมั่งคั่ง?", audio: "https://www.purpleculture.net/mp3/jiao3zi5.mp3", options: ["饺子\n(Jiǎozi) (เกี๊ยว)", "豆腐\n(Dòufu) (เต้าหู้)", "长寿面\n(Chángshòumiàn) (ก๋วยเตี๋ยวสายยาว)", "春卷\n(Chūnjuǎn) (ปอเปี๊ยะ)"], correctAnswer: 0 },
    { id: 106, question: "ศิลปะการต่อสู้และออกกำลังกายโบราณของจีนที่เน้นความนุ่มนวลและการคุมลมปราณคือข้อใด?", audio: "https://www.purpleculture.net/mp3/tai4ji2quan2.mp3", options: ["跆拳道\n(Táiquándào) (เทควันโด)", "泰拳\n(Tàiquán) (มวยไทย)", "太极拳\n(Tàijíquán) (มวยไทเก๊ก)", "空手道\n(Kōngshǒudào) (คาราเต้)"], correctAnswer: 2 },
    { id: 107, question: "ตัวเลขใดในวัฒนธรรมจีนที่ออกเสียงคล้ายคำว่า 'ความร่ำรวย' (ฟา) และถือเป็นเลขมงคลสูงสุดในการทำธุรกิจ?", audio: "https://www.purpleculture.net/mp3/ba1.mp3", options: ["四\n(Sì) (เลข 4)", "七\n(Qī) (เลข 7)", "八\n(Bā) (เลข 8)", "九\n(Jiǔ) (เลข 9)"], correctAnswer: 2 },
    { id: 108, question: "เครื่องดื่มชนิดใดที่มีต้นกำเนิดจากจีนและมีความผูกพันกับวิถีชีวิต ชาวยิยมดื่มเพื่อต้อนรับแขกผู้มาเยือน?", audio: "https://www.purpleculture.net/mp3/cha2.mp3", options: ["咖啡\n(Kāfēi) (กาแฟ)", "茶\n(Chá) (ชา)", "菊花茶\n(Júhuāchá) (น้ำเก๊กฮวย)", "白酒\n(Báijiǔ) (เหล้าจีน)"], correctAnswer: 1 },
    { id: 109, question: "ชุดแต่งกายประจำชาติของสตรีจีนที่มีลักษณะแนบเนื้อ คอตั้งสูง และผ่าข้าง เรียกว่าชุดอะไร?", audio: "https://www.purpleculture.net/mp3/qi2pao2.mp3", options: ["和服\n(Héfú) (ชุดกิโมโน)", "韩服\n(Hánfú) (ชุดฮันบก)", "旗袍\n(Qípáo) (ชุดกี่เพ้า)", "纱丽\n(Shālì) (ชุดส่าหรี)"], correctAnswer: 2 },
    { id: 110, question: "เทศกาลใดของจีนที่มีการกราบไหว้บรรพบุรุษที่ล่วงลับ ณ สุสานในช่วงเริ่มต้นฤดูใบไม้ผลิ?", audio: "https://www.purpleculture.net/mp3/qing1ming2jie2.mp3", options: ["斋节\n(Zhāijié) (เทศกาลกินเจ)", "清明节\n(Qīngmíngjié) (เทศกาลเชงเม้ง)", "中元节\n(Zhōngyuánjié) (เทศกาลสาทรจีน)", "水灯节\n(Shuǐdēngjié) (เทศกาลลอยกระทงจีน)"], correctAnswer: 1 },
    { id: 111, question: "วรรณกรรมคลาสสิกของจีนเรื่องใดที่บอกเล่าเรื่องราวการเดินทางไปอัญเชิญพระไตรปิฎก โดยมีซุนหงอคงเป็นตัวละครเอก?", audio: "https://www.purpleculture.net/mp3/xi1you2ji4.mp3", options: ["三国演义\n(Sānguó Yǎnyì) (สามก๊ก)", "西游记\n(Xīyóujì) (ไซอิ๋ว)", "红楼梦\n(Hónglóumèng) (ความฝันในหอแดง)", "水浒传\n(Shuǐhǔzhuàn) (ซ้องกั๋ง)"], correctAnswer: 1 },
    { id: 112, question: "เครื่องดนตรีจีนโบราณชนิดใดที่มีลักษณะเป็นเครื่องสายใช้ดีด มีจำนวนสายตั้งแต่ 21 สายขึ้นไป?", audio: "https://www.purpleculture.net/mp3/gu3zheng1.mp3", options: ["古筝\n(Gǔzhēng) (กู่เจิง)", "笛子\n(Dízi) (ขลุ่ยผิว)", "二胡\n(Èrhú) (ซอเอ้อhú)", "琵琶\n(Pípá) (พิณผีผา)"], correctAnswer: 0 },
    { id: 113, question: "สิ่งประดิษฐ์โบราณอันยิ่งใหญ่ของจีนข้อใดที่ช่วยในการบอกทิศทางและปฏิวัติการเดินเรือของโลก?", audio: "https://www.purpleculture.net/mp3/zhi3nan2zhen1.mp3", options: ["造纸术\n(Zàozhǐshù) (กระดาษ)", "指南针\n(Zhǐnánzhēn) (เข็มทิศ)", "火药\n(Huǒyào) (ดินปืน)", "印刷术\n(Yìnshuāshù) (แท่นพิมพ์)"], correctAnswer: 1 },
    { id: 114, question: "สถาปัตยกรรมสิ่งก่อสร้างขนาดใหญ่ของจีนที่สร้างขึ้นเพื่อป้องกันการรุกรานจากข้าศึกทางตอนเหนือคือข้อใด?", audio: "https://www.purpleculture.net/mp3/chang2cheng2.mp3", options: ["故宫\n(Gùgōng) (พระราชวังต้องห้าม)", "长城\n(Chángchéng) (กำแพงเมืองจีน)", "天坛\n(Tiāntán) (หอฟ้าเทียนถาน)", "秦始皇陵\n(Qínshǐhuáng Líng) (สุสานจิ๋นซีฮ่องเต้)"], correctAnswer: 1 },
    { id: 115, question: "ในค่ำคืนของเทศกาลไหว้พระจันทร์ ชาวจีนนิยมรับประทานขนมชนิดใดร่วมกับครอบครัว?", audio: "https://www.purpleculture.net/mp3/yue4bing3.mp3", options: ["年糕\n(Niángāo) (ขนมเข่ง)", "粽子\n(Zòngzi) (ขนมบ๊ะจ่าง)", "月饼\n(Yuèbǐng) (ขนมเปี๊ยะไหว้พระจันทร์)", "发糕\n(Fāgāo) (ขนมถ้วยฟู)"], correctAnswer: 2 },
    { id: 116, question: "ปรัชญาเมธีท่านใดของจีนที่มีคำสอนเน้นเรื่องคุณธรรม ความกตัญญู และจริยธรรมในการปกครอง?", audio: "https://www.purpleculture.net/mp3/kong3zi3.mp3", options: ["孔子\n(Kǒngzǐ) (ขงจื๊อ)", "老子\n(Lǎozǐ) (เล่าจื๊อ)", "孟子\n(Mèngzǐ) (เม่งจื๊อ)", "秦始皇\n(Qínshǐhuáng) (จิ๋นซีฮ่องเต้)"], correctAnswer: 0 },
    { id: 117, question: "การละเล่นในงานเทศกาลของจีนที่ใช้ผู้แสดงเชิดหุ่นเลียนแบบท่าทางสัตว์มงคลเพื่อความสนุกสนานและปัดเป่าสิ่งชั่วร้ายคือข้อใด?", audio: "https://www.purpleculture.net/mp3/wu3shi1.mp3", options: ["舞龙\n(Wǔlóng) (การเชิดมังกร)", "舞狮\n(Wǔshī) (การเชิดสิงโต)", "京剧\n(Jīngjù) (งิ้วจีน)", "扇子舞\n(Shànziwǔ) (ระบำพัด)"], correctAnswer: 1 },
    { id: 118, question: "ตัวเลขใดในทางวัฒนธรรมจีนที่มักหลีกเลี่ยงเนื่องจากออกเสียงคล้ายคำว่า 'ตาย' (สี่)?", audio: "https://www.purpleculture.net/mp3/si4.mp3", options: ["二\n(Èr) (เลข 2)", "四\n(Sì) (เลข 4)", "六\n(Liù) (เลข 6)", "八\n(Bā) (เลข 8)"], correctAnswer: 1 },
    { id: 119, question: "อุปกรณ์โบราณที่ชาวจีนประดิษฐ์ขึ้นเพื่อใช้ในการคำนวณและคิดเลขได้อย่างรวดเร็วคืออะไร?", audio: "https://www.purpleculture.net/mp3/suan4pan2.mp3", options: ["算盘\n(Suànpán) (ลูกคิดจีน)", "笔记本\n(Bǐjì脿n) (กระดาษบันทึก)", "算筹\n(Suànchóu) (แท่งไม้คำนวณ)", "日晷\n(Rìguǐ) (นาฬิกาแดด)"], correctAnswer: 0 },
    { id: 120, question: "ศิลปะการแสดงโบราณของจีนที่รวมการร้อง การเจรจา และการแต่งหน้าเข้มข้นตามสีสันของตัวละครเรียกว่าอะไร?", audio: "https://www.purpleculture.net/mp3/jing1ju4.mp3", options: ["音乐剧\n(Yīnyuèjù) (ละครเพลง)", "民族舞\n(Mínzúwǔ) (ระบำชนเผ่า)", "京剧\n(Jīngjù) (งิ้วปักกิ่ง)", "木偶戏\n(Mùǒuxì) (หุ่นกระบอก)"], correctAnswer: 2 }
];

// ==========================================
// คลังคำถาม 3: พาร์ทฟังคำศัพท์จีน (Vocab Listening) - 20 ข้อ (ฟังเสียงแล้วตอบ ไม่มีโจทย์ตัวหนังสือ)
// ==========================================
const chineseVocabListeningData = [
    { id: 201, audio: "https://www.purpleculture.net/mp3/ben3.mp3", options: ["本\n(běn) (เล่ม)", "个\n(gè) (ชิ้น/อัน)", "张\n(zhāng) (แผ่น)", "只\n(zhī) (ตัว)"], correctAnswer: 0 },
    { id: 202, audio: "https://www.purpleculture.net/mp3/xiao3.mp3", options: ["小\n(xiǎo) (เล็ก)", "大\n(dà) (ใหญ่)", "多\n(duō) (มาก)", "少\n(shǎo) (น้อย)"], correctAnswer: 0 },
    { id: 203, audio: "https://www.purpleculture.net/mp3/lao3shi1.mp3", options: ["学生\n(xuéshēng) (นักเรียน)", "老师\n(lǎoshī) (คุณครู)", "医生\n(yīshēng) (หมอ)", "朋友\n(péngyou) (เพื่อน)"], correctAnswer: 1 },
    { id: 204, audio: "https://www.purpleculture.net/mp3/ai4.mp3", options: ["爱\n(ài) (รัก)", "恨\n(hèn) (เกลียด)", "想\n(xiǎng) (คิดถึง)", "怕\n(pà) (กลัว)"], correctAnswer: 0 },
    { id: 205, audio: "https://www.purpleculture.net/mp3/ping2guo3.mp3", options: ["香蕉\n(xiāngjiāo) (กล้วย)", "桔子\n(júzi) (ส้ม)", "苹果\n(píngguǒ) (แอปเปิ้ล)", "西瓜\n(xīguā) (แตงโม)"], correctAnswer: 2 },
    { id: 206, audio: "https://www.purpleculture.net/mp3/yi1sheng1.mp3", options: ["医生\n(yīshēng) (หมอ)", "医院\n(yīyuàn) (โรงพยาบาล)", "护士\n(hùshi) (พยาบาล)", "病人\n(bìngrén) (คนไข้)"], correctAnswer: 0 },
    { id: 207, audio: "https://www.purpleculture.net/mp3/bu2ke4qi5.mp3", options: ["不客气\n(búkèqi) (ไม่เป็นไร)", "对不起\n(duìbuqǐ) (ขอโทษ)", "没关系\n(méiguānxi) (ไม่เป็นไร)", "再见\n(zàijiàn) (ลาก่อน)"], correctAnswer: 0 },
    { id: 208, audio: "https://www.purpleculture.net/mp3/xia4yu3.mp3", options: ["下雨\n(xià yǔ) (ฝนตก)", "刮风\n(guā fēng) (ลมแรง)", "下雪\n(xià xuě) (หิมะตก)", "晴天\n(qíngtiān) (แดดออก)"], correctAnswer: 0 },
    { id: 209, audio: "https://www.purpleculture.net/mp3/kan4.mp3", options: ["听\n(tīng) (ฟัง)", "说\n(shuō) (พูด)", "看\n(kàn) (ดู/มอง)", "写\n(xiě) (เขียน)"], correctAnswer: 2 },
    { id: 210, audio: "https://www.purpleculture.net/mp3/ba1.mp3", options: ["一\n(yī) (หนึ่ง)", "五\n(wǔ) (ห้า)", "六\n(liù) (หก)", "八\n(bā) (แปด)"], correctAnswer: 3 },
    { id: 211, audio: "https://www.purpleculture.net/mp3/wan3shang5.mp3", options: ["早上\n(zǎoshang) (ตอนเช้า)", "中午\n(zhōngwǔ) (ตอนเที่ยง)", "下午\n(xiàwǔ) (ตอนบ่าย)", "晚上\n(wǎnshang) (ตอนเย็น/ค่ำ)"], correctAnswer: 3 },
    { id: 212, audio: "https://www.purpleculture.net/mp3/mai4.mp3", options: ["卖\n(mài) (ขาย)", "买\n(mǎi) (ซื้อ)", "慢\n(màn) (ช้า)", "忙\n(máng) (ยุ่ง)"], correctAnswer: 0 },
    { id: 213, audio: "https://www.purpleculture.net/mp3/shui3.mp3", options: ["水\n(shuǐ) (น้ำ)", "茶\n(chá) (ชา)", "米饭\n(mǐfàn) (ข้าวสวย)", "面条\n(miàntiáo) (บะหมี่)"], correctAnswer: 0 },
    { id: 214, audio: "https://www.purpleculture.net/mp3/mao1.mp3", options: ["狗\n(gǒu) (สุนัข)", "猫\n(māo) (แมว)", "鸟\n(niǎo) (นก)", "鱼\n(yú) (ปลา)"], correctAnswer: 1 },
    { id: 215, audio: "https://www.purpleculture.net/mp3/fei1ji1.mp3", options: ["火车\n(huǒchē) (รถไฟ)", "飞机\n(fēijī) (เครื่องบิน)", "出租车\n(chūzūchē) (แท็กซี่)", "自行车\n(zìxíngchē) (จักรยาน)"], correctAnswer: 1 },
    { id: 216, audio: "https://www.purpleculture.net/mp3/qian2mian4.mp3", options: ["前面\n(qiánmiàn) (ด้านหน้า)", "后面\n(hòumiàn) (ด้านหลัง)", "左边\n(zuǒbiān) (ด้านซ้าย)", "右边\n(yòubiān) (ด้านขวา)"], correctAnswer: 0 },
    { id: 217, audio: "https://www.purpleculture.net/mp3/gao1xing4.mp3", options: ["生气\n(shēngqì) (โกรธ)", "高兴\n(gāoxìng) (ดีใจ/สุขใจ)", "难过\n(nánguò) (เสียใจ)", "害怕\n(hàipà) (กลัว)"], correctAnswer: 1 },
    { id: 218, audio: "https://www.purpleculture.net/mp3/han4yu3.mp3", options: ["汉语\n(Hànyǔ) (ภาษาจีน)", "英语\n(Yīngyǔ) (ภาษาอังกฤษ)", "泰语\n(Tàiyǔ) (ภาษาไทย)", "日语\n(Rìyǔ) (ภาษาญี่ปุ่น)"], correctAnswer: 0 },
    { id: 219, audio: "https://www.purpleculture.net/mp3/shou3ji1.mp3", options: ["电脑\n(diànnǎo) (คอมพิวเตอร์)", "电视\n(diànshì) (โทรทัศน์)", "手机\n(shǒujī) (โทรศัพท์มือถือ)", "手表\n(shǒubiǎo) (นาฬิกาข้อมือ)"], correctAnswer: 2 },
    { id: 220, audio: "https://www.purpleculture.net/mp3/re4.mp3", options: ["冷\n(lěng) (หนาว)", "热\n(rè) (ร้อน)", "晴\n(qíng) (แดดจ้า)", "阴\n(yīn) (ครึ้มฟ้าฝน)"], correctAnswer: 1 }
];

// 1. API สำหรับดึงข้อสอบสุ่มแบบกระจายตัวและปลอดภัย
app.get('/api/quiz', (req, res) => {
    const { category } = req.query;
    let selectedData = [];

    if (category === 'culture') {
        selectedData = cultureData;
    } else if (category === 'chinese_vocab_listening') {
        selectedData = chineseVocabListeningData; // โหลดหมวดฟังคำศัพท์เพียว ๆ
    } else {
        selectedData = chineseListeningData; // Default เป็นหมวดฟังทั่วไป
    }

    // สุ่มข้อสอบทั้งหมดในหมวดแล้วตัดดึงมาเล่นแค่ 20 ข้อ
    const shuffledQuestions = shuffleArray(selectedData).slice(0, 20);

    // ปลอดภัยยิ่งขึ้นด้วยการสุ่มช้อยส์สลับตำแหน่งจากฝั่งหลังบ้าน
    const secureQuiz = shuffledQuestions.map(q => {
        const optionsWithIndex = q.options.map((opt, idx) => ({ text: opt, originalIndex: idx }));
        const shuffledOptions = shuffleArray(optionsWithIndex);

        return {
            id: q.id,
            audio: q.audio || null,
            question: q.question || null, // ส่งค่า null ไปหน้าบ้านถ้าเป็นหมวดฟังเสียง เพื่อไม่ให้โชว์โจทย์ตัวหนังสือ
            options: shuffledOptions.map(o => o.text),
            shuffledOrder: shuffledOptions.map(o => o.originalIndex)
        };
    });

    res.json(secureQuiz);
});

// 2. API ตรวจคำตอบที่ปลอดภัย ค้นหาจับคู่ตาม ID คำถามจริง
app.post('/api/check-answer', (req, res) => {
    const { questionId, selectedIndex } = req.body;
    
    let question = chineseListeningData.find(q => q.id === questionId);
    if (!question) {
        question = cultureData.find(q => q.id === questionId);
    }
    if (!question) {
        question = chineseVocabListeningData.find(q => q.id === questionId);
    }
    
    if (!question) {
        return res.status(404).json({ error: 'ไม่พบชุดคำถามนี้ในระบบ' });
    }

    const isCorrect = question.correctAnswer === selectedIndex;
    const correctText = question.options[question.correctAnswer];
    
    res.json({
        correct: isCorrect,
        correctAnswerText: correctText
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// รองรับการรันทั้งแบบ Local และ Vercel Serverless
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;