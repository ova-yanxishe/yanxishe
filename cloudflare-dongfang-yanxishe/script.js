const form = document.querySelector("#reportForm");
const report = document.querySelector("#report");
const submitStatus = document.querySelector("#submitStatus");
const langToggle = document.querySelector("#langToggle");
const previewBtn = document.querySelector("#previewBtn");
const filloutBtn = document.querySelector("#filloutBtn");
const birthDatePickBtn = document.querySelector("#birthDatePickBtn");
const birthDatePicker = document.querySelector("#birthDatePicker");
const birthProvince = document.querySelector("select[name=\"birthProvince\"]");
const birthCityCounty = document.querySelector("select[name=\"birthCityCounty\"]");
const birthPlacePreset = document.querySelector("select[name=\"birthPlacePreset\"]");
const birthLongitudeInput = document.querySelector("input[name=\"birthLongitude\"]");
const dailyDate = document.querySelector("#dailyDate");
const dailyHexSymbol = document.querySelector("#dailyHexSymbol");
const dailyHexagram = document.querySelector("#dailyHexagram");
const dailyHexText = document.querySelector("#dailyHexText");
const dailyDayPillarText = document.querySelector("#dailyDayPillarText");
const dailyYiText = document.querySelector("#dailyYiText");
const dailyJiText = document.querySelector("#dailyJiText");
const dailySolarTermText = document.querySelector("#dailySolarTermText");
const dailyColors = document.querySelector("#dailyColors");
const dailyColorText = document.querySelector("#dailyColorText");
const dailyPoem = document.querySelector("#dailyPoem");
const dailyRitualTitle = document.querySelector("#dailyRitualTitle");
const dailyRitualText = document.querySelector("#dailyRitualText");
const dailyRitualTip = document.querySelector("#dailyRitualTip");
const studyCardElement = document.querySelector("#studyCardElement");
const studyCardTitle = document.querySelector("#studyCardTitle");
const studyCardText = document.querySelector("#studyCardText");
const studyCardList = document.querySelector("#studyCardList");
const dailyTestResult = document.querySelector("#dailyTestResult");
const dailyArticleTitle = document.querySelector("#dailyArticleTitle");
const dailyArticleText = document.querySelector("#dailyArticleText");
const dailyArticleQuote = document.querySelector("#dailyArticleQuote");
const dailyArticleCta = document.querySelector("#dailyArticleCta");
const oracleTopic = document.querySelector("#oracleTopic");
const oracleBtn = document.querySelector("#oracleBtn");
const oracleResult = document.querySelector("#oracleResult");
const qinMode = document.querySelector("#qinMode");
const qinResult = document.querySelector("#qinResult");
const qinTrackList = document.querySelector("#qinTrackList");
const queryDateInput = document.querySelector("#queryDateInput");
const queryYear = document.querySelector("#queryYear");
const queryMonth = document.querySelector("#queryMonth");
const queryDay = document.querySelector("#queryDay");
const queryDatePickBtn = document.querySelector("#queryDatePickBtn");
const queryDatePicker = document.querySelector("#queryDatePicker");
const queryAlmanacBtn = document.querySelector("#queryAlmanacBtn");
const queryResult = document.querySelector("#queryResult");

const OWNER_WECHAT = "OVA_Yanxishe";
let currentLang = localStorage.getItem("ova_lang") || "zh";
let lastReport = null;
const qinAudioState = { ctx: null, timers: [], activeKey: null };

const stems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const stemElement = {
  甲: "wood", 乙: "wood", 丙: "fire", 丁: "fire", 戊: "earth", 己: "earth", 庚: "metal", 辛: "metal", 壬: "water", 癸: "water"
};
const branchElement = {
  子: "water", 丑: "earth", 寅: "wood", 卯: "wood", 辰: "earth", 巳: "fire", 午: "fire", 未: "earth", 申: "metal", 酉: "metal", 戌: "earth", 亥: "water"
};
const elementOrder = ["wood", "fire", "earth", "metal", "water"];
const elementHan = { wood: "木", fire: "火", earth: "土", metal: "金", water: "水" };
const elementEn = { wood: "Wood", fire: "Fire", earth: "Earth", metal: "Metal", water: "Water" };
const monthBranchBySolarMonth = ["寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑"];
const monthStemStart = { 甲: 2, 己: 2, 乙: 4, 庚: 4, 丙: 6, 辛: 6, 丁: 8, 壬: 8, 戊: 0, 癸: 0 };
const hourStemStart = { 甲: 0, 己: 0, 乙: 2, 庚: 2, 丙: 4, 辛: 4, 丁: 6, 壬: 6, 戊: 8, 癸: 8 };
const placePresets = {
  beijing: { name: "北京｜东城区", longitude: 116.42, timezone: "+08:00" },
  shanghai: { name: "上海｜黄浦区", longitude: 121.49, timezone: "+08:00" },
  guangzhou: { name: "广东｜广州", longitude: 113.26, timezone: "+08:00" },
  shenzhen: { name: "广东｜深圳", longitude: 114.06, timezone: "+08:00" },
  hangzhou: { name: "浙江｜杭州", longitude: 120.16, timezone: "+08:00" },
  nanjing: { name: "江苏｜南京", longitude: 118.78, timezone: "+08:00" },
  suzhou: { name: "江苏｜苏州", longitude: 120.62, timezone: "+08:00" },
  chengdu: { name: "四川｜成都", longitude: 104.07, timezone: "+08:00" },
  chongqing: { name: "重庆｜渝中区", longitude: 106.55, timezone: "+08:00" },
  xian: { name: "陕西｜西安", longitude: 108.94, timezone: "+08:00" },
  wuhan: { name: "湖北｜武汉", longitude: 114.31, timezone: "+08:00" },
  changsha: { name: "湖南｜长沙", longitude: 112.94, timezone: "+08:00" },
  zhengzhou: { name: "河南｜郑州", longitude: 113.63, timezone: "+08:00" },
  jinan: { name: "山东｜济南", longitude: 117.12, timezone: "+08:00" },
  qingdao: { name: "山东｜青岛", longitude: 120.38, timezone: "+08:00" },
  shenyang: { name: "辽宁｜沈阳", longitude: 123.43, timezone: "+08:00" },
  harbin: { name: "黑龙江｜哈尔滨", longitude: 126.64, timezone: "+08:00" },
  kunming: { name: "云南｜昆明", longitude: 102.83, timezone: "+08:00" },
  urumqi: { name: "新疆｜乌鲁木齐", longitude: 87.62, timezone: "+08:00" },
  lhasa: { name: "西藏｜拉萨", longitude: 91.13, timezone: "+08:00" },
  hongkong: { name: "香港", longitude: 114.17, timezone: "+08:00" },
  taipei: { name: "台湾｜台北", longitude: 121.56, timezone: "+08:00" },
  singapore: { name: "Singapore", longitude: 103.82, timezone: "+08:00" },
  tokyo: { name: "Tokyo", longitude: 139.69, timezone: "+09:00" },
  newyork: { name: "New York", longitude: -74.01, timezone: "-05:00" },
  london: { name: "London", longitude: -0.13, timezone: "+00:00" }
};

const qinModes = {
  sleep: {
    zh: "睡前适合少变化、慢起伏、音色清淡的曲目。让呼吸先慢下来，再让念头慢慢落下。",
    en: "Before sleep, choose slow, sparse and gentle pieces. Let the breath slow first, then let the mind settle.",
    tracks: ["pingSha", "liangXiao", "yiGuRen"]
  },
  calm: {
    zh: "静心时不必追求玄妙，先听见一两个长音，把注意力从外面收回来。",
    en: "For calmness, do not chase mystery. Follow one or two long tones and bring attention back inward.",
    tracks: ["pingSha", "yuQiao", "ouAi"]
  },
  ease: {
    zh: "情绪郁结时，宜选有流动感的曲子。不是压住情绪，而是让它有出口。",
    en: "When emotion feels stuck, choose pieces with movement. The point is not suppression, but release.",
    tracks: ["liuShui", "meiHua", "yangGuan"]
  },
  focus: {
    zh: "需要清明专注时，选结构清楚、线条干净的曲子，让心神不散，做事不急。",
    en: "For focus, choose clear and structured pieces so the mind stays gathered without strain.",
    tracks: ["liuShui", "yuQiao", "meiHua"]
  },
  beauty: {
    zh: "想让气色和体态松开，先让肩颈和眉心放松。曲子宜温润，不宜太悲。",
    en: "For presence and complexion, relax the neck, shoulders and brow first. Choose warmth over heaviness.",
    tracks: ["liangXiao", "meiHua", "pingSha"]
  }
};

const qinTracks = {
  pingSha: {
    zhTitle: "《平沙落雁》",
    enTitle: "Wild Geese Descending on the Sandbank",
    tone: "羽",
    organZh: "水音，传统对应肾",
    organEn: "Yu tone, traditionally linked with Water / Kidney",
    zhUse: "适合夜间、睡前、心里很乱的时候。取其辽阔、缓落之意，让人从紧绷里慢慢退出来。",
    enUse: "Good for night, pre-sleep and a restless mind. Its spacious descent helps the body step out of tension.",
    query: "古琴 平沙落雁"
  },
  liangXiao: {
    zhTitle: "《良宵引》",
    enTitle: "Prelude to a Fine Evening",
    tone: "宫",
    organZh: "土音，传统对应脾",
    organEn: "Gong tone, traditionally linked with Earth / Spleen",
    zhUse: "适合睡前整理一天，也适合面部紧、胃口乱、心神散时做温和过渡。",
    enUse: "A gentle transition piece for ending the day, useful when the face, appetite or attention feels unsettled.",
    query: "古琴 良宵引"
  },
  yiGuRen: {
    zhTitle: "《忆故人》",
    enTitle: "Remembering an Old Friend",
    tone: "商",
    organZh: "金音，传统对应肺",
    organEn: "Shang tone, traditionally linked with Metal / Lung",
    zhUse: "适合情绪细腻、想念、睡前不愿说话的时候。听它，不必解释自己。",
    enUse: "For tenderness, longing and quiet evenings when words are unnecessary.",
    query: "古琴 忆故人"
  },
  yuQiao: {
    zhTitle: "《渔樵问答》",
    enTitle: "Dialogue Between Fisherman and Woodcutter",
    tone: "宫",
    organZh: "土音，传统对应脾",
    organEn: "Gong tone, traditionally linked with Earth / Spleen",
    zhUse: "适合心乱、选择太多、需要回到朴素判断的时候。它的好处是稳，不催人。",
    enUse: "Useful when choices feel crowded. It brings a steady, unhurried sense of judgment.",
    query: "古琴 渔樵问答"
  },
  ouAi: {
    zhTitle: "《欸乃》",
    enTitle: "Ai Nai",
    tone: "角",
    organZh: "木音，传统对应肝",
    organEn: "Jue tone, traditionally linked with Wood / Liver",
    zhUse: "适合久坐、胸口闷、想出去走走却走不开的时候。取水路行舟之意，帮气机转动。",
    enUse: "Good after long sitting or a closed-in mood. It carries the feeling of a boat moving through water.",
    query: "古琴 欸乃"
  },
  liuShui: {
    zhTitle: "《流水》",
    enTitle: "Flowing Water",
    tone: "羽",
    organZh: "水音，传统对应肾",
    organEn: "Yu tone, traditionally linked with Water / Kidney",
    zhUse: "适合白天提神、打开思路，不建议太晚听激昂版本。想专注时，可选慢速清淡版。",
    enUse: "Good for daytime clarity. Avoid intense versions late at night; choose a slow version for focus.",
    query: "古琴 流水"
  },
  meiHua: {
    zhTitle: "《梅花三弄》",
    enTitle: "Three Variations on Plum Blossom",
    tone: "角",
    organZh: "木音，传统对应肝",
    organEn: "Jue tone, traditionally linked with Wood / Liver",
    zhUse: "适合气质表达、形象练习、出门前调整状态。清而不冷，有骨气，也有柔意。",
    enUse: "Good before presenting yourself or going out. Clear, poised and quietly resilient.",
    query: "古琴 梅花三弄"
  },
  yangGuan: {
    zhTitle: "《阳关三叠》",
    enTitle: "Three Refrains at Yang Pass",
    tone: "商",
    organZh: "金音，传统对应肺",
    organEn: "Shang tone, traditionally linked with Metal / Lung",
    zhUse: "适合离别、想念、心里有话说不出的时候。若情绪低落，不宜循环太久。",
    enUse: "For parting, longing and unspoken feelings. If you feel low, do not loop it for too long.",
    query: "古琴 阳关三叠"
  }
};

function makePlaceGroup(key, label, rows, timezone = "+08:00") {
  return [
    key,
    {
      label,
      places: rows.map((row, index) => {
        const [name, longitude, placeTimezone] = row.split("|");
        return {
          key: `${key}_${index}`,
          name,
          longitude: Number(longitude),
          timezone: placeTimezone || timezone
        };
      })
    }
  ];
}

