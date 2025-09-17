// 机场选项接口定义
export interface AirportOption {
  value: string;
  label: string;
  city: string;
  name: string;
  code: string;
  pinyin: string;
  searchText: string;
}

// 机场数据接口
interface Airport {
  name: string;
  code: string;
  pinyin: string;
  display: string;
}

interface CityAirports {
  city: string;
  airports: Airport[];
}

// 机场数据
export const airportData: CityAirports[] = [
  {
    city: "北京",
    airports: [
      {
        name: "北京首都",
        code: "PEK",
        pinyin: "BEIJING",
        display: "北京首都 PEK-BEIJING",
      },
      {
        name: "北京大兴",
        code: "PKX",
        pinyin: "BEIJING",
        display: "北京大兴 PKX-BEIJING",
      },
    ],
  },
  {
    city: "上海",
    airports: [
      {
        name: "上海浦东",
        code: "PVG",
        pinyin: "SHANGHAI",
        display: "上海浦东 PVG-SHANGHAI",
      },
      {
        name: "上海虹桥",
        code: "SHA",
        pinyin: "SHANGHAI",
        display: "上海虹桥 SHA-SHANGHAI",
      },
    ],
  },
  {
    city: "广州",
    airports: [
      {
        name: "广州白云",
        code: "CAN",
        pinyin: "GUANGZHOU",
        display: "广州白云 CAN-GUANGZHOU",
      },
    ],
  },
  {
    city: "深圳",
    airports: [
      {
        name: "深圳宝安",
        code: "SZX",
        pinyin: "SHENZHEN",
        display: "深圳宝安 SZX-SHENZHEN",
      },
    ],
  },
  {
    city: "成都",
    airports: [
      {
        name: "成都双流",
        code: "CTU",
        pinyin: "CHENGDU",
        display: "成都双流 CTU-CHENGDU",
      },
      {
        name: "成都天府",
        code: "TFU",
        pinyin: "CHENGDU",
        display: "成都天府 TFU-CHENGDU",
      },
    ],
  },
  {
    city: "重庆",
    airports: [
      {
        name: "重庆江北",
        code: "CKG",
        pinyin: "CHONGQING",
        display: "重庆江北 CKG-CHONGQING",
      },
    ],
  },
  {
    city: "西安",
    airports: [
      {
        name: "西安咸阳",
        code: "XIY",
        pinyin: "XIAN",
        display: "西安咸阳 XIY-XIAN",
      },
    ],
  },
  {
    city: "杭州",
    airports: [
      {
        name: "杭州萧山",
        code: "HGH",
        pinyin: "HANGZHOU",
        display: "杭州萧山 HGH-HANGZHOU",
      },
    ],
  },
  {
    city: "南京",
    airports: [
      {
        name: "南京禄口",
        code: "NKG",
        pinyin: "NANJING",
        display: "南京禄口 NKG-NANJING",
      },
    ],
  },
  {
    city: "武汉",
    airports: [
      {
        name: "武汉天河",
        code: "WUH",
        pinyin: "WUHAN",
        display: "武汉天河 WUH-WUHAN",
      },
    ],
  },
  {
    city: "昆明",
    airports: [
      {
        name: "昆明长水",
        code: "KMG",
        pinyin: "KUNMING",
        display: "昆明长水 KMG-KUNMING",
      },
    ],
  },
  {
    city: "厦门",
    airports: [
      {
        name: "厦门高崎",
        code: "XMN",
        pinyin: "XIAMEN",
        display: "厦门高崎 XMN-XIAMEN",
      },
    ],
  },
  {
    city: "青岛",
    airports: [
      {
        name: "青岛流亭",
        code: "TAO",
        pinyin: "QINGDAO",
        display: "青岛流亭 TAO-QINGDAO",
      },
    ],
  },
  {
    city: "大连",
    airports: [
      {
        name: "大连周水子",
        code: "DLC",
        pinyin: "DALIAN",
        display: "大连周水子 DLC-DALIAN",
      },
    ],
  },
  {
    city: "沈阳",
    airports: [
      {
        name: "沈阳桃仙",
        code: "SHE",
        pinyin: "SHENYANG",
        display: "沈阳桃仙 SHE-SHENYANG",
      },
    ],
  },
  {
    city: "长春",
    airports: [
      {
        name: "长春龙嘉",
        code: "CGQ",
        pinyin: "CHANGCHUN",
        display: "长春龙嘉 CGQ-CHANGCHUN",
      },
    ],
  },
  {
    city: "哈尔滨",
    airports: [
      {
        name: "哈尔滨太平",
        code: "HRB",
        pinyin: "HAERBIN",
        display: "哈尔滨太平 HRB-HAERBIN",
      },
    ],
  },
  {
    city: "天津",
    airports: [
      {
        name: "天津滨海",
        code: "TSN",
        pinyin: "TIANJIN",
        display: "天津滨海 TSN-TIANJIN",
      },
    ],
  },
  {
    city: "济南",
    airports: [
      {
        name: "济南遥墙",
        code: "TNA",
        pinyin: "JINAN",
        display: "济南遥墙 TNA-JINAN",
      },
    ],
  },
  {
    city: "郑州",
    airports: [
      {
        name: "郑州新郑",
        code: "CGO",
        pinyin: "ZHENGZHOU",
        display: "郑州新郑 CGO-ZHENGZHOU",
      },
    ],
  },
  {
    city: "太原",
    airports: [
      {
        name: "太原武宿",
        code: "TYN",
        pinyin: "TAIYUAN",
        display: "太原武宿 TYN-TAIYUAN",
      },
    ],
  },
  {
    city: "石家庄",
    airports: [
      {
        name: "石家庄正定",
        code: "SJW",
        pinyin: "SHIJIAZHUANG",
        display: "石家庄正定 SJW-SHIJIAZHUANG",
      },
    ],
  },
  {
    city: "呼和浩特",
    airports: [
      {
        name: "呼和浩特白塔",
        code: "HET",
        pinyin: "HUHEHAOTE",
        display: "呼和浩特白塔 HET-HUHEHAOTE",
      },
    ],
  },
  {
    city: "乌鲁木齐",
    airports: [
      {
        name: "乌鲁木齐地窝堡",
        code: "URC",
        pinyin: "WULUMUQI",
        display: "乌鲁木齐地窝堡 URC-WULUMUQI",
      },
    ],
  },
  {
    city: "拉萨",
    airports: [
      {
        name: "拉萨贡嘎",
        code: "LXA",
        pinyin: "LASA",
        display: "拉萨贡嘎 LXA-LASA",
      },
    ],
  },
  {
    city: "银川",
    airports: [
      {
        name: "银川河东",
        code: "INC",
        pinyin: "YINCHUAN",
        display: "银川河东 INC-YINCHUAN",
      },
    ],
  },
  {
    city: "兰州",
    airports: [
      {
        name: "兰州中川",
        code: "LHW",
        pinyin: "LANZHOU",
        display: "兰州中川 LHW-LANZHOU",
      },
    ],
  },
  {
    city: "西宁",
    airports: [
      {
        name: "西宁曹家堡",
        code: "XNN",
        pinyin: "XINING",
        display: "西宁曹家堡 XNN-XINING",
      },
    ],
  },
  {
    city: "南昌",
    airports: [
      {
        name: "南昌昌北",
        code: "KHN",
        pinyin: "NANCHANG",
        display: "南昌昌北 KHN-NANCHANG",
      },
    ],
  },
  {
    city: "福州",
    airports: [
      {
        name: "福州长乐",
        code: "FOC",
        pinyin: "FUZHOU",
        display: "福州长乐 FOC-FUZHOU",
      },
    ],
  },
  {
    city: "海口",
    airports: [
      {
        name: "海口美兰",
        code: "HAK",
        pinyin: "HAIKOU",
        display: "海口美兰 HAK-HAIKOU",
      },
    ],
  },
  {
    city: "三亚",
    airports: [
      {
        name: "三亚凤凰",
        code: "SYX",
        pinyin: "SANYA",
        display: "三亚凤凰 SYX-SANYA",
      },
    ],
  },
  {
    city: "南宁",
    airports: [
      {
        name: "南宁吴圩",
        code: "NNG",
        pinyin: "NANNING",
        display: "南宁吴圩 NNG-NANNING",
      },
    ],
  },
  {
    city: "桂林",
    airports: [
      {
        name: "桂林两江",
        code: "KWL",
        pinyin: "GUILIN",
        display: "桂林两江 KWL-GUILIN",
      },
    ],
  },
  {
    city: "贵阳",
    airports: [
      {
        name: "贵阳龙洞堡",
        code: "KWE",
        pinyin: "GUIYANG",
        display: "贵阳龙洞堡 KWE-GUIYANG",
      },
    ],
  },
  {
    city: "长沙",
    airports: [
      {
        name: "长沙黄花",
        code: "CSX",
        pinyin: "CHANGSHA",
        display: "长沙黄花 CSX-CHANGSHA",
      },
    ],
  },
  {
    city: "无锡",
    airports: [
      {
        name: "无锡硕放",
        code: "WUX",
        pinyin: "WUXI",
        display: "苏南无锡硕放 WUX-WUXI",
      },
    ],
  },
  // 国际城市
  {
    city: "东京",
    airports: [
      {
        name: "东京成田",
        code: "NRT",
        pinyin: "TOKYO",
        display: "东京成田 NRT-TOKYO",
      },
      {
        name: "东京羽田",
        code: "HND",
        pinyin: "TOKYO",
        display: "东京羽田 HND-TOKYO",
      },
    ],
  },
  {
    city: "首尔",
    airports: [
      {
        name: "首尔仁川",
        code: "ICN",
        pinyin: "SEOUL",
        display: "首尔仁川 ICN-SEOUL",
      },
      {
        name: "首尔金浦",
        code: "GMP",
        pinyin: "SEOUL",
        display: "首尔金浦 GMP-SEOUL",
      },
    ],
  },
  {
    city: "新加坡",
    airports: [
      {
        name: "新加坡樟宜",
        code: "SIN",
        pinyin: "SINGAPORE",
        display: "新加坡樟宜 SIN-SINGAPORE",
      },
    ],
  },
  {
    city: "曼谷",
    airports: [
      {
        name: "曼谷素万那普",
        code: "BKK",
        pinyin: "BANGKOK",
        display: "曼谷素万那普 BKK-BANGKOK",
      },
      {
        name: "曼谷廊曼",
        code: "DMK",
        pinyin: "BANGKOK",
        display: "曼谷廊曼 DMK-BANGKOK",
      },
    ],
  },
  {
    city: "吉隆坡",
    airports: [
      {
        name: "吉隆坡国际",
        code: "KUL",
        pinyin: "KUALALUMPUR",
        display: "吉隆坡国际 KUL-KUALALUMPUR",
      },
    ],
  },
  {
    city: "雅加达",
    airports: [
      {
        name: "雅加达苏加诺哈达",
        code: "CGK",
        pinyin: "JAKARTA",
        display: "雅加达苏加诺哈达 CGK-JAKARTA",
      },
    ],
  },
  {
    city: "马尼拉",
    airports: [
      {
        name: "马尼拉尼诺阿基诺",
        code: "MNL",
        pinyin: "MANILA",
        display: "马尼拉尼诺阿基诺 MNL-MANILA",
      },
    ],
  },
  {
    city: "胡志明市",
    airports: [
      {
        name: "胡志明市新山一",
        code: "SGN",
        pinyin: "HOCHIMINH",
        display: "胡志明市新山一 SGN-HOCHIMINH",
      },
    ],
  },
  {
    city: "河内",
    airports: [
      {
        name: "河内内排",
        code: "HAN",
        pinyin: "HANOI",
        display: "河内内排 HAN-HANOI",
      },
    ],
  },
  {
    city: "伦敦",
    airports: [
      {
        name: "伦敦希思罗",
        code: "LHR",
        pinyin: "LONDON",
        display: "伦敦希思罗 LHR-LONDON",
      },
      {
        name: "伦敦盖特威克",
        code: "LGW",
        pinyin: "LONDON",
        display: "伦敦盖特威克 LGW-LONDON",
      },
    ],
  },
  {
    city: "巴黎",
    airports: [
      {
        name: "巴黎戴高乐",
        code: "CDG",
        pinyin: "PARIS",
        display: "巴黎戴高乐 CDG-PARIS",
      },
      {
        name: "巴黎奥利",
        code: "ORY",
        pinyin: "PARIS",
        display: "巴黎奥利 ORY-PARIS",
      },
    ],
  },
  {
    city: "法兰克福",
    airports: [
      {
        name: "法兰克福国际",
        code: "FRA",
        pinyin: "FRANKFURT",
        display: "法兰克福国际 FRA-FRANKFURT",
      },
    ],
  },
  {
    city: "阿姆斯特丹",
    airports: [
      {
        name: "阿姆斯特丹史基浦",
        code: "AMS",
        pinyin: "AMSTERDAM",
        display: "阿姆斯特丹史基浦 AMS-AMSTERDAM",
      },
    ],
  },
  {
    city: "苏黎世",
    airports: [
      {
        name: "苏黎世国际",
        code: "ZUR",
        pinyin: "ZURICH",
        display: "苏黎世国际 ZUR-ZURICH",
      },
    ],
  },
  {
    city: "纽约",
    airports: [
      {
        name: "纽约肯尼迪",
        code: "JFK",
        pinyin: "NEWYORK",
        display: "纽约肯尼迪 JFK-NEWYORK",
      },
      {
        name: "纽约拉瓜迪亚",
        code: "LGA",
        pinyin: "NEWYORK",
        display: "纽约拉瓜迪亚 LGA-NEWYORK",
      },
      {
        name: "纽约纽瓦克",
        code: "EWR",
        pinyin: "NEWYORK",
        display: "纽约纽瓦克 EWR-NEWYORK",
      },
    ],
  },
  {
    city: "洛杉矶",
    airports: [
      {
        name: "洛杉矶国际",
        code: "LAX",
        pinyin: "LOSANGELES",
        display: "洛杉矶国际 LAX-LOSANGELES",
      },
    ],
  },
  {
    city: "旧金山",
    airports: [
      {
        name: "旧金山国际",
        code: "SFO",
        pinyin: "SANFRANCISCO",
        display: "旧金山国际 SFO-SANFRANCISCO",
      },
    ],
  },
  {
    city: "芝加哥",
    airports: [
      {
        name: "芝加哥奥黑尔",
        code: "ORD",
        pinyin: "CHICAGO",
        display: "芝加哥奥黑尔 ORD-CHICAGO",
      },
    ],
  },
  {
    city: "西雅图",
    airports: [
      {
        name: "西雅图塔科马",
        code: "SEA",
        pinyin: "SEATTLE",
        display: "西雅图塔科马 SEA-SEATTLE",
      },
    ],
  },
  {
    city: "温哥华",
    airports: [
      {
        name: "温哥华国际",
        code: "YVR",
        pinyin: "VANCOUVER",
        display: "温哥华国际 YVR-VANCOUVER",
      },
    ],
  },
  {
    city: "多伦多",
    airports: [
      {
        name: "多伦多皮尔逊",
        code: "YYZ",
        pinyin: "TORONTO",
        display: "多伦多皮尔逊 YYZ-TORONTO",
      },
    ],
  },
  {
    city: "悉尼",
    airports: [
      {
        name: "悉尼金斯福德史密斯",
        code: "SYD",
        pinyin: "SYDNEY",
        display: "悉尼金斯福德史密斯 SYD-SYDNEY",
      },
    ],
  },
  {
    city: "墨尔本",
    airports: [
      {
        name: "墨尔本国际",
        code: "MEL",
        pinyin: "MELBOURNE",
        display: "墨尔本国际 MEL-MELBOURNE",
      },
    ],
  },
  {
    city: "迪拜",
    airports: [
      {
        name: "迪拜国际",
        code: "DXB",
        pinyin: "DUBAI",
        display: "迪拜国际 DXB-DUBAI",
      },
    ],
  },
  {
    city: "多哈",
    airports: [
      {
        name: "多哈哈马德",
        code: "DOH",
        pinyin: "DOHA",
        display: "多哈哈马德 DOH-DOHA",
      },
    ],
  },
  {
    city: "香港",
    airports: [
      {
        name: "香港国际",
        code: "HKG",
        pinyin: "HONGKONG",
        display: "香港国际 HKG-HONGKONG",
      },
    ],
  },
  {
    city: "澳门",
    airports: [
      {
        name: "澳门国际",
        code: "MFM",
        pinyin: "MACAU",
        display: "澳门国际 MFM-MACAU",
      },
    ],
  },
  {
    city: "台北",
    airports: [
      {
        name: "台北桃园",
        code: "TPE",
        pinyin: "TAIPEI",
        display: "台北桃园 TPE-TAIPEI",
      },
      {
        name: "台北松山",
        code: "TSA",
        pinyin: "TAIPEI",
        display: "台北松山 TSA-TAIPEI",
      },
    ],
  },
  {
    city: "高雄",
    airports: [
      {
        name: "高雄小港",
        code: "KHH",
        pinyin: "KAOHSIUNG",
        display: "高雄小港 KHH-KAOHSIUNG",
      },
    ],
  },
];

// 扁平化机场数据用于搜索
export const flatAirportOptions: AirportOption[] = airportData.reduce(
  (acc: AirportOption[], cityData) => {
    cityData.airports.forEach((airport) => {
      acc.push({
        value: airport.display,
        label: airport.display,
        city: cityData.city,
        name: airport.name,
        code: airport.code,
        pinyin: airport.pinyin,
        searchText:
          `${cityData.city}${airport.name}${airport.code}${airport.pinyin}`.toLowerCase(),
      });
    });
    return acc;
  },
  []
);