const provincePlaces = Object.fromEntries([
  makePlaceGroup("beijing", "北京市", ["北京市东城区|116.42", "北京市西城区|116.37", "北京市朝阳区|116.44", "北京市海淀区|116.30", "北京市丰台区|116.29", "北京市通州区|116.66", "北京市昌平区|116.23", "北京市大兴区|116.34", "北京市顺义区|116.65", "北京市密云区|116.84"]),
  makePlaceGroup("tianjin", "天津市", ["天津市和平区|117.21", "天津市河西区|117.22", "天津市南开区|117.15", "天津市滨海新区|117.70", "天津市武清区|117.04", "天津市宝坻区|117.31", "天津市静海区|116.97", "天津市蓟州区|117.41"]),
  makePlaceGroup("hebei", "河北省", ["河北省石家庄市|114.51", "河北省唐山市|118.18", "河北省秦皇岛市|119.60", "河北省邯郸市|114.49", "河北省邢台市|114.50", "河北省保定市|115.46", "河北省张家口市|114.89", "河北省承德市|117.94", "河北省沧州市|116.84", "河北省廊坊市|116.70", "河北省衡水市|115.67"]),
  makePlaceGroup("shanxi", "山西省", ["山西省太原市|112.55", "山西省大同市|113.30", "山西省阳泉市|113.58", "山西省长治市|113.11", "山西省晋城市|112.85", "山西省朔州市|112.43", "山西省晋中市|112.75", "山西省运城市|111.00", "山西省忻州市|112.73", "山西省临汾市|111.52", "山西省吕梁市|111.14"]),
  makePlaceGroup("neimenggu", "内蒙古自治区", ["内蒙古呼和浩特市|111.75", "内蒙古包头市|109.84", "内蒙古乌海市|106.82", "内蒙古赤峰市|118.89", "内蒙古通辽市|122.26", "内蒙古鄂尔多斯市|109.78", "内蒙古呼伦贝尔市|119.77", "内蒙古巴彦淖尔市|107.39", "内蒙古乌兰察布市|113.13", "内蒙古兴安盟乌兰浩特市|122.07", "内蒙古锡林郭勒盟锡林浩特市|116.09", "内蒙古阿拉善盟阿拉善左旗|105.67"]),
  makePlaceGroup("liaoning", "辽宁省", ["辽宁省沈阳市|123.43", "辽宁省大连市|121.61", "辽宁省鞍山市|122.99", "辽宁省抚顺市|123.96", "辽宁省本溪市|123.77", "辽宁省丹东市|124.35", "辽宁省锦州市|121.13", "辽宁省营口市|122.24", "辽宁省阜新市|121.67", "辽宁省辽阳市|123.17", "辽宁省盘锦市|122.07", "辽宁省铁岭市|123.84", "辽宁省朝阳市|120.45", "辽宁省葫芦岛市|120.86"]),
  makePlaceGroup("jilin", "吉林省", ["吉林省长春市|125.32", "吉林省吉林市|126.55", "吉林省四平市|124.35", "吉林省辽源市|125.14", "吉林省通化市|125.94", "吉林省白山市|126.42", "吉林省松原市|124.82", "吉林省白城市|122.84", "吉林省延边州延吉市|129.51"]),
  makePlaceGroup("heilongjiang", "黑龙江省", ["黑龙江省哈尔滨市|126.64", "黑龙江省齐齐哈尔市|123.95", "黑龙江省鸡西市|130.97", "黑龙江省鹤岗市|130.30", "黑龙江省双鸭山市|131.16", "黑龙江省大庆市|125.10", "黑龙江省伊春市|128.84", "黑龙江省佳木斯市|130.32", "黑龙江省七台河市|131.02", "黑龙江省牡丹江市|129.63", "黑龙江省黑河市|127.49", "黑龙江省绥化市|126.97", "黑龙江省大兴安岭地区加格达奇|124.12"]),
  makePlaceGroup("shanghai", "上海市", ["上海市黄浦区|121.49", "上海市徐汇区|121.44", "上海市静安区|121.45", "上海市浦东新区|121.54", "上海市闵行区|121.38", "上海市宝山区|121.49", "上海市嘉定区|121.27", "上海市松江区|121.23", "上海市青浦区|121.12", "上海市奉贤区|121.47", "上海市崇明区|121.40"]),
  makePlaceGroup("jiangsu", "江苏省", ["江苏省南京市|118.78", "江苏省无锡市|120.31", "江苏省徐州市|117.28", "江苏省常州市|119.95", "江苏省苏州市|120.62", "江苏省南通市|120.86", "江苏省连云港市|119.22", "江苏省淮安市|119.02", "江苏省盐城市|120.16", "江苏省扬州市|119.42", "江苏省镇江市|119.45", "江苏省泰州市|119.92", "江苏省宿迁市|118.28"]),
  makePlaceGroup("zhejiang", "浙江省", ["浙江省杭州市|120.16", "浙江省宁波市|121.55", "浙江省温州市|120.70", "浙江省嘉兴市|120.76", "浙江省湖州市|120.09", "浙江省绍兴市|120.58", "浙江省金华市|119.65", "浙江省衢州市|118.87", "浙江省舟山市|122.20", "浙江省台州市|121.43", "浙江省丽水市|119.92"]),
  makePlaceGroup("anhui", "安徽省", ["安徽省合肥市|117.23", "安徽省芜湖市|118.38", "安徽省蚌埠市|117.39", "安徽省淮南市|117.00", "安徽省马鞍山市|118.51", "安徽省淮北市|116.80", "安徽省铜陵市|117.81", "安徽省安庆市|117.05", "安徽省黄山市|118.34", "安徽省滁州市|118.32", "安徽省阜阳市|115.82", "安徽省宿州市|116.96", "安徽省六安市|116.52", "安徽省亳州市|115.78", "安徽省池州市|117.49", "安徽省宣城市|118.76"]),
  makePlaceGroup("fujian", "福建省", ["福建省福州市|119.30", "福建省厦门市|118.09", "福建省莆田市|119.01", "福建省三明市|117.64", "福建省泉州市|118.68", "福建省漳州市|117.65", "福建省南平市|118.18", "福建省龙岩市|117.02", "福建省宁德市|119.55"]),
  makePlaceGroup("jiangxi", "江西省", ["江西省南昌市|115.86", "江西省景德镇市|117.18", "江西省萍乡市|113.85", "江西省九江市|115.99", "江西省新余市|114.93", "江西省鹰潭市|117.03", "江西省赣州市|114.94", "江西省吉安市|114.98", "江西省宜春市|114.39", "江西省抚州市|116.36", "江西省上饶市|117.97"]),
  makePlaceGroup("shandong", "山东省", ["山东省济南市|117.12", "山东省青岛市|120.38", "山东省淄博市|118.05", "山东省枣庄市|117.32", "山东省东营市|118.67", "山东省烟台市|121.45", "山东省潍坊市|119.16", "山东省潍坊市奎文区|119.13", "山东省潍坊市潍城区|119.02", "山东省潍坊市寒亭区|119.22", "山东省潍坊市坊子区|119.17", "山东省潍坊市青州市|118.48", "山东省潍坊市诸城市|119.40", "山东省潍坊市寿光市|118.74", "山东省潍坊市安丘市|119.21", "山东省潍坊市高密市|119.76", "山东省潍坊市昌邑市|119.40", "山东省潍坊市临朐县|118.54", "山东省潍坊市昌乐县|118.83", "山东省济宁市|116.59", "山东省泰安市|117.09", "山东省威海市|122.12", "山东省日照市|119.52", "山东省临沂市|118.36", "山东省德州市|116.36", "山东省聊城市|115.98", "山东省滨州市|117.97", "山东省菏泽市|115.48"]),
  makePlaceGroup("henan", "河南省", ["河南省郑州市|113.63", "河南省开封市|114.31", "河南省洛阳市|112.45", "河南省平顶山市|113.19", "河南省安阳市|114.35", "河南省鹤壁市|114.30", "河南省新乡市|113.93", "河南省焦作市|113.24", "河南省濮阳市|115.03", "河南省许昌市|113.85", "河南省漯河市|114.02", "河南省三门峡市|111.20", "河南省南阳市|112.53", "河南省商丘市|115.65", "河南省信阳市|114.09", "河南省周口市|114.65", "河南省驻马店市|114.02", "河南省济源市|112.60"]),
  makePlaceGroup("hubei", "湖北省", ["湖北省武汉市|114.31", "湖北省黄石市|115.04", "湖北省十堰市|110.79", "湖北省宜昌市|111.29", "湖北省襄阳市|112.14", "湖北省鄂州市|114.89", "湖北省荆门市|112.20", "湖北省孝感市|113.92", "湖北省荆州市|112.24", "湖北省黄冈市|114.87", "湖北省咸宁市|114.32", "湖北省随州市|113.37", "湖北省恩施州恩施市|109.49", "湖北省仙桃市|113.45", "湖北省潜江市|112.90", "湖北省天门市|113.17"]),
  makePlaceGroup("hunan", "湖南省", ["湖南省长沙市|112.94", "湖南省株洲市|113.13", "湖南省湘潭市|112.94", "湖南省衡阳市|112.57", "湖南省邵阳市|111.47", "湖南省岳阳市|113.13", "湖南省常德市|111.69", "湖南省张家界市|110.48", "湖南省益阳市|112.36", "湖南省郴州市|113.01", "湖南省永州市|111.61", "湖南省怀化市|110.00", "湖南省娄底市|112.00", "湖南省湘西州吉首市|109.74"]),
  makePlaceGroup("guangdong", "广东省", ["广东省广州市|113.26", "广东省韶关市|113.60", "广东省深圳市|114.06", "广东省珠海市|113.58", "广东省汕头市|116.68", "广东省佛山市|113.12", "广东省江门市|113.08", "广东省湛江市|110.36", "广东省茂名市|110.92", "广东省肇庆市|112.47", "广东省惠州市|114.42", "广东省梅州市|116.12", "广东省汕尾市|115.38", "广东省河源市|114.70", "广东省阳江市|111.98", "广东省清远市|113.06", "广东省东莞市|113.75", "广东省中山市|113.39", "广东省潮州市|116.62", "广东省揭阳市|116.37", "广东省云浮市|112.04"]),
  makePlaceGroup("guangxi", "广西壮族自治区", ["广西南宁市|108.37", "广西柳州市|109.41", "广西桂林市|110.29", "广西梧州市|111.28", "广西北海市|109.12", "广西防城港市|108.35", "广西钦州市|108.65", "广西贵港市|109.60", "广西玉林市|110.18", "广西百色市|106.62", "广西贺州市|111.55", "广西河池市|108.06", "广西来宾市|109.22", "广西崇左市|107.36"]),
  makePlaceGroup("hainan", "海南省", ["海南省海口市|110.33", "海南省三亚市|109.51", "海南省三沙市|112.35", "海南省儋州市|109.58", "海南省琼海市|110.47", "海南省文昌市|110.80", "海南省万宁市|110.39", "海南省东方市|108.65"]),
  makePlaceGroup("chongqing", "重庆市", ["重庆市渝中区|106.55", "重庆市江北区|106.57", "重庆市沙坪坝区|106.45", "重庆市九龙坡区|106.51", "重庆市南岸区|106.56", "重庆市北碚区|106.40", "重庆市渝北区|106.63", "重庆市巴南区|106.54", "重庆市涪陵区|107.39", "重庆市万州区|108.41", "重庆市永川区|105.93"]),
  makePlaceGroup("sichuan", "四川省", ["四川省成都市|104.07", "四川省自贡市|104.78", "四川省攀枝花市|101.72", "四川省泸州市|105.44", "四川省德阳市|104.40", "四川省绵阳市|104.74", "四川省广元市|105.84", "四川省遂宁市|105.57", "四川省内江市|105.06", "四川省乐山市|103.76", "四川省南充市|106.08", "四川省眉山市|103.85", "四川省宜宾市|104.64", "四川省广安市|106.63", "四川省达州市|107.47", "四川省雅安市|103.04", "四川省巴中市|106.75", "四川省资阳市|104.64", "四川省阿坝州马尔康市|102.22", "四川省甘孜州康定市|101.96", "四川省凉山州西昌市|102.27"]),
  makePlaceGroup("guizhou", "贵州省", ["贵州省贵阳市|106.63", "贵州省六盘水市|104.83", "贵州省遵义市|106.93", "贵州省安顺市|105.95", "贵州省毕节市|105.29", "贵州省铜仁市|109.18", "贵州省黔西南州兴义市|104.90", "贵州省黔东南州凯里市|107.98", "贵州省黔南州都匀市|107.52"]),
  makePlaceGroup("yunnan", "云南省", ["云南省昆明市|102.83", "云南省曲靖市|103.80", "云南省玉溪市|102.55", "云南省保山市|99.17", "云南省昭通市|103.72", "云南省丽江市|100.23", "云南省普洱市|100.97", "云南省临沧市|100.09", "云南省楚雄州楚雄市|101.55", "云南省红河州蒙自市|103.36", "云南省文山州文山市|104.25", "云南省西双版纳州景洪市|100.80", "云南省大理州大理市|100.23", "云南省德宏州芒市|98.58", "云南省怒江州泸水市|98.86", "云南省迪庆州香格里拉市|99.70"]),
  makePlaceGroup("xizang", "西藏自治区", ["西藏拉萨市|91.13", "西藏日喀则市|88.89", "西藏昌都市|97.18", "西藏林芝市|94.36", "西藏山南市|91.77", "西藏那曲市|92.05", "西藏阿里地区噶尔县|80.10"]),
  makePlaceGroup("shaanxi", "陕西省", ["陕西省西安市|108.94", "陕西省铜川市|108.95", "陕西省宝鸡市|107.24", "陕西省咸阳市|108.71", "陕西省渭南市|109.51", "陕西省延安市|109.49", "陕西省汉中市|107.03", "陕西省榆林市|109.73", "陕西省安康市|109.03", "陕西省商洛市|109.94"]),
  makePlaceGroup("gansu", "甘肃省", ["甘肃省兰州市|103.82", "甘肃省嘉峪关市|98.29", "甘肃省金昌市|102.19", "甘肃省白银市|104.14", "甘肃省天水市|105.72", "甘肃省武威市|102.64", "甘肃省张掖市|100.45", "甘肃省平凉市|106.66", "甘肃省酒泉市|98.49", "甘肃省庆阳市|107.64", "甘肃省定西市|104.63", "甘肃省陇南市|104.92", "甘肃省临夏州临夏市|103.21", "甘肃省甘南州合作市|102.91"]),
  makePlaceGroup("qinghai", "青海省", ["青海省西宁市|101.78", "青海省海东市|102.10", "青海省海北州海晏县|100.99", "青海省黄南州同仁市|102.02", "青海省海南州共和县|100.62", "青海省果洛州玛沁县|100.24", "青海省玉树州玉树市|97.01", "青海省海西州德令哈市|97.37"]),
  makePlaceGroup("ningxia", "宁夏回族自治区", ["宁夏银川市|106.23", "宁夏石嘴山市|106.38", "宁夏吴忠市|106.20", "宁夏固原市|106.28", "宁夏中卫市|105.20"]),
  makePlaceGroup("xinjiang", "新疆维吾尔自治区", ["新疆乌鲁木齐市|87.62", "新疆克拉玛依市|84.89", "新疆吐鲁番市|89.19", "新疆哈密市|93.51", "新疆昌吉州昌吉市|87.31", "新疆博州博乐市|82.07", "新疆巴州库尔勒市|86.15", "新疆阿克苏地区阿克苏市|80.26", "新疆克州阿图什市|76.17", "新疆喀什地区喀什市|75.99", "新疆和田地区和田市|79.92", "新疆伊犁州伊宁市|81.32", "新疆塔城地区塔城市|82.98", "新疆阿勒泰地区阿勒泰市|88.14", "新疆石河子市|86.04"]),
  makePlaceGroup("hongkong", "香港 / 澳门", ["香港|114.17", "澳门|113.54"]),
  makePlaceGroup("taiwan", "台湾", ["台湾台北市|121.56", "台湾新北市|121.47", "台湾桃园市|121.30", "台湾台中市|120.67", "台湾台南市|120.20", "台湾高雄市|120.30", "台湾基隆市|121.74", "台湾新竹市|120.97", "台湾嘉义市|120.45", "台湾花莲县|121.60", "台湾台东县|121.15"]),
  makePlaceGroup("east_asia", "海外｜东亚", ["Tokyo, Japan|139.69|+09:00", "Osaka, Japan|135.50|+09:00", "Kyoto, Japan|135.77|+09:00", "Sapporo, Japan|141.35|+09:00", "Fukuoka, Japan|130.40|+09:00", "Seoul, South Korea|126.98|+09:00", "Busan, South Korea|129.08|+09:00", "Incheon, South Korea|126.71|+09:00"]),
  makePlaceGroup("southeast_asia", "海外｜东南亚", ["Singapore|103.82|+08:00", "Kuala Lumpur, Malaysia|101.69|+08:00", "Penang, Malaysia|100.33|+08:00", "Bangkok, Thailand|100.50|+07:00", "Chiang Mai, Thailand|98.99|+07:00", "Ho Chi Minh City, Vietnam|106.63|+07:00", "Hanoi, Vietnam|105.85|+07:00", "Manila, Philippines|120.98|+08:00", "Jakarta, Indonesia|106.85|+07:00", "Bali / Denpasar, Indonesia|115.22|+08:00", "Phnom Penh, Cambodia|104.92|+07:00", "Vientiane, Laos|102.63|+07:00", "Yangon, Myanmar|96.16|+06:30"]),
  makePlaceGroup("north_america", "海外｜北美", ["New York, USA|-74.01|-05:00", "Los Angeles, USA|-118.24|-08:00", "San Francisco, USA|-122.42|-08:00", "Seattle, USA|-122.33|-08:00", "Chicago, USA|-87.63|-06:00", "Houston, USA|-95.37|-06:00", "Dallas, USA|-96.80|-06:00", "Miami, USA|-80.19|-05:00", "Boston, USA|-71.06|-05:00", "Washington DC, USA|-77.04|-05:00", "Toronto, Canada|-79.38|-05:00", "Vancouver, Canada|-123.12|-08:00", "Montreal, Canada|-73.57|-05:00", "Calgary, Canada|-114.07|-07:00", "Mexico City, Mexico|-99.13|-06:00"]),
  makePlaceGroup("europe", "海外｜欧洲", ["London, United Kingdom|-0.13|+00:00", "Manchester, United Kingdom|-2.24|+00:00", "Paris, France|2.35|+01:00", "Lyon, France|4.84|+01:00", "Berlin, Germany|13.41|+01:00", "Munich, Germany|11.58|+01:00", "Frankfurt, Germany|8.68|+01:00", "Rome, Italy|12.50|+01:00", "Milan, Italy|9.19|+01:00", "Madrid, Spain|-3.70|+01:00", "Barcelona, Spain|2.17|+01:00", "Amsterdam, Netherlands|4.90|+01:00", "Brussels, Belgium|4.35|+01:00", "Zurich, Switzerland|8.54|+01:00", "Vienna, Austria|16.37|+01:00", "Stockholm, Sweden|18.07|+01:00", "Copenhagen, Denmark|12.57|+01:00", "Oslo, Norway|10.75|+01:00", "Helsinki, Finland|24.94|+02:00", "Dublin, Ireland|-6.26|+00:00", "Lisbon, Portugal|-9.14|+00:00", "Athens, Greece|23.73|+02:00", "Istanbul, Turkey|28.98|+03:00"]),
  makePlaceGroup("oceania", "海外｜澳洲/新西兰", ["Sydney, Australia|151.21|+10:00", "Melbourne, Australia|144.96|+10:00", "Brisbane, Australia|153.03|+10:00", "Perth, Australia|115.86|+08:00", "Adelaide, Australia|138.60|+09:30", "Canberra, Australia|149.13|+10:00", "Auckland, New Zealand|174.76|+12:00", "Wellington, New Zealand|174.78|+12:00", "Christchurch, New Zealand|172.63|+12:00"]),
  makePlaceGroup("middle_east_africa", "海外｜中东/非洲", ["Dubai, UAE|55.27|+04:00", "Abu Dhabi, UAE|54.38|+04:00", "Doha, Qatar|51.53|+03:00", "Riyadh, Saudi Arabia|46.68|+03:00", "Tel Aviv, Israel|34.78|+02:00", "Cairo, Egypt|31.24|+02:00", "Johannesburg, South Africa|28.05|+02:00", "Cape Town, South Africa|18.42|+02:00", "Nairobi, Kenya|36.82|+03:00", "Casablanca, Morocco|-7.59|+00:00"]),
  makePlaceGroup("south_asia", "海外｜南亚", ["Delhi, India|77.21|+05:30", "Mumbai, India|72.88|+05:30", "Bengaluru, India|77.59|+05:30", "Kolkata, India|88.36|+05:30", "Kathmandu, Nepal|85.32|+05:45", "Colombo, Sri Lanka|79.86|+05:30", "Dhaka, Bangladesh|90.41|+06:00", "Karachi, Pakistan|67.01|+05:00", "Islamabad, Pakistan|73.05|+05:00"]),
  makePlaceGroup("south_america", "海外｜南美", ["Sao Paulo, Brazil|-46.63|-03:00", "Rio de Janeiro, Brazil|-43.17|-03:00", "Buenos Aires, Argentina|-58.38|-03:00", "Santiago, Chile|-70.67|-04:00", "Lima, Peru|-77.04|-05:00", "Bogota, Colombia|-74.07|-05:00"])
]);

const i18n = {
  zh: {
    heroTitle: "八字画像",
    heroLead: "输入生辰，先看见自己。这里会从八字排盘、五行气质、体质倾向、面部气韵与日常养修方向，生成一份容易读懂的东方画像。这不是给你贴标签，而是陪你多了解自己一点。",
    heroCta: "输入生辰，看看自己",
    priceLabel: "基础排盘",
    priceFree: "免费",
    priceSub: "先看一份自己的气质轮廓",
    notice: "本页用于传统文化兴趣测试和生活方式参考，不提供医疗诊断、疾病预测、治疗承诺或容貌评价。如有身体不适，请优先咨询正规医疗机构。",
    dailySeal: "今日小课",
    dailyTitle: "每日一卦与今日气象",
    dailyLead: "每天用一分钟，看今日宜忌、穿搭色与一个小提醒。它不替你决定人生，只帮你把心慢慢收回来。",
    poemLabel: "今日文句",
    dailyHexLabel: "今日卦象",
    dailyAlmanacLabel: "黄历参考",
    dailyDayPillar: "日柱",
    dailyYi: "宜",
    dailyJi: "忌",
    dailySolarTerm: "节气",
    dailyColorLabel: "今日穿搭色",
    ritualLabel: "今日旺自己",
    studyCardLabel: "五行气质学习卡",
    studyCardHint: "适合截图保存，作为今日气质提醒。",
    testLabel: "今日小测试",
    testTitle: "你今天更想要哪种状态？",
    testSteady: "稳一点",
    testBright: "亮一点",
    testSoft: "松一点",
    articleLabel: "今日养修短文",
    articleMeta: "每日自动更新，只留今日一篇。",
    oracleQuestionLabel: "今天想问什么？",
    oracleWealth: "财运与变现",
    oracleCareer: "事业与工作",
    oracleLove: "感情与关系",
    oracleBeauty: "气色与形象",
    oracleCalm: "心态与选择",
    oracleBtn: "抽取今日提示",
    qinSeal: "琴音静养",
    qinTitle: "古琴五音与身心安顿",
    qinLead: "五音入五脏，是传统文化里理解声音、情绪与身体节律的一种方式。这里不做医疗承诺，只提供几首适合静心、睡前放松与整理情绪的古琴曲目。",
    qinModeLabel: "我现在想要",
    qinModeSleep: "睡前放松",
    qinModeCalm: "静心安神",
    qinModeEase: "疏解郁结",
    qinModeFocus: "清明专注",
    qinModeBeauty: "舒展气色",
    qinToneTitle: "五音入五脏",
    qinToneJue: "属木，传统对应肝，宜疏达、舒展。",
    qinToneZhi: "属火，传统对应心，宜明朗、温煦。",
    qinToneGong: "属土，传统对应脾，宜安定、归中。",
    qinToneShang: "属金，传统对应肺，宜清肃、收敛。",
    qinToneYu: "属水，传统对应肾，宜沉静、入眠。",
    qinNote: "建议音量调低，睡前听 10-20 分钟即可；如果越听越精神，就换成更慢、更少起伏的曲目。",
    qinListen: "站内试听",
    qinSearch: "停止",
    qinOriginalAudio: "网页内原创生成音色，不调用外部音乐资源。",
    querySeal: "日课日历",
    queryTitle: "查询过去与未来的日子",
    queryLead: "输入或选择日期，查看当日的日柱、节气、十二值日与吉平慎分类。结果用于生活节律参考，不替代个人择日。",
    queryDateLabel: "查询日期",
    queryBtn: "查询日课",
    formTitle: "你的生辰资料",
    formTime: "约1分钟",
    nameLabel: "姓名 / 昵称",
    genderLabel: "性别",
    genderFemale: "女性",
    genderMale: "男性",
    genderPrivate: "不便透露",
    ageLabel: "当前年龄",
    birthDateLabel: "出生日期",
    datePickBtn: "选择",
    birthTimeLabel: "出生时间",
    birthPlaceLabel: "出生地点",
    birthProvinceLabel: "省份 / 国家地区",
    birthCityCountyLabel: "城市 / 县区 / 海外城市",
    provincePlaceholder: "请选择省份、地区或海外分区",
    cityCountyPlaceholder: "先选择上一级地区",
    cityCountyHint: "选中后会自动填入出生地点、经度与时区；若县城或海外小城市不在列表，可手动填写地点和经度。",
    birthPlacePresetLabel: "快速校准",
    placePresetManual: "手动填写 / 不在列表",
    longitudeLabel: "出生地经度",
    longitudeHint: "县城、乡镇或海外出生，建议用地图查询经度填写；东经为正，西经为负。",
    trueSolarLabel: "真太阳时校准",
    trueSolarAuto: "按经度自动校准",
    trueSolarOff: "暂不校准，按钟表时间",
    ziRuleLabel: "子时换日规则",
    ziStartRule: "子初换日：23:00 起算次日",
    midnightRule: "子正换日：00:00 起算次日",
    ziRuleHint: "23点前后出生的人建议特别确认；系统会在报告中显示校准说明。",
    timezoneLabel: "出生地时区",
    timezoneHint: "海外出生请填写当地出生时间，并选择出生地时区。真太阳时会结合经度修正。",
    tzChina: "UTC+08:00 中国/新加坡/台北/香港",
    tzJapan: "UTC+09:00 日本/韩国",
    tzUnknown: "不确定，先按当地出生时间",
    currentPlaceLabel: "现在居住地",
    mainNeedLabel: "你现在最想先了解什么？",
    needComplexion: "气色、衰老感、面部紧绷",
    needStyle: "穿搭风格和五行气质",
    needSleep: "睡眠、疲惫和情绪消耗",
    needPosture: "体态、肩颈、下颌紧张",
    needLife: "事业关系与近期状态",
    stateLabel: "最近最明显的状态",
    agreeText: "我理解本测试仅作传统文化和生活方式参考，不替代医疗、心理或法律建议。",
    previewBtn: "生成我的画像",
    submitBtn: "复制资料",
    emptyTitle: "填写后生成你的画像",
    emptyText: "你会看到四柱排盘、气质底色、五行色彩、体质倾向、面部气韵和穿搭提示。",
    usageTitle: "正式使用方式",
    betaTag: "内测版",
    freeTier: "免费",
    freeDesc: "填写生辰资料后，即时生成四柱排盘、气质底色、五行比例、穿衣色系与日常养护提示。",
    tier29: "人工生成详细文字报告：在基础画像之上，细看气色体态、脸部状态、五行穿搭与日常养修方向。",
    tier199: "人工详细报告 + 40分钟一对一专属解读：结合你的当下状态，梳理气质定位、形象表达与后续养修路径。",
    selectPlaceholder: "请选择"
  },
  en: {
    heroTitle: "Bazi Portrait",
    heroLead: "Enter your birth details and begin by seeing yourself more clearly. This page turns your Bazi chart, Five Element temperament, constitution notes, facial presence and daily cultivation direction into an easy-to-read Eastern portrait.",
    heroCta: "Enter Birth Details",
    priceLabel: "Basic Chart",
    priceFree: "Free",
    priceSub: "Start with your temperament outline",
    notice: "This page is for traditional culture and lifestyle reference only. It does not provide medical diagnosis, disease prediction, treatment promises, or appearance judgment. For physical discomfort, please consult qualified medical professionals first.",
    dailySeal: "Daily Note",
    dailyTitle: "Daily Oracle & Almanac",
    dailyLead: "Spend one minute with today's suggested actions, colors and a small prompt. This is not fate prediction; it is a way to bring attention back to the present.",
    poemLabel: "Daily Line",
    dailyHexLabel: "Today's Hexagram",
    dailyAlmanacLabel: "Almanac Reference",
    dailyDayPillar: "Day Pillar",
    dailyYi: "Do",
    dailyJi: "Avoid",
    dailySolarTerm: "Solar Term",
    dailyColorLabel: "Today's Colors",
    ritualLabel: "Today's Small Practice",
    studyCardLabel: "Five Element Temperament Card",
    studyCardHint: "Screenshot it as today's temperament reminder.",
    testLabel: "Daily Check-in",
    testTitle: "What state do you want today?",
    testSteady: "Steadier",
    testBright: "Brighter",
    testSoft: "Softer",
    articleLabel: "Daily Cultivation Note",
    articleMeta: "Updates daily and only shows today's note.",
    oracleQuestionLabel: "What do you want to ask today?",
    oracleWealth: "Money & conversion",
    oracleCareer: "Career & work",
    oracleLove: "Love & relationships",
    oracleBeauty: "Complexion & image",
    oracleCalm: "Mindset & choice",
    oracleBtn: "Draw Today's Note",
    qinSeal: "Guqin Rest",
    qinTitle: "Five Tones & Inner Settling",
    qinLead: "In traditional culture, the Five Tones offer a way to understand sound, emotion and bodily rhythm. This is not medical advice; it is a listening guide for calm, pre-sleep relaxation and emotional settling.",
    qinModeLabel: "I want",
    qinModeSleep: "Pre-sleep relaxation",
    qinModeCalm: "Calm the mind",
    qinModeEase: "Ease emotion",
    qinModeFocus: "Clear focus",
    qinModeBeauty: "Soften presence",
    qinToneTitle: "Five Tones",
    qinToneJue: "Wood tone, traditionally linked with Liver; for openness and movement.",
    qinToneZhi: "Fire tone, traditionally linked with Heart; for warmth and brightness.",
    qinToneGong: "Earth tone, traditionally linked with Spleen; for centered steadiness.",
    qinToneShang: "Metal tone, traditionally linked with Lung; for clarity and release.",
    qinToneYu: "Water tone, traditionally linked with Kidney; for quietness and sleep.",
    qinNote: "Keep the volume low. Before sleep, 10-20 minutes is enough; if a piece wakes you up, choose a slower and sparser version.",
    qinListen: "Play here",
    qinSearch: "Stop",
    qinOriginalAudio: "Original in-page generated tones; no external music resource is used.",
    querySeal: "Almanac",
    queryTitle: "Look Up Any Date",
    queryLead: "Enter or pick a date to view its Day Pillar, solar term, Twelve Officer and auspicious/neutral/cautious classification. For lifestyle rhythm reference only.",
    queryDateLabel: "Date",
    queryBtn: "Look Up",
    formTitle: "Birth Profile",
    formTime: "About 1 min",
    nameLabel: "Name / Nickname",
    genderLabel: "Gender",
    genderFemale: "Female",
    genderMale: "Male",
    genderPrivate: "Prefer not to say",
    ageLabel: "Current Age",
    birthDateLabel: "Birth Date",
    datePickBtn: "Pick",
    birthTimeLabel: "Birth Time",
    birthPlaceLabel: "Birth Place",
    birthProvinceLabel: "Province / Country Region",
    birthCityCountyLabel: "City / County / Overseas City",
    provincePlaceholder: "Select province, region or overseas group",
    cityCountyPlaceholder: "Select upper region first",
    cityCountyHint: "Selecting one fills birth place, longitude and time zone. If not listed, enter place and longitude manually.",
    birthPlacePresetLabel: "Quick Calibration",
    placePresetManual: "Manual / not listed",
    longitudeLabel: "Birth Longitude",
    longitudeHint: "For counties, towns or overseas births, check longitude on a map. East is positive, west is negative.",
    trueSolarLabel: "True Solar Time",
    trueSolarAuto: "Auto-correct by longitude",
    trueSolarOff: "Use clock time only",
    ziRuleLabel: "Zi Hour Day Rule",
    ziStartRule: "Zi starts new day at 23:00",
    midnightRule: "New day starts at 00:00",
    ziRuleHint: "If born near 23:00, confirm this carefully. The report will show the correction note.",
    timezoneLabel: "Birth Time Zone",
    timezoneHint: "For overseas births, enter local birth time and select the birth-place time zone. True solar time uses longitude correction.",
    tzChina: "UTC+08:00 China / Singapore / Taipei / Hong Kong",
    tzJapan: "UTC+09:00 Japan / Korea",
    tzUnknown: "Not sure, use local birth time first",
    currentPlaceLabel: "Current Location",
    mainNeedLabel: "What do you want to understand first?",
    needComplexion: "Complexion, aging impression, facial tension",
    needStyle: "Style direction and Five Element temperament",
    needSleep: "Sleep, fatigue and emotional depletion",
    needPosture: "Posture, neck, shoulders and jaw tension",
    needLife: "Career, relationships and current state",
    stateLabel: "Most obvious recent state",
    agreeText: "I understand this test is for traditional culture and lifestyle reference only, not medical, psychological or legal advice.",
    previewBtn: "Generate My Portrait",
    submitBtn: "Copy Profile",
    emptyTitle: "Fill in your details to generate your portrait",
    emptyText: "You will see four pillars, temperament, colors, constitution notes, facial presence and styling tips.",
    usageTitle: "How It Works",
    betaTag: "Beta",
    freeTier: "Free",
    freeDesc: "Generate a basic portrait online: four pillars, luck cycle, annual flow, Day Master temperament, Five Element profile, color direction and daily care notes.",
    tier29: "Detailed written report by a person: complexion, posture, facial state, Five Element styling and daily cultivation direction.",
    tier199: "Detailed report + 40-minute one-on-one reading: connect your current state with temperament, image expression and next-step cultivation.",
    selectPlaceholder: "Select"
  }
};

const copy = {
  zh: {
    pillarLabels: ["年柱", "月柱", "日柱", "时柱"],
    freePreview: "免费预览",
    reportTitle: (name) => `${name} 的基础排盘`,
    disclaimer: (place, tz) => `自动排盘按出生地当地时间生成。出生地：${place || "未填写"}；时区：${tz || "未填写"}。本结果用于内测预览；若需完整梳理，建议再复核节气、时区、出生地和时间误差。`,
    calibration: (meta) => {
      const ziRuleText = meta.ziRule === "ziStartNextDay" ? "子初换日（23:00起算次日）" : "子正换日（00:00起算次日）";
      if (!meta.trueSolarUsed) {
        return `校准说明：本次按钟表时间排盘；子时规则为${ziRuleText}。若出生在县城、海外或接近23点，建议补充出生地经度后复核真太阳时。`;
      }
      const minutes = Math.round(meta.correctionMinutes);
      const direction = minutes >= 0 ? "加" : "减";
      return `校准说明：钟表时间 ${meta.baseDateTime}，按经度 ${meta.longitude.toFixed(2)}° 与均时差校正为真太阳时 ${meta.solarDateTime}，约${direction}${Math.abs(minutes)}分钟；子时规则为${ziRuleText}${meta.ziDayAdjusted ? "，本次已按子初换日调整日柱。" : "。"}`;
    },
    sections: ["1. 基础排盘", "2. 大运与流年", "3. 先天气质", "4. 性格底色", "5. 五行属性", "6. 先天体质", "7. 穿搭色系", "8. 时尚贴士", "9. 脸部状态", "10. 当前关注点"],
    strongestWeakest: (s, w) => `本次画像显示，五行中 <b class="element-text element-${s}">${elementHan[s]}</b> 的表现相对明显，<b class="element-text element-${w}">${elementHan[w]}</b> 的表现相对较弱。`,
    profile: (s, w, need) => `从这份画像看，你的状态关键词更偏向“${elementHan[s]}气显、${elementHan[w]}气弱”。这不是好坏判断，而是在提醒你：先天倾向、近期压力和外在呈现之间，可能有一种反复出现的消耗方式。你当前最关注“${needLabel(need)}”，本页先给出基础轮廓；若要具体到脸部紧绷点、穿搭组合和个人修整方向，则需要结合更多当下资料再看。`,
    lockedTitle: "想把画像看得更贴近自己",
    lockedText: "如果你希望把出生时间、近期状态、气色体态、脸部呈现与穿搭方向放在一起整理，可以复制资料后添加颜习社微信。我们会先看资料是否适合继续做个人梳理，再约具体方式。",
    addWechat: "颜习社微信",
    copyOrder: "复制画像资料",
    payNote: "基础画像可在线查看；进一步梳理更像一份个人气质与形象修整手札，适合希望继续把状态理清的人。这里不做医疗诊断，也不把任何结果说成绝对结论。",
    statusSaving: "基础排盘已生成。",
    statusLocal: "基础画像已生成。若想继续整理个人状态，可复制资料添加颜习社微信。",
    statusOnline: "资料已复制。若想继续整理个人状态，可添加颜习社微信发送。",
    statusFail: "基础画像已生成。若想继续整理个人状态，可复制资料添加颜习社微信。",
    copied: "画像资料已复制，可以发给微信。",
    orderText: (data) => `我想继续做一份东方颜习社个人画像梳理。姓名：${data.name}，生日：${data.birthDate} ${data.birthTime}，出生地：${data.birthPlace}，时区：${data.birthTimezone}，关注点：${needLabel(data.mainNeed)}`
  },
  en: {
    pillarLabels: ["Year", "Month", "Day", "Hour"],
    freePreview: "Free Preview",
    reportTitle: (name) => `${name}'s Basic Chart`,
    disclaimer: (place, tz) => `The automatic chart is generated from the local birth time. Birth place: ${place || "not provided"}; time zone: ${tz || "not provided"}. This is a beta preview; a complete review can further check solar terms, time zone, location and possible time error.`,
    calibration: (meta) => {
      const ziRuleText = meta.ziRule === "ziStartNextDay" ? "Zi hour starts a new day at 23:00" : "new day starts at 00:00";
      if (!meta.trueSolarUsed) {
        return `Calibration: this chart uses clock time; Zi rule: ${ziRuleText}. If birth was near 23:00 or outside major cities, add longitude for true solar time review.`;
      }
      const minutes = Math.round(meta.correctionMinutes);
      const direction = minutes >= 0 ? "plus" : "minus";
      return `Calibration: clock time ${meta.baseDateTime}; longitude ${meta.longitude.toFixed(2)}° and equation of time adjust it to true solar time ${meta.solarDateTime}, about ${direction} ${Math.abs(minutes)} minute(s). Zi rule: ${ziRuleText}${meta.ziDayAdjusted ? "; Day Pillar adjusted by Zi-start rule." : "."}`;
    },
    sections: ["1. Basic Chart", "2. Luck Cycle & Annual Flow", "3. Natal Temperament", "4. Personality Base", "5. Five Element Profile", "6. Constitution Notes", "7. Clothing Colors", "8. Styling Tips", "9. Facial-State Notes", "10. Current Focus"],
    strongestWeakest: (s, w) => `This preview shows <b class="element-text element-${s}">${elementEn[s]}</b> as relatively prominent and <b class="element-text element-${w}">${elementEn[w]}</b> as relatively weaker.`,
    profile: (s, w, need) => `Your current state keywords lean toward prominent ${elementEn[s]} and weaker ${elementEn[w]}. This is not a good-or-bad label; it suggests a recurring pattern between natal tendency, current state and outer presentation. Since your focus is "${needLabel(need)}", this page gives the basic outline first. More specific facial tension points, style colors and personal adjustment direction require more current context.`,
    lockedTitle: "If You Want a Closer Personal View",
    lockedText: "If you want birth time, current state, complexion, posture, facial presentation and styling direction read together, copy the profile and add Yanxishe on WeChat. We will first review whether the material is suitable for a fuller personal note.",
    addWechat: "Yanxishe WeChat",
    copyOrder: "Copy Profile",
    payNote: "The basic portrait is available online. Further review works more like a personal temperament and image-refinement note. It is not medical diagnosis and should not be treated as an absolute conclusion.",
    statusSaving: "Basic chart generated.",
    statusLocal: "Basic portrait generated. If you want a fuller personal note, copy the profile and add Yanxishe on WeChat.",
    statusOnline: "Profile copied. If you want a fuller personal note, add Yanxishe on WeChat and send it.",
    statusFail: "Basic portrait generated. If you want a fuller personal note, copy the profile and add Yanxishe on WeChat.",
    copied: "Profile copied. You can send it on WeChat.",
    orderText: (data) => `I want to continue with an Oriental Vital Aesthetics personal portrait note. Name: ${data.name}; birth: ${data.birthDate} ${data.birthTime}; place: ${data.birthPlace}; time zone: ${data.birthTimezone}; focus: ${needLabel(data.mainNeed)}`
  }
};

const elementCopy = {
  zh: {
    wood: "感受细、审美敏锐、容易被关系和环境影响。",
    fire: "表达欲、行动力和被看见的需求较明显。",
    earth: "重稳定、重承诺，也容易被现实压力牵动。",
    metal: "边界、秩序、判断力较强，适合建立规则。",
    water: "思考深、直觉强，但过度思虑时容易内耗。"
  },
  en: {
    wood: "Sensitive, aesthetically alert, and easily influenced by relationships and environments.",
    fire: "Expression, action and visibility tend to affect your state strongly.",
    earth: "Stability, trust and reality pressure are important themes.",
    metal: "Boundaries, order and clear standards are key to your balance.",
    water: "Deep thinking and intuition are strong, though overthinking can drain energy."
  }
};

const elementAesthetic = {
  zh: {
    wood: "木气偏显的人，气质上常带有清秀、舒展、敏感和生长感。适合干净、有呼吸感、有线条延展的风格，过度厚重或压抑的搭配容易让状态显闷。",
    fire: "火气偏显的人，气质上更容易被看见，适合明亮、精神、带一点焦点感的表达。状态好时有感染力，状态弱时容易显急、显燥或疲态外露。",
    earth: "土气偏显的人，气质上有稳定、可信、承载感。适合温润、沉稳、有质感的风格，但如果压力过重，容易显得迟滞、臃肿或缺少轻盈感。",
    metal: "金气偏显的人，气质上有边界、清冷、利落和秩序感。适合简洁、剪裁清晰、轮廓干净的风格，过度繁复会削弱高级感。",
    water: "水气偏显的人，气质上有流动、思考、神秘和细腻感。适合柔和、有层次、有留白的风格，但过度阴冷或松散会让精神感下降。"
  },
  en: {
    wood: "Prominent Wood often reads as fresh, sensitive, flexible and growth-oriented. Clean lines, breathing space and elongated silhouettes tend to suit it.",
    fire: "Prominent Fire reads as visible, expressive and spirited. Brighter focal points can help, while excess tension may show as impatience or exposed fatigue.",
    earth: "Prominent Earth reads as stable, grounded and trustworthy. Warm, calm and textured styling suits it, while too much pressure can make the state look heavy.",
    metal: "Prominent Metal reads as cool, refined and structured. Clean tailoring and simple silhouettes support it; clutter weakens the premium feeling.",
    water: "Prominent Water reads as fluid, thoughtful and subtle. Soft layering and visual breathing room suit it, while too much coldness can reduce vitality."
  }
};

const elementBalance = {
  zh: {
    wood: "木的表现较弱时，可以先观察自己是否缺少舒展感、行动生发感，或长期处在被动消耗里。",
    fire: "火的表现较弱时，可以先观察自己是否缺少表达、热量、精神外放感，或容易显疲惫、没光。",
    earth: "土的表现较弱时，可以先观察自己是否缺少稳定节律、现实落地感，或容易因为不确定而焦虑。",
    metal: "金的表现较弱时，可以先观察自己是否缺少边界、规则和取舍，容易被关系或信息拖住。",
    water: "水的表现较弱时，可以先观察自己是否缺少恢复、沉静和深度休息，容易一直硬撑。"
  },
  en: {
    wood: "When Wood is weaker, observe whether flexibility, growth impulse or physical ease feel blocked.",
    fire: "When Fire is weaker, observe whether expression, warmth and visible vitality feel reduced.",
    earth: "When Earth is weaker, observe whether rhythm, stability and practical grounding feel insufficient.",
    metal: "When Metal is weaker, observe whether boundaries, rules and decisive choices feel difficult.",
    water: "When Water is weaker, observe whether recovery, quietness and deeper rest feel insufficient."
  }
};

const dayMasterBase = {
  zh: {
    甲: "甲木像大树，重原则、重成长，适合有长期结构的目标。",
    乙: "乙木像花草藤蔓，审美细、适应力强，也容易受环境影响。",
    丙: "丙火像太阳，重表达、重热度，状态好时很能照亮他人。",
    丁: "丁火像灯火，细腻、有温度，适合做精细表达和氛围营造。",
    戊: "戊土像山，重承载和稳定，适合做可靠的中轴和资源整合。",
    己: "己土像田园，重滋养、重细节，适合做长期打磨和陪伴型服务。",
    庚: "庚金像矿石，重判断和执行，适合清晰规则和强结果场景。",
    辛: "辛金像珠玉，重质感、边界和精致，适合审美、筛选和精修。",
    壬: "壬水像江河，思维流动、视野大，适合跨界、传播和策略。",
    癸: "癸水像雨露，敏锐、细腻、直觉强，适合洞察、陪伴和精微观察。"
  },
  en: {
    甲: "Jia Wood is like a large tree: principled, growth-driven and suited to long-term structure.",
    乙: "Yi Wood is like vines and flowers: refined, adaptive and strongly affected by environment.",
    丙: "Bing Fire is like the sun: expressive, warm and able to energize others when balanced.",
    丁: "Ding Fire is like a lamp: subtle, warm and suited to refined expression and atmosphere.",
    戊: "Wu Earth is like a mountain: stable, carrying and suited to resource integration.",
    己: "Ji Earth is like cultivated soil: nurturing, detailed and suited to long-term refinement.",
    庚: "Geng Metal is like ore: decisive, direct and suited to rule-based execution.",
    辛: "Xin Metal is like jewelry: refined, precise and suited to aesthetics, selection and polishing.",
    壬: "Ren Water is like a river: broad-minded, flowing and suited to strategy and communication.",
    癸: "Gui Water is like rain: sensitive, intuitive and suited to subtle observation and care."
  }
};

const personalityDetail = {
  zh: {
    wood: "你的底色里有一种向上生长的力量：看似温和，内在其实很需要空间和方向。你不适合被长期压制，也不适合待在审美粗糙、关系混乱的环境里。状态好的时候，你会显得清透、舒展、有生命力；状态差的时候，容易想太多、心里绷着，脸和肩颈也会跟着紧。",
    fire: "你的底色里有火的明亮与表达：需要热度、回应和被看见。状态好的时候，你会显得有感染力，眼神有光；状态差的时候，容易急、燥、睡不沉，外在会先出现疲态和焦灼感。你需要的是稳定发光，而不是把自己烧得太快。",
    earth: "你的底色里有土的承载与稳定：重承诺、重实际，也容易替别人扛太多。状态好的时候，你给人可靠、温润、有分量的感觉；状态差的时候，容易显沉、显累、显钝，身体和脸部都像被压力往下压。你的美感来自松弛的稳定，而不是硬撑的责任感。",
    metal: "你的底色里有金的边界与质感：审美上不适合太杂，做人做事也需要清楚标准。状态好的时候，你会显得干净、利落、有高级感；状态差的时候，容易过度挑剔、紧绷、呼吸浅，脸部线条也会显硬。你的关键词是精修，而不是消耗式完美。",
    water: "你的底色里有水的流动与洞察：直觉强，想得深，也容易被情绪和信息浸透。状态好的时候，你会显得有灵气、有层次；状态差的时候，容易疲、冷、散，精神感不足。你需要的是安静恢复和清晰边界，而不是一直在内心里翻涌。"
  },
  en: {
    wood: "Your base has an upward, growing quality. You need space, direction and refined surroundings. When balanced, you look clear, alive and open; when depleted, thoughts, shoulders and facial tension easily tighten together.",
    fire: "Your base carries brightness and expression. You need warmth, response and visibility. When balanced, your eyes and presence become vivid; when depleted, urgency, poor sleep and visible fatigue can appear quickly.",
    earth: "Your base carries steadiness and responsibility. You may take on too much for others. When balanced, you feel warm and reliable; when depleted, the face and body can look heavy or pressed down by pressure.",
    metal: "Your base carries boundaries and refinement. You need clean standards and less clutter. When balanced, you look polished and sharp; when depleted, perfectionism, shallow breathing and hard facial lines can show up.",
    water: "Your base carries intuition and depth. You think deeply and absorb subtle signals. When balanced, you look layered and soulful; when depleted, the state can feel cold, scattered or low in vitality."
  }
};

const colorNames = {
  zh: {
    wood: "绿色、青色、翠色、浅绿系",
    fire: "红色、粉色、橙色、紫色、花色系",
    earth: "黄色、咖啡、棕色、卡其、米杏色系",
    metal: "白色、银色、杏色、乳白、浅灰白系",
    water: "黑色、蓝色、深灰、藏蓝、墨色系"
  },
  en: {
    wood: "greens, cyan, jade and light green tones",
    fire: "red, pink, orange, purple and vivid patterns",
    earth: "yellow, coffee, brown, khaki, beige and almond tones",
    metal: "white, silver, ivory, cream and pale grey-white tones",
    water: "black, blue, dark grey, navy and ink tones"
  }
};

const foodNotes = {
  zh: {
    wood: {
      more: "深绿叶菜、芹菜、菠菜、青瓜、柠檬水、少量酸味食物。",
      less: "长期油腻、酒精过量、情绪很堵时暴饮暴食。"
    },
    fire: {
      more: "温热熟食、红枣、番茄、胡萝卜、少量辛香料、规律早餐。",
      less: "连续熬夜后再吃过辣、过烫、过甜的食物。"
    },
    earth: {
      more: "小米、南瓜、山药、红薯、莲子、温热粥汤。",
      less: "冰饮、甜腻零食、过度生冷和吃饭时间混乱。"
    },
    metal: {
      more: "白萝卜、银耳、梨、百合、杏仁、清淡汤水。",
      less: "过度辛辣、烟酒刺激、长期干燥环境里还少喝水。"
    },
    water: {
      more: "黑芝麻、黑豆、海带、紫菜、温水、炖汤类食物。",
      less: "长期冰饮、过咸重口、熬夜后大量咖啡硬撑。"
    }
  },
  en: {
    wood: {
      more: "leafy greens, celery, spinach, cucumber, lemon water and mild sour flavors.",
      less: "long-term greasy food, excess alcohol and emotional overeating."
    },
    fire: {
      more: "warm cooked meals, red dates, tomatoes, carrots, mild spices and regular breakfast.",
      less: "very spicy, very hot or overly sweet food after late nights."
    },
    earth: {
      more: "millet, pumpkin, yam, sweet potato, lotus seed and warm porridge or soup.",
      less: "iced drinks, heavy sweets, too much raw/cold food and irregular meals."
    },
    metal: {
      more: "white radish, snow fungus, pear, lily bulb, almond and light soups.",
      less: "excess spicy food, smoke/alcohol irritation and dry environments without enough fluids."
    },
    water: {
      more: "black sesame, black beans, kelp, seaweed, warm water and slow-cooked soups.",
      less: "long-term iced drinks, overly salty food and relying on coffee after late nights."
    }
  }
};

const bodyNotes = {
  zh: {
    wood: "传统五行里，木常被用来观察舒展、筋膜、眼疲劳和情绪郁结。你可以留意：是否容易肩颈拉紧、眼睛干涩、情绪憋住不说。先从散步、拉伸、规律睡眠和减少憋闷关系开始。",
    fire: "传统五行里，火常被用来观察精神外放、睡眠热度、心神安定和面部红热感。你可以留意：是否容易睡前兴奋、心急、脸上显燥。先从降低晚间刺激、减少熬夜和慢呼吸开始。",
    earth: "传统五行里，土常被用来观察消化节律、稳定感、肌肉承托和湿重感。你可以留意：是否饭后困、身体沉、脸部浮肿感明显。先从规律吃饭、少冰甜、轻运动开始。",
    metal: "传统五行里，金常被用来观察呼吸、皮肤干润、边界感和收敛能力。你可以留意：是否呼吸浅、皮肤偏干、容易紧绷。先从补水、清淡饮食、放松胸廓和减少过度批判开始。",
    water: "传统五行里，水常被用来观察恢复力、睡眠深度、腰背疲劳和精力储备。你可以留意：是否长期硬撑、怕冷、腰背累、睡醒不解乏。先从早睡、保暖、减少冰饮和给自己留恢复时间开始。"
  },
  en: {
    wood: "In Five Element language, Wood is often used to observe flexibility, fascia, eye fatigue and emotional stagnation. Notice neck tension, dry eyes or unspoken frustration. Start with walking, stretching, regular sleep and less oppressive relationships.",
    fire: "Fire is often used to observe outward spirit, sleep heat, mental calm and facial redness. Notice late-night excitement, impatience or a flushed, dry look. Start with lower evening stimulation, less late-night work and slow breathing.",
    earth: "Earth is often used to observe digestion rhythm, stability, muscle support and damp heaviness. Notice sleepiness after meals, body heaviness or facial puffiness. Start with regular meals, fewer iced sweets and light movement.",
    metal: "Metal is often used to observe breathing, skin moisture, boundaries and the ability to refine. Notice shallow breath, dryness or tightness. Start with hydration, light food, chest relaxation and less self-criticism.",
    water: "Water is often used to observe recovery, sleep depth, lower-back fatigue and energy reserve. Notice over-endurance, coldness, back fatigue or waking unrested. Start with earlier sleep, warmth, fewer iced drinks and real recovery time."
  }
};

const hexagrams = [
  {
    symbol: "䷀",
    name: { zh: "乾为天", en: "Qian / Creative" },
    text: {
      zh: "今日重在主动与定方向。适合把一件拖延的事先推到台面，不要等状态完美再开始。",
      en: "Today favors initiative and direction. Bring one delayed task forward instead of waiting for a perfect state."
    }
  },
  {
    symbol: "䷁",
    name: { zh: "坤为地", en: "Kun / Receptive" },
    text: {
      zh: "今日重在承接与整理。适合做复盘、收纳、修正流程，不宜硬碰硬。",
      en: "Today favors receiving, sorting and grounding. Review, organize and refine the process instead of forcing conflict."
    }
  },
  {
    symbol: "䷂",
    name: { zh: "水雷屯", en: "Zhun / Beginning" },
    text: {
      zh: "今日像种子刚破土，开始会慢，但值得先定一个小动作。不要一次求全。",
      en: "Today feels like a seed breaking soil. Progress may be slow, but one small concrete move matters."
    }
  },
  {
    symbol: "䷃",
    name: { zh: "山水蒙", en: "Meng / Learning" },
    text: {
      zh: "今日适合学习与请教。先承认不知道，反而能更快找到答案。",
      en: "Today favors learning and asking. Admitting what is unclear helps you find the answer faster."
    }
  },
  {
    symbol: "䷈",
    name: { zh: "风天小畜", en: "Xiao Xu / Small Accumulation" },
    text: {
      zh: "今日适合积累小成果。不要急着放大，先把内容、证据和节奏攒起来。",
      en: "Today favors small accumulation. Do not rush to scale; gather content, proof and rhythm first."
    }
  },
  {
    symbol: "䷊",
    name: { zh: "地天泰", en: "Tai / Flow" },
    text: {
      zh: "今日有顺势之象。适合沟通、约见、推进合作，把话说清楚会有进展。",
      en: "Today has a smoother current. Communication, meetings and collaboration may move forward when things are stated clearly."
    }
  },
  {
    symbol: "䷋",
    name: { zh: "天地否", en: "Pi / Blocked" },
    text: {
      zh: "今日不宜硬冲。先看哪里卡住，停下来调整顺序，比蛮力推进更有效。",
      en: "Today is not for forcing. Notice what is blocked and adjust the order before pushing harder."
    }
  },
  {
    symbol: "䷱",
    name: { zh: "火风鼎", en: "Ding / Refining" },
    text: {
      zh: "今日适合把粗糙的东西重新打磨。形象、作品、话术和服务都可以精修。",
      en: "Today favors refinement. Polish image, work, language and service rather than adding more noise."
    }
  },
  {
    symbol: "䷞",
    name: { zh: "泽山咸", en: "Xian / Influence" },
    text: {
      zh: "今日重在人与人的感应。真诚表达比强行证明更容易形成连接。",
      en: "Today favors subtle influence between people. Sincere expression connects better than over-proving."
    }
  },
  {
    symbol: "䷤",
    name: { zh: "风火家人", en: "Jia Ren / Inner Order" },
    text: {
      zh: "今日先安顿内在秩序。家、身体、作息和情绪稳定了，外面的事才会顺。",
      en: "Today starts with inner order. Home, body, rhythm and emotion need steadiness before outside matters flow."
    }
  },
  {
    symbol: "䷟",
    name: { zh: "雷风恒", en: "Heng / Consistency" },
    text: {
      zh: "今日关键词是持续。不要换方向，做一件已经证明有效的小事。",
      en: "Today asks for consistency. Do not change direction; repeat one small thing that has already shown value."
    }
  },
  {
    symbol: "䷦",
    name: { zh: "水山蹇", en: "Jian / Difficulty" },
    text: {
      zh: "今日遇阻不是坏事。适合避开消耗的人和事，先保存体力与判断力。",
      en: "Obstacles today are information. Avoid draining people or tasks and protect your energy and judgment."
    }
  }
];

const almanacPool = {
  zh: {
    yi: ["整理仪容", "轻运动", "复盘账目", "沟通合作", "学习练习", "拍摄素材", "早睡养神", "约见贵人", "清理空间", "写下计划"],
    ji: ["情绪消费", "熬夜硬撑", "冲动争执", "过度承诺", "临时改方向", "重口冰饮", "信息过载", "用力证明", "拖延付款", "贪多求快"]
  },
  en: {
    yi: ["grooming", "light movement", "reviewing money", "collaboration talks", "practice", "filming material", "early rest", "meeting supporters", "clearing space", "writing plans"],
    ji: ["emotional spending", "late-night forcing", "impulsive conflict", "over-promising", "sudden direction changes", "iced or heavy food", "information overload", "over-proving", "delaying payment", "rushing too much"]
  }
};

const solarTerms = [
  { date: "01-05", zh: "小寒", en: "Minor Cold" },
  { date: "01-20", zh: "大寒", en: "Major Cold" },
  { date: "02-04", zh: "立春", en: "Start of Spring" },
  { date: "02-19", zh: "雨水", en: "Rain Water" },
  { date: "03-05", zh: "惊蛰", en: "Awakening of Insects" },
  { date: "03-20", zh: "春分", en: "Spring Equinox" },
  { date: "04-04", zh: "清明", en: "Clear and Bright" },
  { date: "04-20", zh: "谷雨", en: "Grain Rain" },
  { date: "05-05", zh: "立夏", en: "Start of Summer" },
  { date: "05-21", zh: "小满", en: "Grain Buds" },
  { date: "06-05", zh: "芒种", en: "Grain in Ear" },
  { date: "06-21", zh: "夏至", en: "Summer Solstice" },
  { date: "07-07", zh: "小暑", en: "Minor Heat" },
  { date: "07-22", zh: "大暑", en: "Major Heat" },
  { date: "08-07", zh: "立秋", en: "Start of Autumn" },
  { date: "08-23", zh: "处暑", en: "End of Heat" },
  { date: "09-07", zh: "白露", en: "White Dew" },
  { date: "09-23", zh: "秋分", en: "Autumn Equinox" },
  { date: "10-08", zh: "寒露", en: "Cold Dew" },
  { date: "10-23", zh: "霜降", en: "Frost Descent" },
  { date: "11-07", zh: "立冬", en: "Start of Winter" },
  { date: "11-22", zh: "小雪", en: "Minor Snow" },
  { date: "12-07", zh: "大雪", en: "Major Snow" },
  { date: "12-21", zh: "冬至", en: "Winter Solstice" }
];

const solarTermNotes = {
  zh: {
    "小寒": "收敛养藏，少耗精神。",
    "大寒": "重在保暖，整理年末节奏。",
    "立春": "生发之始，适合立新计划。",
    "雨水": "润物渐生，适合柔和推进。",
    "惊蛰": "动能初起，适合唤醒行动。",
    "春分": "昼夜均衡，适合调节关系。",
    "清明": "清理郁结，适合断舍离。",
    "谷雨": "滋养成长，适合学习积累。",
    "立夏": "阳气外放，适合展示表达。",
    "小满": "未满而盈，适合稳步累积。",
    "芒种": "忙而有序，适合执行落地。",
    "夏至": "阳极转阴，适合降噪养心。",
    "小暑": "热气渐盛，适合减少焦躁。",
    "大暑": "暑热最盛，适合清淡休养。",
    "立秋": "收气初来，适合整理边界。",
    "处暑": "暑气渐退，适合恢复节律。",
    "白露": "润燥并行，适合护肤补水。",
    "秋分": "平衡取舍，适合复盘选择。",
    "寒露": "凉意加深，适合温养肺气。",
    "霜降": "收束沉淀，适合减少消耗。",
    "立冬": "进入收藏，适合养精蓄力。",
    "小雪": "寒意渐重，适合温补早睡。",
    "大雪": "藏养为主，适合安静打磨。",
    "冬至": "阴极阳生，适合重新起念。"
  },
  en: {
    "Minor Cold": "Conserve energy and reduce unnecessary output.",
    "Major Cold": "Keep warm and organize the year-end rhythm.",
    "Start of Spring": "A new beginning; set a fresh direction.",
    "Rain Water": "Move gently and steadily.",
    "Awakening of Insects": "Wake up action and momentum.",
    "Spring Equinox": "Seek balance in relationships and rhythm.",
    "Clear and Bright": "Clear stagnation and remove clutter.",
    "Grain Rain": "Nourish growth through study and accumulation.",
    "Start of Summer": "Express and show yourself with clarity.",
    "Grain Buds": "Accumulate steadily before things are full.",
    "Grain in Ear": "Act with order and grounded execution.",
    "Summer Solstice": "Lower noise and care for the heart-mind.",
    "Minor Heat": "Reduce irritability as heat rises.",
    "Major Heat": "Keep things light, simple and restorative.",
    "Start of Autumn": "Refine boundaries and gather energy.",
    "End of Heat": "Restore rhythm as heat recedes.",
    "White Dew": "Moisturize, hydrate and soften dryness.",
    "Autumn Equinox": "Review choices and return to balance.",
    "Cold Dew": "Warm and protect breath and skin.",
    "Frost Descent": "Reduce depletion and let things settle.",
    "Start of Winter": "Store energy and prepare quietly.",
    "Minor Snow": "Warm, rest early and avoid overwork.",
    "Major Snow": "Settle inward and refine slowly.",
    "Winter Solstice": "A new spark begins inside stillness."
  }
};

const twelveOfficers = [
  { key: "jian", zh: "建", en: "Establish" },
  { key: "chu", zh: "除", en: "Remove" },
  { key: "man", zh: "满", en: "Full" },
  { key: "ping", zh: "平", en: "Balance" },
  { key: "ding", zh: "定", en: "Settle" },
  { key: "zhi", zh: "执", en: "Hold" },
  { key: "po", zh: "破", en: "Break" },
  { key: "wei", zh: "危", en: "Caution" },
  { key: "cheng", zh: "成", en: "Complete" },
  { key: "shou", zh: "收", en: "Receive" },
  { key: "kai", zh: "开", en: "Open" },
  { key: "bi", zh: "闭", en: "Close" }
];

const officerCopy = {
  zh: {
    jian: { grade: "平日", tone: "neutral", yi: "立计划、开新局、整理方向", ji: "仓促定终局、冲动签约", note: "建日重在起势，适合立意，不宜急着收口。" },
    chu: { grade: "吉日", tone: "good", yi: "清理、修整、疗愈、断舍离", ji: "贪多、拖泥带水", note: "除日宜去旧留新，让气场重新干净。" },
    man: { grade: "平日", tone: "neutral", yi: "补充资源、整理作品、宴请小聚", ji: "过度承诺、情绪消费", note: "满日有盈满之象，宜收纳滋养，忌溢出。" },
    ping: { grade: "平日", tone: "neutral", yi: "复盘、协商、平衡关系", ji: "强行冒进、争高低", note: "平日宜求稳，适合把关系和节奏放平。" },
    ding: { grade: "吉日", tone: "good", yi: "定方案、约见、签小事、安顿生活", ji: "频繁改口、临时变卦", note: "定日适合让事情落位，气质上重稳重与秩序。" },
    zhi: { grade: "平日", tone: "neutral", yi: "执行、跟进、修细节", ji: "执念太重、强迫推进", note: "执日利于把手上的事握住，但不宜过度用力。" },
    po: { grade: "慎日", tone: "bad", yi: "破旧局、清理问题、止损", ji: "开业、定大事、冲动投资", note: "破日重在看见裂缝，适合拆解，不宜强求圆满。" },
    wei: { grade: "平日", tone: "neutral", yi: "谨慎安排、风险复核、静心修整", ji: "冒险、赶时间、逞强", note: "危日提醒先稳住身体和判断，不必急进。" },
    cheng: { grade: "吉日", tone: "good", yi: "发布、成交、见贵人、确定合作", ji: "反复犹豫、临门退缩", note: "成日有完成之象，适合把准备好的事推向结果。" },
    shou: { grade: "平日", tone: "neutral", yi: "收款、整理资料、复盘沉淀", ji: "盲目扩张、同时开启太多事", note: "收日宜聚气，适合把散开的能量收回来。" },
    kai: { grade: "吉日", tone: "good", yi: "开张、发布、邀约、表达展示", ji: "封闭自己、犹豫不说", note: "开日有打开之象，适合让作品、气质和关系被看见。" },
    bi: { grade: "慎日", tone: "bad", yi: "休息、闭关、保养、内部整理", ji: "公开冲刺、强行启动大事", note: "闭日宜藏养，不宜硬开。美感上重留白与收敛。" }
  },
  en: {
    jian: { grade: "Neutral", tone: "neutral", yi: "planning, beginning, setting direction", ji: "rushing final decisions", note: "Good for starting intention, not for forcing closure." },
    chu: { grade: "Auspicious", tone: "good", yi: "clearing, refining, healing, letting go", ji: "overloading and dragging things out", note: "Good for removing the old and refreshing the field." },
    man: { grade: "Neutral", tone: "neutral", yi: "gathering resources and nourishing", ji: "over-promising and emotional spending", note: "Fullness needs containment, not overflow." },
    ping: { grade: "Neutral", tone: "neutral", yi: "reviewing, negotiating, balancing", ji: "pushing too hard", note: "Best used for steadiness and adjustment." },
    ding: { grade: "Auspicious", tone: "good", yi: "settling plans, meetings, small agreements", ji: "frequent changes", note: "Good for placing things into order." },
    zhi: { grade: "Neutral", tone: "neutral", yi: "execution, follow-up, detail work", ji: "forcing through attachment", note: "Useful for holding a task, but avoid over-force." },
    po: { grade: "Cautious", tone: "bad", yi: "breaking old patterns, clearing problems", ji: "major launches or impulsive investment", note: "Good for dismantling, not forcing completeness." },
    wei: { grade: "Neutral", tone: "neutral", yi: "risk review, quiet refinement", ji: "rushing and showing off strength", note: "Stabilize judgment before action." },
    cheng: { grade: "Auspicious", tone: "good", yi: "publishing, closing, meeting supporters", ji: "last-minute hesitation", note: "Good for bringing prepared work to result." },
    shou: { grade: "Neutral", tone: "neutral", yi: "collecting, receiving, reviewing", ji: "blind expansion", note: "Good for gathering scattered energy." },
    kai: { grade: "Auspicious", tone: "good", yi: "opening, publishing, inviting, presenting", ji: "withdrawing and staying silent", note: "Good for being seen." },
    bi: { grade: "Cautious", tone: "bad", yi: "rest, retreat, care, internal work", ji: "public launches and forced starts", note: "Better for storing and preserving energy." }
  }
};

const dailyColorAdvice = {
  zh: {
    wood: "今日适合用绿色、青色或小面积植物感配饰，让整体状态更舒展。",
    fire: "今日适合用一点暖色或亮色作为焦点，让精神感被看见，但不要过度浓烈。",
    earth: "今日适合米杏、卡其、咖啡或低饱和黄色，帮助气场更稳。",
    metal: "今日适合白色、乳白、银灰或利落剪裁，让人显得清爽有边界。",
    water: "今日适合墨色、藏蓝、深灰或有流动感的材质，让思路沉下来。"
  },
  en: {
    wood: "Use green, cyan or a small botanical accent to create more ease and growth.",
    fire: "Use a warm or bright focal point to lift visible vitality, but keep it measured.",
    earth: "Use beige, khaki, coffee or muted yellow to make the field feel steadier.",
    metal: "Use white, ivory, silver grey or clean tailoring for clarity and boundaries.",
    water: "Use ink, navy, deep grey or fluid textures to quiet the mind."
  }
};

const dailyRituals = {
  zh: {
    wood: { title: "先舒展，再行动", text: "今天先让肩颈和眉心松开，再开始做重要的事。木气要顺，人的神态才会有生长感。", tip: "小动作：抬头、展肩、深呼吸 5 次，再整理一处桌面。" },
    fire: { title: "给自己一个亮点", text: "今天不必全身用力，只需要一个被看见的焦点：唇色、耳饰、领口或一句清楚表达。", tip: "小动作：出门前确认一个视觉亮点，也确认一句边界清楚的话。" },
    earth: { title: "把节奏稳下来", text: "今天旺自己的方式，是让生活先有秩序。吃饭、收纳、复盘，都会让气色更稳。", tip: "小动作：少冰甜，按时吃一顿热饭，完成一个小闭环。" },
    metal: { title: "删掉多余的东西", text: "今天越清爽，越显高级。衣服、语言和任务都可以减一点，留下真正重要的线条。", tip: "小动作：删掉一个无效承诺，衣着减少一个复杂元素。" },
    water: { title: "先养神，再开口", text: "今天适合把信息声量调低，让心神沉下来。水气安，眼神才会清。", tip: "小动作：睡前少刷屏 20 分钟，喝温水，听一段慢音。" }
  },
  en: {
    wood: { title: "Open first, then act", text: "Let the neck, shoulders and brow soften before important work. Wood needs flow before it can grow.", tip: "Practice: lift the head, open the shoulders, breathe five times and clear one corner." },
    fire: { title: "Choose one bright point", text: "You do not need to shine everywhere. One clear focal point in color, accessory or speech is enough.", tip: "Practice: set one visual highlight and one clear sentence before meeting people." },
    earth: { title: "Return to rhythm", text: "Your supportive move today is order: food, space and small completion make the field steady.", tip: "Practice: reduce iced sweets, eat warm food and finish one small loop." },
    metal: { title: "Remove the excess", text: "The cleaner it is, the more refined it feels. Reduce one element in clothing, speech or schedule.", tip: "Practice: decline one low-value request and simplify one outfit detail." },
    water: { title: "Restore spirit before speaking", text: "Turn down the noise and let the mind settle. When Water is quiet, the eyes become clearer.", tip: "Practice: stop scrolling 20 minutes before sleep, drink warm water and listen slowly." }
  }
};

const studyCards = {
  zh: {
    wood: { title: "木气：清秀、舒展、生长感", text: "木不是只穿绿色，而是让线条有呼吸，让人看见生命力。", list: ["适合：垂顺外套、自然腰线、植物感配饰", "避免：厚重压身、长期憋闷、肩颈紧绷", "今日关键词：舒展"] },
    fire: { title: "火气：明亮、精神、被看见", text: "火不是越红越好，而是把精神焦点放在最该出现的位置。", list: ["适合：一点唇色、暖色焦点、利落表达", "避免：全身高饱和、熬夜上火、情绪过急", "今日关键词：有光"] },
    earth: { title: "土气：稳定、温润、承托感", text: "土的美来自可靠和松弛，不是把责任全扛在身上。", list: ["适合：米杏、卡其、针织、低饱和暖色", "避免：过甜过冰、空间杂乱、拖延堆积", "今日关键词：安定"] },
    metal: { title: "金气：清爽、边界、高级感", text: "金的美在取舍，少一点杂乱，多一点干净的轮廓。", list: ["适合：白、银灰、衬衫、西装、简洁首饰", "避免：元素太多、过度挑剔、呼吸太浅", "今日关键词：精简"] },
    water: { title: "水气：沉静、灵气、层次感", text: "水的美不是阴郁，而是有留白、有深度、有恢复力。", list: ["适合：墨色、藏蓝、柔软垂坠、睡前静养", "避免：信息过载、全身太暗太松、长期硬撑", "今日关键词：养神"] }
  },
  en: {
    wood: { title: "Wood: fresh, open, growing", text: "Wood is not just green; it is breathable lines and visible vitality.", list: ["Use: fluid jackets, natural waistlines, botanical accents", "Avoid: heavy pressure, suppression, tight neck and shoulders", "Keyword: openness"] },
    fire: { title: "Fire: bright, vivid, seen", text: "Fire is not more red; it is placing spirit where it can be seen.", list: ["Use: lip color, warm focal points, clear speech", "Avoid: full saturation, late nights, rushed emotions", "Keyword: light"] },
    earth: { title: "Earth: steady, warm, supportive", text: "Earth beauty comes from relaxed reliability, not carrying everything alone.", list: ["Use: beige, khaki, knit, muted warm tones", "Avoid: iced sweets, clutter, unfinished piles", "Keyword: steadiness"] },
    metal: { title: "Metal: clean, bounded, refined", text: "Metal beauty comes from selection: fewer elements, clearer contours.", list: ["Use: white, silver grey, shirts, suits, simple jewelry", "Avoid: clutter, over-criticism, shallow breathing", "Keyword: refinement"] },
    water: { title: "Water: quiet, subtle, layered", text: "Water beauty is not gloom; it is space, depth and recovery.", list: ["Use: ink, navy, soft drape, pre-sleep quiet", "Avoid: overload, too dark and loose, constant forcing", "Keyword: restoration"] }
  }
};

const dailyTestCopy = {
  zh: {
    steady: "今天先把一件小事做完整。稳定不是慢，而是让自己重新有掌控感。",
    bright: "今天给自己一个温柔的亮点。让别人看见你，不等于消耗你。",
    soft: "今天先松开身体，再处理事情。很多烦躁，其实从肩颈和呼吸开始。"
  },
  en: {
    steady: "Complete one small thing today. Steadiness is not slowness; it returns control.",
    bright: "Give yourself one gentle highlight. Being seen does not have to drain you.",
    soft: "Soften the body before handling the day. Much restlessness begins in breath and shoulders."
  }
};

const dailyArticles = [
  {
    zhTitle: "美感先从不急开始",
    zhText: "一个人的气质，不只在衣服和脸上，也在他说话的速度、走路的松紧、做选择时的安定。今天不必急着改变很多，只要把一个地方收拾清楚，把一句话说得温和而准确，就是在养自己的气。",
    zhQuote: "重为轻根，静为躁君。——《道德经》第二十六章",
    enTitle: "Beauty begins with not rushing",
    enText: "Temperament is not only on the face or clothes. It appears in speaking speed, body ease and the steadiness of choices. Today, clear one place and say one sentence gently but clearly.",
    enQuote: "Heaviness is the root of lightness; stillness is the master of restlessness. — Dao De Jing, Chapter 26"
  },
  {
    zhTitle: "真正旺自己的颜色，是能托住你的颜色",
    zhText: "颜色不是迷信，也不是规则。它是一种环境语言。你今天穿的颜色，如果能让气色更干净、轮廓更安定、心里更有底，它就正在帮助你。",
    zhQuote: "见素抱朴，少私寡欲。——《道德经》第十九章",
    enTitle: "A supportive color holds your state",
    enText: "Color is not a superstition or a rigid rule. It is environmental language. If today's color makes complexion cleaner, contour calmer and the heart steadier, it is supporting you.",
    enQuote: "See simplicity and hold plainness; lessen selfishness and desire. — Dao De Jing, Chapter 19"
  },
  {
    zhTitle: "气色来自恢复，不只是修饰",
    zhText: "妆容可以提亮一时，恢复才能让人耐看。睡眠、呼吸、肩颈、饮水、情绪边界，这些看似朴素的事，才是长期气色的底盘。",
    zhQuote: "水静犹明，而况精神。——《庄子・天道》",
    enTitle: "Complexion comes from recovery",
    enText: "Makeup can brighten a moment; recovery makes beauty last. Sleep, breath, neck and shoulders, hydration and emotional boundaries are the base of lasting presence.",
    enQuote: "Still water is clear; how much more so the spirit. — Zhuangzi, The Way of Heaven"
  },
  {
    zhTitle: "把自己放回自己的节奏里",
    zhText: "很多疲惫不是能力不足，而是节奏被别人牵走。今天可以少比较一点，少解释一点，多做一件真正会让自己回来的事。",
    zhQuote: "此心安处是吾乡。——苏轼《定风波》",
    enTitle: "Return to your own rhythm",
    enText: "Much tiredness is not lack of ability; it is losing your rhythm to others. Compare less, explain less, and do one thing that brings you back.",
    enQuote: "Where the heart is at peace, there is home. — Su Shi"
  },
  {
    zhTitle: "留白也是一种力量",
    zhText: "不是所有地方都要填满。穿搭留白，语言留白，时间留白，都会让人的气质更有余地。余地，是高级感的一部分。",
    zhQuote: "虚室生白，吉祥止止。——《庄子・人间世》",
    enTitle: "Space is also strength",
    enText: "Not every place needs to be filled. Space in style, speech and schedule gives temperament room to breathe. Room is part of refinement.",
    enQuote: "In an empty room, brightness arises; auspiciousness comes to rest. — Zhuangzi"
  }
];

const oracleCopy = {
  zh: {
    wealth: {
      wood: "财运今日靠“先让别人看懂你的价值”。发一条案例、整理一个报价、联系一个老客户，比空想更有用。",
      fire: "财运今日靠“被看见”。适合发布内容、开口介绍服务，但价格和边界要说清楚。",
      earth: "财运今日靠“稳定成交”。别临时加太多东西，把一个小产品讲明白。",
      metal: "财运今日靠“筛选”。不靠谱的人和低价消耗先挡掉，反而能保住正财。",
      water: "财运今日靠“信息差”。适合研究客户痛点、复盘数据，再决定怎么开口。"
    },
    career: {
      wood: "事业今日适合做内容生发：列选题、写脚本、约人拍摄。先把枝条长出来。",
      fire: "事业今日适合表达和展示：开会、拍视频、递作品都可，但别把情绪带进沟通。",
      earth: "事业今日适合落地：报价、流程、交付表和时间安排要清楚。",
      metal: "事业今日适合删减和定规则：把低效环节砍掉，留一个最清晰的主线。",
      water: "事业今日适合策略：先看趋势、资源和人脉，再决定下一步。"
    },
    love: {
      wood: "关系今日适合温柔表达需求，不要只照顾对方的情绪。",
      fire: "关系今日适合主动一点，但不要用热情掩盖不安。",
      earth: "关系今日适合做一件实际的小事，胜过说很多漂亮话。",
      metal: "关系今日适合讲边界。把不舒服说清楚，关系反而更干净。",
      water: "关系今日适合慢一点。先观察对方行动，不急着给结论。"
    },
    beauty: {
      wood: "形象今日先做舒展：拉伸肩颈、整理发型、穿有呼吸感的线条。",
      fire: "形象今日先提气色：一点唇色、腮色或亮色配饰，会让人更有精神。",
      earth: "形象今日先减浮重：少冰甜、轻运动、穿稳定但不厚重的颜色。",
      metal: "形象今日先做清爽：减少复杂元素，剪裁和干净度就是高级感。",
      water: "形象今日先养神：补睡眠、少刷屏，穿有留白和层次的深色。"
    },
    calm: {
      wood: "心态今日不要憋。写下真实想法，再选一个可以行动的小步骤。",
      fire: "心态今日先降火。少一点即时反应，多一点停顿和呼吸。",
      earth: "心态今日先稳住生活秩序。吃饭、睡觉、收拾空间，就是起势。",
      metal: "心态今日先做取舍。删掉一个不必要的承诺，能量会回来。",
      water: "心态今日先休息。不是退缩，是让判断力重新清澈。"
    }
  },
  en: {
    wealth: {
      wood: "Money today improves when people understand your value. Share a case, refine an offer or contact one past client.",
      fire: "Money today needs visibility. Publish, speak or present, but keep price and boundaries clear.",
      earth: "Money today comes through stable conversion. Explain one small offer clearly instead of adding too much.",
      metal: "Money today improves through filtering. Block unreliable, low-price drainers and protect real income.",
      water: "Money today comes through insight. Study client pain points and data before making the ask."
    },
    career: {
      wood: "Work today favors growth: list topics, draft scripts and invite people to film.",
      fire: "Work today favors presentation: meetings, videos and portfolios are useful, but keep emotion out of the talk.",
      earth: "Work today favors execution: make pricing, workflow, delivery and timing clear.",
      metal: "Work today favors trimming and rules. Cut inefficient parts and keep one clear main line.",
      water: "Work today favors strategy. Read trends, resources and relationships before the next move."
    },
    love: {
      wood: "Relationships today favor gentle expression of needs, not only caring for the other person's emotions.",
      fire: "Relationships today can be more active, but do not use warmth to hide insecurity.",
      earth: "Relationships today benefit from one practical act more than many beautiful words.",
      metal: "Relationships today need boundaries. Clear discomfort can make the bond cleaner.",
      water: "Relationships today should slow down. Observe actions before drawing conclusions."
    },
    beauty: {
      wood: "Image today starts with ease: stretch neck and shoulders, tidy hair and use breathable lines.",
      fire: "Image today starts with complexion: lip color, blush or one bright accent can lift vitality.",
      earth: "Image today starts with reducing heaviness: fewer iced sweets, light movement and stable but not heavy colors.",
      metal: "Image today starts with clarity: fewer elements, clean tailoring and neatness create refinement.",
      water: "Image today starts with restoring spirit: sleep more, scroll less and use layered deep colors."
    },
    calm: {
      wood: "Mindset today should not be suppressed. Write the truth down, then choose one small action.",
      fire: "Mindset today needs cooling. React less immediately; pause and breathe more.",
      earth: "Mindset today starts with order. Eating, sleeping and clearing space can restart momentum.",
      metal: "Mindset today starts with selection. Remove one unnecessary commitment and energy returns.",
      water: "Mindset today starts with rest. It is not retreat; it clears judgment."
    }
  }
};

const dailyVerses = [
  {
    zh: "山中何事？松花酿酒，春水煎茶。",
    zhSource: "张可久《人月圆・山中书事》",
    en: "In the mountains: pine blossoms for wine, spring water for tea.",
    enSource: "Zhang Kejiu, Ren Yue Yuan"
  },
  {
    zh: "行到水穷处，坐看云起时。",
    zhSource: "王维《终南别业》",
    en: "Walk to where the water ends; sit and watch the clouds rise.",
    enSource: "Wang Wei, My Retreat at Mount Zhongnan"
  },
  {
    zh: "长风破浪会有时，直挂云帆济沧海。",
    zhSource: "李白《行路难・其一》",
    en: "A time will come to ride the wind and waves, setting cloudlike sails across the sea.",
    enSource: "Li Bai, The Hard Road"
  },
  {
    zh: "莫愁前路无知己，天下谁人不识君。",
    zhSource: "高适《别董大》",
    en: "Do not worry there will be no friends ahead; who under heaven will not know you?",
    enSource: "Gao Shi, Farewell to Dong Da"
  },
  {
    zh: "疏影横斜水清浅，暗香浮动月黄昏。",
    zhSource: "林逋《山园小梅》",
    en: "Sparse shadows cross clear shallow water; a hidden fragrance moves at dusk.",
    enSource: "Lin Bu, Little Plum in a Mountain Garden"
  },
  {
    zh: "掬水月在手，弄花香满衣。",
    zhSource: "于良史《春山夜月》",
    en: "Hold water and the moon rests in your hands; touch flowers and fragrance fills your sleeves.",
    enSource: "Yu Liangshi, Spring Mountain Moonlit Night"
  },
  {
    zh: "人间有味是清欢。",
    zhSource: "苏轼《浣溪沙・细雨斜风作晓寒》",
    en: "The finest taste in life is quiet joy.",
    enSource: "Su Shi, Huan Xi Sha"
  },
  {
    zh: "且将新火试新茶，诗酒趁年华。",
    zhSource: "苏轼《望江南・超然台作》",
    en: "Try new tea with a new fire; poetry and wine belong to these bright years.",
    enSource: "Su Shi, Wang Jiang Nan"
  },
  {
    zh: "此心安处是吾乡。",
    zhSource: "苏轼《定风波・南海归赠王定国侍人寓娘》",
    en: "Where the heart is at peace, there is home.",
    enSource: "Su Shi, Ding Feng Bo"
  },
  {
    zh: "云淡风轻近午天，傍花随柳过前川。",
    zhSource: "程颢《春日偶成》",
    en: "Light clouds and gentle wind near noon; follow flowers and willows by the stream.",
    enSource: "Cheng Hao, Written on a Spring Day"
  },
  {
    zh: "梨花院落溶溶月，柳絮池塘淡淡风。",
    zhSource: "晏殊《寓意》",
    en: "Moonlight softens the pear-blossom courtyard; willow down drifts over the pond.",
    enSource: "Yan Shu, Yu Yi"
  },
  {
    zh: "海上生明月，天涯共此时。",
    zhSource: "张九龄《望月怀远》",
    en: "The bright moon rises over the sea; across the world, we share this moment.",
    enSource: "Zhang Jiuling, Looking at the Moon and Thinking of One Far Away"
  },
  {
    zh: "只愿君心似我心，定不负相思意。",
    zhSource: "李之仪《卜算子・我住长江头》",
    en: "I only wish your heart were like mine; then this longing would not be in vain.",
    enSource: "Li Zhiyi, Bu Suan Zi"
  },
  {
    zh: "玲珑骰子安红豆，入骨相思知不知。",
    zhSource: "温庭筠《南歌子词二首・其二》",
    en: "Red beans set in delicate dice; do you know this longing has reached the bone?",
    enSource: "Wen Tingyun, Nan Ge Zi"
  },
  {
    zh: "愿我如星君如月，夜夜流光相皎洁。",
    zhSource: "范成大《车遥遥篇》",
    en: "May I be like the star and you the moon, shining clear together night after night.",
    enSource: "Fan Chengda, Che Yao Yao Pian"
  },
  {
    zh: "在天愿作比翼鸟，在地愿为连理枝。",
    zhSource: "白居易《长恨歌》",
    en: "In the sky, may we be paired-wing birds; on earth, intertwined branches.",
    enSource: "Bai Juyi, Song of Everlasting Regret"
  },
  {
    zh: "道法自然。",
    zhSource: "《道德经》第二十五章",
    en: "The Way follows what is naturally so.",
    enSource: "Dao De Jing, Chapter 25"
  },
  {
    zh: "上善若水。水善利万物而不争。",
    zhSource: "《道德经》第八章",
    en: "The highest good is like water; it benefits all things and does not contend.",
    enSource: "Dao De Jing, Chapter 8"
  },
  {
    zh: "致虚极，守静笃。",
    zhSource: "《道德经》第十六章",
    en: "Reach utmost emptiness; keep deep stillness.",
    enSource: "Dao De Jing, Chapter 16"
  },
  {
    zh: "知足不辱，知止不殆。",
    zhSource: "《道德经》第四十四章",
    en: "Knowing contentment avoids disgrace; knowing when to stop avoids danger.",
    enSource: "Dao De Jing, Chapter 44"
  },
  {
    zh: "大成若缺，其用不弊。",
    zhSource: "《道德经》第四十五章",
    en: "Great completion seems incomplete, yet its use is never exhausted.",
    enSource: "Dao De Jing, Chapter 45"
  },
  {
    zh: "大直若屈，大巧若拙，大辩若讷。",
    zhSource: "《道德经》第四十五章",
    en: "Great straightness seems bent; great skill seems clumsy; great eloquence seems slow.",
    enSource: "Dao De Jing, Chapter 45"
  },
  {
    zh: "见素抱朴，少私寡欲。",
    zhSource: "《道德经》第十九章",
    en: "See simplicity and hold plainness; lessen selfishness and desire.",
    enSource: "Dao De Jing, Chapter 19"
  },
  {
    zh: "重为轻根，静为躁君。",
    zhSource: "《道德经》第二十六章",
    en: "Heaviness is the root of lightness; stillness is the master of restlessness.",
    enSource: "Dao De Jing, Chapter 26"
  },
  {
    zh: "清者浊之源，动者静之基。",
    zhSource: "《清静经》",
    en: "Clarity is the source of turbidity; movement is rooted in stillness.",
    enSource: "Qingjing Jing"
  },
  {
    zh: "人能常清静，天地悉皆归。",
    zhSource: "《清静经》",
    en: "If one can remain clear and still, heaven and earth return to alignment.",
    enSource: "Qingjing Jing"
  },
  {
    zh: "夫物芸芸，各复归其根。",
    zhSource: "《道德经》第十六章",
    en: "All things flourish, then each returns to its root.",
    enSource: "Dao De Jing, Chapter 16"
  },
  {
    zh: "乘天地之正，而御六气之辩，以游无穷。",
    zhSource: "《庄子・逍遥游》",
    en: "Ride the rightness of heaven and earth, follow the changes of the six breaths, and wander without limit.",
    enSource: "Zhuangzi, Free and Easy Wandering"
  },
  {
    zh: "至人无己，神人无功，圣人无名。",
    zhSource: "《庄子・逍遥游》",
    en: "The perfected person has no self; the spirit-like person has no achievement; the sage has no name.",
    enSource: "Zhuangzi, Free and Easy Wandering"
  },
  {
    zh: "举世誉之而不加劝，举世非之而不加沮。",
    zhSource: "《庄子・逍遥游》",
    en: "Though the world praises him, he is not urged on; though the world condemns him, he is not discouraged.",
    enSource: "Zhuangzi, Free and Easy Wandering"
  },
  {
    zh: "相濡以沫，不如相忘于江湖。",
    zhSource: "《庄子・大宗师》",
    en: "Rather than moisten each other with foam, it is better to forget each other in rivers and lakes.",
    enSource: "Zhuangzi, The Great and Venerable Teacher"
  },
  {
    zh: "古之真人，不知说生，不知恶死。",
    zhSource: "《庄子・大宗师》",
    en: "The true person of old did not delight in life or hate death.",
    enSource: "Zhuangzi, The Great and Venerable Teacher"
  },
  {
    zh: "泉涸，鱼相与处于陆，相呴以湿，相濡以沫。",
    zhSource: "《庄子・大宗师》",
    en: "When springs dry, fish gather on land, moistening one another with breath and foam.",
    enSource: "Zhuangzi, The Great and Venerable Teacher"
  },
  {
    zh: "天地与我并生，而万物与我为一。",
    zhSource: "《庄子・齐物论》",
    en: "Heaven and earth were born with me; the ten thousand things and I are one.",
    enSource: "Zhuangzi, Discussion on Making All Things Equal"
  },
  {
    zh: "独与天地精神往来。",
    zhSource: "《庄子・天下》",
    en: "Alone, one moves with the spirit of heaven and earth.",
    enSource: "Zhuangzi, Under Heaven"
  },
  {
    zh: "虚室生白，吉祥止止。",
    zhSource: "《庄子・人间世》",
    en: "In an empty room, brightness arises; auspiciousness comes to rest.",
    enSource: "Zhuangzi, The Human World"
  },
  {
    zh: "淡然无极，而众美从之。",
    zhSource: "《庄子・刻意》",
    en: "When one is quietly boundless, all forms of beauty follow.",
    enSource: "Zhuangzi, Deliberate Effort"
  },
  {
    zh: "水静犹明，而况精神。",
    zhSource: "《庄子・天道》",
    en: "Still water is clear; how much more so the spirit.",
    enSource: "Zhuangzi, The Way of Heaven"
  },
  {
    zh: "不精不诚，不能动人。",
    zhSource: "《庄子・渔父》",
    en: "Without refinement and sincerity, one cannot move others.",
    enSource: "Zhuangzi, The Fisherman"
  }
];

function getDailyVerse(date = new Date()) {
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const base = new Date(2024, 0, 1);
  const localDaySeed = Math.floor((today - base) / 86400000);
  return dailyVerses[((localDaySeed % dailyVerses.length) + dailyVerses.length) % dailyVerses.length];
}

const generateMap = { wood: "fire", fire: "earth", earth: "metal", metal: "water", water: "wood" };
const controlMap = { wood: "earth", earth: "water", water: "fire", fire: "metal", metal: "wood" };

function sourceOf(element) {
  return Object.entries(generateMap).find(([, child]) => child === element)[0];
}

function controllerOf(element) {
  return Object.entries(controlMap).find(([, controlled]) => controlled === element)[0];
}

function label(key) {
  return i18n[currentLang][key] || key;
}

function applyPlaceSelection(place) {
  if (!place) return;
  form.elements.birthPlace.value = place.name;
  form.elements.birthLongitude.value = String(place.longitude);
  if (form.elements.birthTimezone) form.elements.birthTimezone.value = place.timezone || "+08:00";
}

function populateProvinceSelect() {
  if (!birthProvince) return;
  const current = birthProvince.value;
  birthProvince.innerHTML = `<option value="">${label("provincePlaceholder")}</option>`;
  Object.entries(provincePlaces).forEach(([key, group]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = group.label;
    birthProvince.appendChild(option);
  });
  if (current && provincePlaces[current]) birthProvince.value = current;
}

function populateCityCountySelect(provinceKey) {
  if (!birthCityCounty) return;
  const group = provincePlaces[provinceKey];
  birthCityCounty.innerHTML = `<option value="">${group ? label("cityCountyPlaceholder") : label("cityCountyPlaceholder")}</option>`;
  if (!group) return;
  group.places.forEach((place) => {
    const option = document.createElement("option");
    option.value = place.key;
    option.textContent = `${place.name}｜${Math.abs(place.longitude).toFixed(2)}${place.longitude >= 0 ? "E" : "W"}`;
    birthCityCounty.appendChild(option);
  });
}

function findProvincePlace(provinceKey, placeKey) {
  return provincePlaces[provinceKey]?.places.find((place) => place.key === placeKey);
}

function needLabel(value) {
  const map = {
    complexion: "needComplexion",
    style: "needStyle",
    sleep: "needSleep",
    posture: "needPosture",
    life: "needLife"
  };
  return label(map[value]) || value;
}

function daySeed(date = new Date()) {
  return Number(`${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`);
}

function pickDaily(list, offset = 0) {
  return list[(daySeed() + offset) % list.length];
}

function getDailyElement() {
  const today = new Date();
  const dayPillar = getDayPillar(today);
  return stemElement[dayPillar[0]];
}

function getDailySupportElement(baseElement) {
  return sourceOf(baseElement);
}

function getCurrentSolarTerm(date = new Date()) {
  const year = date.getFullYear();
  const todayKey = Number(`${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`);
  let current = solarTerms[solarTerms.length - 1];
  solarTerms.forEach((term) => {
    const termKey = Number(term.date.replace("-", ""));
    if (todayKey >= termKey) current = term;
  });
  const nextIndex = (solarTerms.indexOf(current) + 1) % solarTerms.length;
  const next = solarTerms[nextIndex];
  const nextYear = nextIndex === 0 ? year + 1 : year;
  const [nextMonth, nextDay] = next.date.split("-").map(Number);
  const nextDate = new Date(nextYear, nextMonth - 1, nextDay);
  const daysToNext = Math.max(0, Math.ceil((nextDate - new Date(year, date.getMonth(), date.getDate())) / 86400000));
  return { current, next, daysToNext };
}

function formatDateValue(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getTwelveOfficer(date) {
  const monthBranch = monthBranchBySolarMonth[getMonthIndex(date)];
  const dayPillar = getDayPillar(date);
  const dayBranch = dayPillar[1];
  const officerIndex = (branches.indexOf(dayBranch) - branches.indexOf(monthBranch) + 12) % 12;
  return twelveOfficers[officerIndex];
}

function renderAlmanacQuery(rawValue) {
  const normalized = normalizeCalendarDate(rawValue || getQueryDateValue() || formatDateValue(new Date()));
  if (!normalized) {
    queryResult.innerHTML = `<p class="query-hint">${currentLang === "zh" ? "请完整填写年月日，例如 2026 年 06 月 21 日。" : "Please complete year, month and day, e.g. 2026 / 06 / 21."}</p>`;
    return;
  }

  setQueryDateValue(normalized);
  queryDatePicker.value = normalized;
  const date = parseLocalDateTime(normalized, "00:00");
  const dayPillar = getDayPillar(date);
  const solar = getCurrentSolarTerm(date);
  const officer = getTwelveOfficer(date);
  const item = officerCopy[currentLang][officer.key];
  const solarName = currentLang === "zh" ? solar.current.zh : solar.current.en;
  const nextSolarName = currentLang === "zh" ? solar.next.zh : solar.next.en;
  const officerName = currentLang === "zh" ? `${officer.zh}日` : officer.en;
  const dateText = date.toLocaleDateString(currentLang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short"
  });

  queryResult.innerHTML = `
    <div class="query-result-head">
      <div>
        <span>${dateText}</span>
        <strong>${currentLang === "zh" ? `${dayPillar}日` : `${dayPillar} day`}</strong>
      </div>
      <em class="grade-pill grade-${item.tone}">${item.grade}</em>
    </div>
    <div class="query-result-grid">
      <p><b>${currentLang === "zh" ? "值日" : "Officer"}</b><span>${officerName}</span></p>
      <p><b>${currentLang === "zh" ? "节气" : "Solar Term"}</b><span>${solarName} · ${currentLang === "zh" ? `距${nextSolarName}约${solar.daysToNext}天` : `about ${solar.daysToNext} day(s) to ${nextSolarName}`}</span></p>
      <p><b>${currentLang === "zh" ? "宜" : "Do"}</b><span>${item.yi}</span></p>
      <p><b>${currentLang === "zh" ? "忌" : "Avoid"}</b><span>${item.ji}</span></p>
    </div>
    <p class="query-note">${item.note}</p>
  `;
}

function renderDailyRetention(element) {
  const lang = currentLang;
  const ritual = dailyRituals[lang][element];
  const study = studyCards[lang][element];
  const article = pickDaily(dailyArticles, 13);
  const cta = lang === "zh"
    ? `如果你想把今日建议与你的生辰、气色、体态和穿搭方向合在一起细看，可添加颜习社微信 ${OWNER_WECHAT}。`
    : `If you want to connect today's note with your birth profile, complexion, posture and style direction, add Yanxishe on WeChat: ${OWNER_WECHAT}.`;

  if (dailyRitualTitle) dailyRitualTitle.textContent = ritual.title;
  if (dailyRitualText) dailyRitualText.textContent = ritual.text;
  if (dailyRitualTip) dailyRitualTip.textContent = ritual.tip;
  if (studyCardElement) {
    studyCardElement.className = `element-${element}`;
    studyCardElement.textContent = lang === "zh" ? elementHan[element] : elementEn[element][0];
  }
  if (studyCardTitle) studyCardTitle.textContent = study.title;
  if (studyCardText) studyCardText.textContent = study.text;
  if (studyCardList) {
    studyCardList.innerHTML = study.list.map((item) => `<li>${item}</li>`).join("");
  }
  if (dailyArticleTitle) dailyArticleTitle.textContent = lang === "zh" ? article.zhTitle : article.enTitle;
  if (dailyArticleText) dailyArticleText.textContent = lang === "zh" ? article.zhText : article.enText;
  if (dailyArticleQuote) dailyArticleQuote.textContent = lang === "zh" ? article.zhQuote : article.enQuote;
  if (dailyArticleCta) dailyArticleCta.textContent = cta;
  if (dailyTestResult) {
    dailyTestResult.textContent = lang === "zh"
      ? "选一个今天最想靠近的状态。"
      : "Choose the state you want to move toward today.";
  }
}

function renderDaily() {
  const today = new Date();
  const lang = currentLang;
  const hex = pickDaily(hexagrams);
  const verse = getDailyVerse(today);
  const element = getDailyElement();
  const dayPillar = getDayPillar(today);
  const support = getDailySupportElement(element);
  const solar = getCurrentSolarTerm(today);
  const yi = [pickDaily(almanacPool[lang].yi, 1), pickDaily(almanacPool[lang].yi, 4), pickDaily(almanacPool[lang].yi, 7)];
  const ji = [pickDaily(almanacPool[lang].ji, 2), pickDaily(almanacPool[lang].ji, 5), pickDaily(almanacPool[lang].ji, 8)];
  const colorKeys = [support, element, generateMap[element]];

  dailyDate.textContent = today.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short"
  });
  dailyHexSymbol.textContent = hex.symbol;
  dailyHexagram.textContent = hex.name[lang];
  dailyHexText.textContent = hex.text[lang];
  dailyDayPillarText.textContent = lang === "zh" ? `${dayPillar}日` : `${dayPillar} day`;
  dailyYiText.textContent = yi.join(lang === "zh" ? "、" : ", ");
  dailyJiText.textContent = ji.join(lang === "zh" ? "、" : ", ");
  if (lang === "zh") {
    dailySolarTermText.textContent = `${solar.current.zh}｜${solarTermNotes.zh[solar.current.zh]} 距${solar.next.zh}约${solar.daysToNext}天`;
  } else {
    dailySolarTermText.textContent = `${solar.current.en} | ${solarTermNotes.en[solar.current.en]} About ${solar.daysToNext} day(s) to ${solar.next.en}`;
  }
  dailyColors.innerHTML = colorKeys.map((key) => {
    const name = lang === "zh" ? elementHan[key] : elementEn[key];
    return `<span class="daily-color-pill element-${key}"><i></i>${name}</span>`;
  }).join("");
  dailyColorText.textContent = dailyColorAdvice[lang][element];
  dailyPoem.textContent = lang === "zh"
    ? `${verse.zh} —— ${verse.zhSource}`
    : `${verse.en} — ${verse.enSource}`;
  renderDailyRetention(element);
  oracleResult.textContent = lang === "zh"
    ? "选择一个主题，抽取今日提示。"
    : "Choose a topic and draw today's note.";
}

function drawOracle() {
  const element = getDailyElement();
  const topic = oracleTopic.value || "wealth";
  const text = oracleCopy[currentLang][topic][element];
  const prefix = currentLang === "zh" ? "今日提示：" : "Today's note: ";
  oracleResult.textContent = `${prefix}${text}`;
}

function renderQin() {
  if (!qinMode || !qinResult || !qinTrackList) return;
  stopQinAudio(false);
  const mode = qinModes[qinMode.value] || qinModes.sleep;
  qinResult.textContent = mode[currentLang];
  qinTrackList.innerHTML = mode.tracks.map((trackKey) => {
    const track = qinTracks[trackKey];
    const title = currentLang === "zh" ? track.zhTitle : track.enTitle;
    const organ = currentLang === "zh" ? track.organZh : track.organEn;
    const use = currentLang === "zh" ? track.zhUse : track.enUse;
    return `
      <article class="qin-track">
        <div>
          <span>${track.tone}</span>
          <strong>${title}</strong>
          <em>${organ}</em>
        </div>
        <p>${use}</p>
        <small class="qin-audio-note">${label("qinOriginalAudio")}</small>
        <nav>
          <button class="qin-play" type="button" data-track="${trackKey}">${label("qinListen")}</button>
          <button class="qin-stop" type="button">${label("qinSearch")}</button>
        </nav>
      </article>
    `;
  }).join("");
}

function getQinContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!qinAudioState.ctx) qinAudioState.ctx = new AudioContextClass();
  return qinAudioState.ctx;
}

function stopQinAudio(updateButtons = true) {
  qinAudioState.timers.forEach((timer) => clearTimeout(timer));
  qinAudioState.timers = [];
  qinAudioState.activeKey = null;
  if (updateButtons && qinTrackList) {
    qinTrackList.querySelectorAll(".qin-play").forEach((button) => {
      button.classList.remove("is-playing");
      button.textContent = label("qinListen");
    });
  }
}

function playPluck(ctx, frequency, start, length = 2.8, volume = 0.09) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(frequency, start);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(980, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + length + 0.08);
}

function playQinTrack(trackKey, button) {
  const ctx = getQinContext();
  if (!ctx) return;
  stopQinAudio();
  const track = qinTracks[trackKey];
  const toneBase = { 角: 392, 徵: 523.25, 宫: 329.63, 商: 440, 羽: 293.66 };
  const base = toneBase[track.tone] || 329.63;
  const ratios = [1, 1.125, 1.25, 1.5, 1.333, 1.25, 1.125, 1];
  const startAt = ctx.currentTime + 0.08;
  ratios.forEach((ratio, index) => {
    playPluck(ctx, base * ratio, startAt + index * 2.25, index % 3 === 0 ? 3.4 : 2.6, index === 0 ? 0.08 : 0.055);
  });
  qinAudioState.activeKey = trackKey;
  if (button) {
    button.classList.add("is-playing");
    button.textContent = currentLang === "zh" ? "正在听" : "Playing";
  }
  qinAudioState.timers.push(setTimeout(() => stopQinAudio(), 20500));
}

function applyLanguage() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.title = currentLang === "zh" ? "东方颜习社｜八字画像" : "Oriental Vital Aesthetics | Bazi Portrait";
  langToggle.textContent = currentLang === "zh" ? "EN" : "中";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (i18n[currentLang][key]) node.textContent = i18n[currentLang][key];
  });
  document.querySelectorAll("[data-placeholder-zh]").forEach((node) => {
    node.placeholder = node.dataset[`placeholder${currentLang === "zh" ? "Zh" : "En"}`];
  });
  populateProvinceSelect();
  populateCityCountySelect(birthProvince?.value);
  renderDaily();
  renderQin();
  renderAlmanacQuery();
  if (lastReport) renderReport(lastReport.data, lastReport.bazi, lastReport.elements);
}

function ganzhi(index) {
  return `${stems[((index % 10) + 10) % 10]}${branches[((index % 12) + 12) % 12]}`;
}

function normalizeBirthDate(value) {
  const raw = String(value || "").trim();
  const compact = raw.replace(/\s+/g, "").replace(/[年月/.]/g, "-").replace(/日/g, "");
  let year;
  let month;
  let day;

  if (/^\d{8}$/.test(compact)) {
    year = Number(compact.slice(0, 4));
    month = Number(compact.slice(4, 6));
    day = Number(compact.slice(6, 8));
  } else {
    const match = compact.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!match) return null;
    year = Number(match[1]);
    month = Number(match[2]);
    day = Number(match[3]);
  }

  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  if (year < 1900 || year > new Date().getFullYear()) return null;

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function normalizeCalendarDate(value) {
  const raw = String(value || "").trim();
  const compact = raw.replace(/\s+/g, "").replace(/[年月/.]/g, "-").replace(/日/g, "");
  let year;
  let month;
  let day;

  if (/^\d{8}$/.test(compact)) {
    year = Number(compact.slice(0, 4));
    month = Number(compact.slice(4, 6));
    day = Number(compact.slice(6, 8));
  } else {
    const match = compact.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!match) return null;
    year = Number(match[1]);
    month = Number(match[2]);
    day = Number(match[3]);
  }

  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  if (year < 1900 || year > 2100) return null;

  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function normalizeBirthTime(value) {
  const raw = String(value || "").trim().replace(/\s+/g, "");
  let hour;
  let minute;

  if (/^\d{1,2}:\d{1,2}$/.test(raw)) {
    const parts = raw.split(":").map(Number);
    hour = parts[0];
    minute = parts[1];
  } else if (/^\d{3,4}$/.test(raw)) {
    const padded = raw.padStart(4, "0");
    hour = Number(padded.slice(0, 2));
    minute = Number(padded.slice(2, 4));
  } else {
    const match = raw.match(/^(\d{1,2})(点|時|时)(半|(\d{1,2})分?)?$/);
    if (!match) return null;
    hour = Number(match[1]);
    minute = match[3] === "半" ? 30 : Number(match[4] || 0);
  }

  if (!Number.isInteger(hour) || !Number.isInteger(minute)) return null;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatDateTemplate(value, mode = "zh") {
  const digits = digitsOnly(value).slice(0, 8);
  const y = digits.slice(0, 4);
  const m = digits.slice(4, 6);
  const d = digits.slice(6, 8);
  if (mode === "zh") {
    if (digits.length <= 4) return y;
    if (digits.length <= 6) return `${y}年${m}`;
    return `${y}年${m}月${d}日`;
  }
  if (digits.length <= 4) return y;
  if (digits.length <= 6) return `${y}-${m}`;
  return `${y}-${m}-${d}`;
}

function formatTimeTemplate(value) {
  const digits = digitsOnly(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
}

function attachDateTemplate(input, mode = "zh") {
  input.addEventListener("input", () => {
    const formatted = formatDateTemplate(input.value, mode);
    input.value = formatted;
  });
}

function attachTimeTemplate(input) {
  input.addEventListener("input", () => {
    input.value = formatTimeTemplate(input.value);
  });
}

function normalizeBirthInputs(data) {
  const rawYear = digitsOnly(data.birthYear);
  const rawMonth = digitsOnly(data.birthMonth);
  const rawDay = digitsOnly(data.birthDay);
  const rawHour = digitsOnly(data.birthHour);
  const rawMinute = digitsOnly(data.birthMinute);
  if (rawYear.length !== 4 || !rawMonth || !rawDay) {
    return {
      ok: false,
      message: currentLang === "zh" ? "请完整填写出生年月日，例如 1988 年 05 月 18 日。" : "Please complete birth year, month and day, e.g. 1988 / 05 / 18."
    };
  }
  if (!rawHour && !rawMinute) {
    return {
      ok: false,
      message: currentLang === "zh" ? "请完整填写出生时间，例如 09 时 30 分。" : "Please complete birth time, e.g. 09:30."
    };
  }
  const year = rawYear;
  const month = rawMonth.padStart(2, "0");
  const day = rawDay.padStart(2, "0");
  const hour = (rawHour || "0").padStart(2, "0");
  const minute = (rawMinute || "0").padStart(2, "0");
  const birthDate = normalizeBirthDate(`${year}-${month}-${day}`);
  const birthTime = normalizeBirthTime(`${hour}:${minute}`);
  if (!birthDate) {
    return {
      ok: false,
      message: currentLang === "zh" ? "请完整填写出生年月日，例如 1988 年 05 月 18 日。" : "Please complete birth year, month and day, e.g. 1988 / 05 / 18."
    };
  }
  if (!birthTime) {
    return {
      ok: false,
      message: currentLang === "zh" ? "请完整填写出生时间，例如 09 时 30 分。" : "Please complete birth time, e.g. 09:30."
    };
  }
  data.birthDate = birthDate;
  data.birthTime = birthTime;
  form.elements.birthYear.value = birthDate.slice(0, 4);
  form.elements.birthMonth.value = birthDate.slice(5, 7);
  form.elements.birthDay.value = birthDate.slice(8, 10);
  form.elements.birthDate.value = birthDate;
  form.elements.birthHour.value = birthTime.slice(0, 2);
  form.elements.birthMinute.value = birthTime.slice(3, 5);
  form.elements.birthTime.value = birthTime;
  return { ok: true, data };
}

function parseLocalDateTime(date, time) {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = (time || "00:00").split(":").map(Number);
  return new Date(year, month - 1, day, hour || 0, minute || 0);
}

function parseTimezoneOffsetMinutes(value) {
  const match = String(value || "").match(/^([+-])(\d{2}):(\d{2})$/);
  if (!match) return null;
  const sign = match[1] === "-" ? -1 : 1;
  return sign * (Number(match[2]) * 60 + Number(match[3]));
}

function dayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function equationOfTimeMinutes(date) {
  const b = (2 * Math.PI * (dayOfYear(date) - 81)) / 364;
  return 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
}

function getLongitudeFromData(data) {
  const typed = Number(data.birthLongitude);
  if (Number.isFinite(typed) && typed >= -180 && typed <= 180) return typed;
  const preset = placePresets[data.birthPlacePreset];
  return preset ? preset.longitude : null;
}

function applyTrueSolarTime(data) {
  const base = parseLocalDateTime(data.birthDate, data.birthTime || "00:00");
  const longitude = getLongitudeFromData(data);
  const timezoneMinutes = parseTimezoneOffsetMinutes(data.birthTimezone);
  const enabled = data.trueSolarMode !== "off";
  if (!enabled || longitude === null || timezoneMinutes === null) {
    return {
      base,
      solar: base,
      longitude,
      correctionMinutes: 0,
      equationMinutes: 0,
      longitudeMinutes: 0,
      used: false,
      reason: enabled ? "missing" : "off"
    };
  }

  const standardMeridian = timezoneMinutes / 4;
  const longitudeMinutes = (longitude - standardMeridian) * 4;
  const equationMinutes = equationOfTimeMinutes(base);
  const correctionMinutes = longitudeMinutes + equationMinutes;
  const solar = new Date(base.getTime() + correctionMinutes * 60000);
  return {
    base,
    solar,
    longitude,
    correctionMinutes,
    equationMinutes,
    longitudeMinutes,
    used: true,
    reason: "ok"
  };
}

function formatDateTimeForMeta(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days, date.getHours(), date.getMinutes());
}

function getSolarYear(date) {
  const year = date.getFullYear();
  const lichun = new Date(year, 1, 4, 10, 0);
  return date < lichun ? year - 1 : year;
}

function getYearPillar(date) {
  return ganzhi(getSolarYear(date) - 1984);
}

function getMonthIndex(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const cutoffs = [4, 6, 5, 5, 6, 6, 7, 8, 8, 8, 7, 7];
  let idx = m - 2;
  if (d < cutoffs[m - 1]) idx -= 1;
  return ((idx % 12) + 12) % 12;
}

function getMonthPillar(date, yearPillar) {
  const monthIndex = getMonthIndex(date);
  const startStem = monthStemStart[yearPillar[0]];
  const stem = stems[(startStem + monthIndex) % 10];
  return `${stem}${monthBranchBySolarMonth[monthIndex]}`;
}

function julianDay(date) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  const d = date.getDate();
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b - 1524;
}

function getDayPillar(date) {
  return ganzhi(julianDay(date) + 49);
}

function getHourBranch(hour) {
  if (hour === 23 || hour === 0) return "子";
  return branches[Math.floor((hour + 1) / 2) % 12];
}

function getHourPillar(hour, dayPillar) {
  const branch = getHourBranch(hour);
  const branchIndex = branches.indexOf(branch);
  const startStem = hourStemStart[dayPillar[0]];
  return `${stems[(startStem + branchIndex) % 10]}${branch}`;
}

function getBazi(input, time) {
  const data = typeof input === "object" ? input : {
    birthDate: input,
    birthTime: time,
    birthTimezone: "+08:00",
    trueSolarMode: "off",
    ziRule: "midnight"
  };
  const calibration = applyTrueSolarTime(data);
  const dt = calibration.solar;
  const year = getYearPillar(dt);
  const month = getMonthPillar(dt, year);
  const dayDate = data.ziRule === "ziStartNextDay" && dt.getHours() === 23 ? addDays(dt, 1) : dt;
  const day = getDayPillar(dayDate);
  const hour = getHourPillar(dt.getHours(), day);
  return {
    year,
    month,
    day,
    hour,
    meta: {
      baseDateTime: formatDateTimeForMeta(calibration.base),
      solarDateTime: formatDateTimeForMeta(dt),
      longitude: calibration.longitude,
      correctionMinutes: calibration.correctionMinutes,
      equationMinutes: calibration.equationMinutes,
      longitudeMinutes: calibration.longitudeMinutes,
      trueSolarUsed: calibration.used,
      trueSolarReason: calibration.reason,
      ziRule: data.ziRule || "midnight",
      ziDayAdjusted: dayDate.getDate() !== dt.getDate() || dayDate.getMonth() !== dt.getMonth() || dayDate.getFullYear() !== dt.getFullYear()
    }
  };
}

function countElements(pillars) {
  const counts = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  [pillars.year, pillars.month, pillars.day, pillars.hour].forEach((pillar) => {
    counts[stemElement[pillar[0]]] += 1;
    counts[branchElement[pillar[1]]] += 1;
  });
  return counts;
}

function dominantElements(counts) {
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function needCopy(need) {
  const zh = {
    complexion: "适合从睡眠节律、肩颈下颌紧张、表情习惯和气血感受做综合观察。",
    style: "适合先找你的稳定主色、补充色和需要避免的过度风格。",
    sleep: "适合优先观察晚间信息摄入、焦虑节律和恢复感。",
    posture: "适合把面部紧绷、肩颈、胸椎和呼吸状态连起来看。",
    life: "适合把当前选择、现实压力和自我消耗方式放在一起看。"
  };
  const en = {
    complexion: "It is useful to observe sleep rhythm, neck and jaw tension, facial habits and overall vitality together.",
    style: "It is useful to identify your stable base colors, supportive colors and styles to avoid overdoing.",
    sleep: "It is useful to first observe late-night information intake, anxiety rhythm and sense of recovery.",
    posture: "It is useful to connect facial tension with neck, shoulders, thoracic posture and breathing.",
    life: "It is useful to look at current choices, practical pressure and personal depletion patterns together."
  };
  return (currentLang === "zh" ? zh : en)[need] || "";
}

function dayMasterCopy(dayStem) {
  const element = stemElement[dayStem];
  const yinYangZh = ["甲", "丙", "戊", "庚", "壬"].includes(dayStem) ? "阳" : "阴";
  if (currentLang === "zh") {
    return `你的日主为 <b class="element-text element-${element}">${dayStem}${elementHan[element]}</b>，属于${yinYangZh}${elementHan[element]}。${dayMasterBase.zh[dayStem]}`;
  }
  return `Your Day Master is <b class="element-text element-${element}">${dayStem} ${elementEn[element]}</b>. ${dayMasterBase.en[dayStem]}`;
}

function renderPillar(labelText, pillar) {
  const stem = pillar[0];
  const branch = pillar[1];
  return `
    <div class="pillar-card">
      <span>${labelText}</span>
      <strong>
        <i class="element-chip element-${stemElement[stem]}">${stem}</i>
        <i class="element-chip element-${branchElement[branch]}">${branch}</i>
      </strong>
    </div>
  `;
}

function renderBars(elements) {
  return elementOrder.map((key) => {
    const value = elements[key];
    const pct = Math.max(8, value * 12.5);
    const name = currentLang === "zh" ? elementHan[key] : elementEn[key];
    return `<div class="bar-row element-${key}"><span>${name}</span><div><i style="width:${pct}%"></i></div><em>${value}</em></div>`;
  }).join("");
}

function colorAdvice(dayElement, weakest) {
  const noble = sourceOf(dayElement);
  const partner = dayElement;
  const balance = weakest;
  const output = generateMap[dayElement];
  const avoid = controllerOf(dayElement);

  if (currentLang === "zh") {
    return `
      <div class="color-advice">
        <div><span class="swatch element-${noble}"></span><p><b>贵人色</b>${colorNames.zh[noble]}。这类颜色像环境在托你，适合见客户、面试、重要沟通或希望被支持的时候。</p></div>
        <div><span class="swatch element-${partner}"></span><p><b>本命色</b>${colorNames.zh[partner]}。这类颜色与你的日主同气，适合日常建立稳定识别度。</p></div>
        <div><span class="swatch element-${balance}"></span><p><b>平衡色</b>${colorNames.zh[balance]}。当前画像里它相对不足，可以小面积加入，让状态更完整。</p></div>
        <div><span class="swatch element-${output}"></span><p><b>表达色</b>${colorNames.zh[output]}。适合拍摄、表达、展示作品时使用，但不要过量。</p></div>
        <div><span class="swatch element-${avoid}"></span><p><b>慎用色</b>${colorNames.zh[avoid]}。不是不能穿，而是不建议大面积长期使用，容易让人显累或气场被压住。</p></div>
      </div>
    `;
  }

  return `
    <div class="color-advice">
      <div><span class="swatch element-${noble}"></span><p><b>Support colors</b>${colorNames.en[noble]}. Use them for important meetings or when you want more support from the environment.</p></div>
      <div><span class="swatch element-${partner}"></span><p><b>Core colors</b>${colorNames.en[partner]}. They echo your Day Master and help build a stable personal signature.</p></div>
      <div><span class="swatch element-${balance}"></span><p><b>Balancing colors</b>${colorNames.en[balance]}. This element appears weaker in the preview; small accents can make the state feel more complete.</p></div>
      <div><span class="swatch element-${output}"></span><p><b>Expression colors</b>${colorNames.en[output]}. Useful for filming, speaking and presenting, but better in moderation.</p></div>
      <div><span class="swatch element-${avoid}"></span><p><b>Use carefully</b>${colorNames.en[avoid]}. Not forbidden, but avoid using them as a large long-term base if they make you look tired or suppressed.</p></div>
    </div>
  `;
}

function foodAdvice(weakest, strongest) {
  const weakNote = foodNotes[currentLang][weakest];
  const strongNote = foodNotes[currentLang][strongest];
  if (currentLang === "zh") {
    return `
      <p><b>可以多选择：</b>${weakNote.more}</p>
      <p><b>尽量减少：</b>${strongNote.less}</p>
      <p class="micro">饮食建议只作生活方式参考，不替代专业营养或医疗建议。真正适合你的饮食，还要看体质、过敏、疾病史和医生建议。</p>
    `;
  }
  return `
    <p><b>Consider more:</b> ${weakNote.more}</p>
    <p><b>Reduce:</b> ${strongNote.less}</p>
    <p class="micro">Food notes are lifestyle references only and do not replace nutrition or medical advice. Allergies, medical history and professional guidance come first.</p>
  `;
}

function portraitSentence(dayElement, strongest, weakest) {
  if (currentLang === "zh") {
    return `这份基础画像里，你不是单一的“${elementHan[dayElement]}”，而是以日主为骨、以${elementHan[strongest]}气为外显、以${elementHan[weakest]}气为需要照顾的地方。真正的调理，不是补一个标签，而是让气质、穿搭、作息和身体感受重新对齐。`;
  }
  return `In this basic portrait, you are not just "${elementEn[dayElement]}". Your Day Master forms the core, ${elementEn[strongest]} is more visible, and ${elementEn[weakest]} is the area that needs care. The point is not to chase a label, but to realign temperament, style, rhythm and body feeling.`;
}

function getCurrentAge(data) {
  const explicitAge = Number(data.age);
  if (explicitAge) return explicitAge;
  const birth = parseLocalDateTime(data.birthDate, data.birthTime || "00:00");
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const passedBirthday = now.getMonth() > birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate());
  if (!passedBirthday) age -= 1;
  return Math.max(age, 0);
}

function isYangStem(stem) {
  return ["甲", "丙", "戊", "庚", "壬"].includes(stem);
}

function getLuckDirection(data, yearPillar) {
  const gender = data.gender;
  const yangYear = isYangStem(yearPillar[0]);
  if (gender === "private") return 1;
  const forward = (gender === "male" && yangYear) || (gender === "female" && !yangYear);
  return forward ? 1 : -1;
}

function getLuckCycles(data, bazi) {
  const age = getCurrentAge(data);
  const direction = getLuckDirection(data, bazi.year);
  const monthIndex = stems.indexOf(bazi.month[0]) + branches.indexOf(bazi.month[1]);
  const startAge = 6;
  const cycles = Array.from({ length: 6 }, (_, idx) => {
    const stemIndex = stems.indexOf(bazi.month[0]) + direction * (idx + 1);
    const branchIndex = branches.indexOf(bazi.month[1]) + direction * (idx + 1);
    const pillar = `${stems[((stemIndex % 10) + 10) % 10]}${branches[((branchIndex % 12) + 12) % 12]}`;
    const from = startAge + idx * 10;
    const to = from + 9;
    return { pillar, from, to, active: age >= from && age <= to };
  });
  if (!cycles.some((cycle) => cycle.active)) {
    const nearest = Math.max(0, Math.min(cycles.length - 1, Math.floor((age - startAge) / 10)));
    cycles[nearest].active = true;
  }
  return cycles;
}

function getAnnualFlow() {
  const year = new Date().getFullYear();
  const pillar = ganzhi(year - 1984);
  const element = stemElement[pillar[0]];
  return { year, pillar, element };
}

function renderLuck(data, bazi) {
  const cycles = getLuckCycles(data, bazi);
  const active = cycles.find((cycle) => cycle.active);
  const annual = getAnnualFlow();
  const annualElement = currentLang === "zh" ? elementHan[annual.element] : elementEn[annual.element];
  const cycleHtml = cycles.map((cycle) => {
    const stem = cycle.pillar[0];
    const branch = cycle.pillar[1];
    return `
      <div class="luck-item ${cycle.active ? "is-active" : ""}">
        <span>${cycle.from}-${cycle.to}</span>
        <strong><i class="element-chip element-${stemElement[stem]}">${stem}</i><i class="element-chip element-${branchElement[branch]}">${branch}</i></strong>
      </div>
    `;
  }).join("");

  if (currentLang === "zh") {
    return `
      <p>当前基础大运参考为 <b>${active.from}-${active.to}岁</b> 区间，落在 <b>${active.pillar}</b>。这里先看十年气场的方向，不作绝对定论；完整起运岁数需要按节气和出生地进一步校正。</p>
      <div class="luck-list">${cycleHtml}</div>
      <p>今年流年为 <b>${annual.year} ${annual.pillar}</b>，流年主气偏 <b class="element-text element-${annual.element}">${annualElement}</b>。你可以把它理解为今年外部环境更容易触发的主题：它会影响节奏、选择和被看见的方式。</p>
    `;
  }
  return `
    <p>The current basic luck cycle is around age <b>${active.from}-${active.to}</b>, shown as <b>${active.pillar}</b>. This is a ten-year atmosphere reference; exact start age should be checked manually with solar terms and birth location.</p>
    <div class="luck-list">${cycleHtml}</div>
    <p>The annual flow is <b>${annual.year} ${annual.pillar}</b>, leaning toward <b class="element-text element-${annual.element}">${annualElement}</b>. Think of it as the external theme that can affect rhythm, choices and visibility this year.</p>
  `;
}

function fashionTips(dayElement, strongest, weakest) {
  const zh = {
    wood: "线条要有延展感：垂顺外套、自然腰线、轻薄层次会比厚重堆叠更适合。配饰不宜太硬，保留一点植物感和呼吸感。",
    fire: "需要一个视觉焦点：唇色、耳饰、围巾或上衣亮点都可以，但全身高饱和容易显燥。适合“一个亮点，其余收住”。",
    earth: "适合稳定质感：针织、麂皮感、棉麻和低饱和暖色能托住气场。避免全身过松过厚，容易显沉。",
    metal: "适合干净剪裁：衬衫、西装、直线条、简洁首饰会提升高级感。颜色和元素越少，越容易显贵。",
    water: "适合留白和层次：深色、柔软垂坠、微光泽材质都能形成气韵。避免全身太暗太松，精神感会被压低。"
  };
  const en = {
    wood: "Use elongated lines: fluid jackets, natural waistlines and light layers work better than heavy stacking. Keep accessories softer and breathable.",
    fire: "Create one focal point: lip color, earrings, scarf or a bright top detail. Too much saturation can feel restless; one highlight is enough.",
    earth: "Use stable textures: knit, suede-like, cotton-linen and muted warm tones. Avoid outfits that are both loose and heavy.",
    metal: "Use clean tailoring: shirts, suits, straight lines and simple jewelry. Fewer elements often look more refined.",
    water: "Use space and layering: deep colors, soft drape and slight sheen create atmosphere. Avoid going too dark and loose at the same time."
  };
  const core = (currentLang === "zh" ? zh : en)[dayElement];
  const support = currentLang === "zh"
    ? `当前画像里${elementHan[weakest]}气较弱，可用小面积${colorNames.zh[weakest]}补一点层次；${elementHan[strongest]}气较显，不必全身都强化它。`
    : `${elementEn[weakest]} appears weaker, so small accents in ${colorNames.en[weakest]} can add balance; ${elementEn[strongest]} is already visible, so avoid over-amplifying it.`;
  return `<p>${core}</p><p>${support}</p>`;
}

function faceNotes(dayElement, weakest) {
  const zh = {
    wood: "木象脸部容易先看线条舒展度：眉眼、太阳穴、下颌到肩颈是否紧。状态不稳时，表情会显绷，眼神容易疲。",
    fire: "火象脸部容易先看气色和明亮度：眼神、唇色、面部红热感。状态过载时，容易显急、显燥、显熬夜。",
    earth: "土象脸部容易先看承托和浮重感：苹果肌、法令区、下颌轮廓。状态低时，容易显沉、显肿或缺少轻盈。",
    metal: "金象脸部容易先看清爽度和边界：皮肤干润、鼻唇线条、轮廓干净度。状态紧时，容易显硬、显冷、显疲惫。",
    water: "水象脸部容易先看精神感和流动感：眼下、发际、面部阴影。状态弱时，容易显冷、显散、显没睡够。"
  };
  const en = {
    wood: "Wood facial-state notes start with ease of lines: brows, temples, jaw and neck. When off-balance, expression can look tense and eyes tired.",
    fire: "Fire facial-state notes start with brightness: eyes, lip color and flushed heat. When overloaded, the face can look rushed, dry or sleep-deprived.",
    earth: "Earth facial-state notes start with support and heaviness: cheeks, nasolabial area and jawline. When low, the face can look heavy or puffy.",
    metal: "Metal facial-state notes start with clarity and boundaries: skin moisture, nose-lip lines and clean contours. When tense, the face can look hard or tired.",
    water: "Water facial-state notes start with spirit and flow: under-eyes, hairline and facial shadows. When depleted, the face can look cold, scattered or unrested."
  };
  const balance = currentLang === "zh"
    ? `这次需要照顾的是${elementHan[weakest]}气。面部护理上，先从睡眠、肩颈、呼吸、饮水和表情习惯入手，比急着追求单一项目更稳。`
    : `The element needing care is ${elementEn[weakest]}. For facial care, start with sleep, neck and shoulders, breathing, hydration and expression habits before chasing one single treatment.`;
  return `<p>${(currentLang === "zh" ? zh : en)[dayElement]}</p><p>${balance}</p>`;
}

function renderReport(data, bazi, elements) {
  lastReport = { data, bazi, elements };
  const c = copy[currentLang];
  const sorted = dominantElements(elements);
  const strongest = sorted[0][0];
  const weakest = sorted[sorted.length - 1][0];
  const labels = c.pillarLabels;
  const dayStem = bazi.day[0];
  const dayElement = stemElement[dayStem];

  report.innerHTML = `
    <div class="panel-head">
      <h2>${c.reportTitle(data.name)}</h2>
      <span>${c.freePreview}</span>
    </div>
    <div class="report-content">
      <div class="bazi-grid">
        ${renderPillar(labels[0], bazi.year)}
        ${renderPillar(labels[1], bazi.month)}
        ${renderPillar(labels[2], bazi.day)}
        ${renderPillar(labels[3], bazi.hour)}
      </div>

      <p class="micro">${c.disclaimer(data.birthPlace, data.birthTimezone)}</p>
      <p class="micro">${c.calibration(bazi.meta)}</p>

      <div class="report-block">
        <h3>${c.sections[0]}</h3>
        <p>${currentLang === "zh" ? "四柱为这份画像的骨架：年柱看早期环境和外在背景，月柱看成长节律，日柱看自身气质，时柱看后天表达与未来展开。" : "The four pillars form the structure of this portrait: year shows early environment, month shows growth rhythm, day shows personal temperament, and hour shows later expression."}</p>
      </div>

      <div class="report-block">
        <h3>${c.sections[1]}</h3>
        ${renderLuck(data, bazi)}
      </div>

      <div class="report-block">
        <h3>${c.sections[2]}</h3>
        <p>${dayMasterCopy(dayStem)}</p>
        <p>${portraitSentence(dayElement, strongest, weakest)}</p>
      </div>

      <div class="report-block">
        <h3>${c.sections[3]}</h3>
        <p>${personalityDetail[currentLang][dayElement]}</p>
        <p>${c.profile(strongest, weakest, data.mainNeed)}</p>
      </div>

      <div class="report-block">
        <h3>${c.sections[4]}</h3>
        <p>${c.strongestWeakest(strongest, weakest)} ${elementCopy[currentLang][strongest]} ${elementBalance[currentLang][weakest]}</p>
        <div class="bars">${renderBars(elements)}</div>
      </div>

      <div class="report-block">
        <h3>${c.sections[5]}</h3>
        <p>${bodyNotes[currentLang][weakest]}</p>
        ${foodAdvice(weakest, strongest)}
      </div>

      <div class="report-block">
        <h3>${c.sections[6]}</h3>
        ${colorAdvice(dayElement, weakest)}
      </div>

      <div class="report-block">
        <h3>${c.sections[7]}</h3>
        ${fashionTips(dayElement, strongest, weakest)}
      </div>

      <div class="report-block">
        <h3>${c.sections[8]}</h3>
        ${faceNotes(dayElement, weakest)}
      </div>

      <div class="report-block">
        <h3>${c.sections[9]}</h3>
        <p>${elementAesthetic[currentLang][strongest]}</p>
        <p>${currentLang === "zh" ? "你最想了解的是" : "Your main focus is"} “${needLabel(data.mainNeed)}”。${needCopy(data.mainNeed)} ${currentLang === "zh" ? "你填写的当前状态是" : "Your recent state"}：“${data.currentState}”。</p>
      </div>

      <div class="locked">
        <div>
          <h3>${c.lockedTitle}</h3>
          <p>${c.lockedText}</p>
          <p class="wechat-line">${c.addWechat}：<b>${OWNER_WECHAT}</b></p>
        </div>
        <button type="button" class="pay-button" id="copyOrder">${c.copyOrder}</button>
      </div>

      <div class="pay-note">${c.payNote}</div>
    </div>
  `;

  document.querySelector("#copyOrder").addEventListener("click", async () => {
    await navigator.clipboard.writeText(c.orderText(data));
    alert(c.copied);
  });
}

function generatePreview() {
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  delete data["form-name"];
  delete data["bot-field"];
  const normalized = normalizeBirthInputs(data);
  if (!normalized.ok) {
    submitStatus.textContent = normalized.message;
    return;
  }
  const bazi = getBazi(data);
  const elements = countElements(bazi);
  renderReport(data, bazi, elements);
  submitStatus.textContent = currentLang === "zh"
    ? "基础画像已生成。若想继续把个人状态整理得更清楚，可在报告末尾复制资料并添加颜习社微信。"
    : "Basic portrait generated. If you want a fuller personal note, copy the profile at the end and add Yanxishe on WeChat.";
}

previewBtn.addEventListener("click", generatePreview);

function keepNumericPart(input, maxLength) {
  input.addEventListener("input", () => {
    input.value = digitsOnly(input.value).slice(0, maxLength);
  });
}

function setupSegmentedNumberInputs(inputs, lengths, onFullPaste) {
  inputs.forEach((input, index) => {
    keepNumericPart(input, lengths[index]);
    input.addEventListener("input", () => {
      const value = digitsOnly(input.value);
      if (onFullPaste && index === 0 && value.length > lengths[index]) {
        onFullPaste(value);
        return;
      }
      if (value.length >= lengths[index] && inputs[index + 1]) {
        inputs[index + 1].focus();
        inputs[index + 1].select();
      }
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace" && !input.value && inputs[index - 1]) {
        inputs[index - 1].focus();
        inputs[index - 1].select();
      }
    });
    input.addEventListener("blur", () => {
      const value = digitsOnly(input.value);
      if (value && index > 0) input.value = value.padStart(lengths[index], "0");
    });
    input.addEventListener("paste", (event) => {
      if (!onFullPaste || index !== 0) return;
      const text = event.clipboardData?.getData("text") || "";
      const digits = digitsOnly(text);
      if (digits.length >= lengths.reduce((sum, length) => sum + length, 0)) {
        event.preventDefault();
        onFullPaste(digits);
      }
    });
  });
}

const birthDateParts = [form.elements.birthYear, form.elements.birthMonth, form.elements.birthDay];
const birthTimeParts = [form.elements.birthHour, form.elements.birthMinute];
const queryDateParts = [queryYear, queryMonth, queryDay];

function getQueryDateValue() {
  const year = digitsOnly(queryYear.value);
  const month = digitsOnly(queryMonth.value);
  const day = digitsOnly(queryDay.value);
  if (year.length !== 4 || !month || !day) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function setQueryDateValue(value) {
  const normalized = normalizeCalendarDate(value);
  if (!normalized) return;
  queryYear.value = normalized.slice(0, 4);
  queryMonth.value = normalized.slice(5, 7);
  queryDay.value = normalized.slice(8, 10);
  queryDateInput.value = normalized;
}

setupSegmentedNumberInputs(birthDateParts, [4, 2, 2], (digits) => {
  const clean = digits.slice(0, 8);
  form.elements.birthYear.value = clean.slice(0, 4);
  form.elements.birthMonth.value = clean.slice(4, 6);
  form.elements.birthDay.value = clean.slice(6, 8);
  form.elements.birthDay.focus();
});

setupSegmentedNumberInputs(birthTimeParts, [2, 2], (digits) => {
  const clean = digits.slice(0, 4).padStart(4, "0");
  form.elements.birthHour.value = clean.slice(0, 2);
  form.elements.birthMinute.value = clean.slice(2, 4);
  form.elements.birthMinute.focus();
});

setupSegmentedNumberInputs(queryDateParts, [4, 2, 2], (digits) => {
  const clean = digits.slice(0, 8);
  queryYear.value = clean.slice(0, 4);
  queryMonth.value = clean.slice(4, 6);
  queryDay.value = clean.slice(6, 8);
  queryDay.focus();
});

birthProvince.addEventListener("change", () => {
  populateCityCountySelect(birthProvince.value);
});

birthCityCounty.addEventListener("change", () => {
  const place = findProvincePlace(birthProvince.value, birthCityCounty.value);
  applyPlaceSelection(place);
  if (birthPlacePreset) birthPlacePreset.value = "";
});

birthPlacePreset.addEventListener("change", () => {
  const preset = placePresets[birthPlacePreset.value];
  if (!preset) return;
  applyPlaceSelection(preset);
  if (preset.timezone && form.elements.birthTimezone) {
    form.elements.birthTimezone.value = preset.timezone;
  }
});

birthDatePickBtn.addEventListener("click", () => {
  const normalized = normalizeBirthDate(`${form.elements.birthYear.value}-${form.elements.birthMonth.value}-${form.elements.birthDay.value}`);
  if (normalized) birthDatePicker.value = normalized;
  if (typeof birthDatePicker.showPicker === "function") {
    birthDatePicker.showPicker();
  } else {
    birthDatePicker.focus();
    birthDatePicker.click();
  }
});

birthDatePicker.addEventListener("change", () => {
  if (birthDatePicker.value) {
    form.elements.birthYear.value = birthDatePicker.value.slice(0, 4);
    form.elements.birthMonth.value = birthDatePicker.value.slice(5, 7);
    form.elements.birthDay.value = birthDatePicker.value.slice(8, 10);
    form.elements.birthDate.value = birthDatePicker.value;
  }
});

queryDatePickBtn.addEventListener("click", () => {
  const normalized = normalizeCalendarDate(getQueryDateValue());
  if (normalized) queryDatePicker.value = normalized;
  if (typeof queryDatePicker.showPicker === "function") {
    queryDatePicker.showPicker();
  } else {
    queryDatePicker.focus();
    queryDatePicker.click();
  }
});

queryDatePicker.addEventListener("change", () => {
  if (queryDatePicker.value) {
    setQueryDateValue(queryDatePicker.value);
    renderAlmanacQuery(queryDatePicker.value);
  }
});

queryAlmanacBtn.addEventListener("click", () => {
  renderAlmanacQuery();
});

queryDateParts.forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      renderAlmanacQuery();
    }
  });
});

function formatProfileForCopy(data) {
  return [
    `姓名/昵称：${data.name || ""}`,
    `性别：${data.gender || ""}`,
    `年龄：${data.age || ""}`,
    `出生日期：${data.birthDate || ""}`,
    `出生时间：${data.birthTime || ""}`,
    `出生地点：${data.birthPlace || ""}`,
    `出生地经度：${data.birthLongitude || ""}`,
    `出生地时区：${data.birthTimezone || ""}`,
    `真太阳时：${data.trueSolarMode === "off" ? "暂不校准" : "按经度自动校准"}`,
    `子时规则：${data.ziRule === "ziStartNextDay" ? "子初换日（23:00起算次日）" : "子正换日（00:00起算次日）"}`,
    `现居地：${data.currentPlace || ""}`,
    `关注点：${needLabel(data.mainNeed)}`,
    `最近状态：${data.currentState || ""}`,
  ].join("\n");
}

filloutBtn.addEventListener("click", async () => {
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  delete data["bot-field"];
  const normalized = normalizeBirthInputs(data);
  if (!normalized.ok) {
    submitStatus.textContent = normalized.message;
    return;
  }

  try {
    await navigator.clipboard.writeText(`${formatProfileForCopy(data)}\n\n颜习社微信 / WeChat：${OWNER_WECHAT}`);
    submitStatus.textContent = currentLang === "zh"
      ? `资料已复制。若想继续整理个人状态，可添加颜习社微信 ${OWNER_WECHAT} 后发送。`
      : `Profile copied. If you want a fuller personal note, add Yanxishe on WeChat ${OWNER_WECHAT} and send it.`;
  } catch {
    submitStatus.textContent = currentLang === "zh"
      ? `若想继续整理个人状态，可添加颜习社微信 ${OWNER_WECHAT}，并发送页面里的出生资料。`
      : `If you want a fuller personal note, add Yanxishe on WeChat ${OWNER_WECHAT} and send the birth profile from this page.`;
  }
});

oracleBtn.addEventListener("click", drawOracle);
qinMode.addEventListener("change", renderQin);
document.querySelectorAll("[data-test]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.test;
    const element = getDailyElement();
    const prefix = currentLang === "zh"
      ? `今日${elementHan[element]}气提示：`
      : `Today's ${elementEn[element]} note: `;
    dailyTestResult.textContent = `${prefix}${dailyTestCopy[currentLang][key]}`;
  });
});
qinTrackList.addEventListener("click", (event) => {
  const playButton = event.target.closest(".qin-play");
  const stopButton = event.target.closest(".qin-stop");
  if (playButton) {
    playQinTrack(playButton.dataset.track, playButton);
  }
  if (stopButton) {
    stopQinAudio();
  }
});
window.addEventListener("beforeunload", () => stopQinAudio(false));

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "zh" ? "en" : "zh";
  localStorage.setItem("ova_lang", currentLang);
  applyLanguage();
});

applyLanguage();
