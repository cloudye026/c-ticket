// 舱位映射
export const classMapping: { [key: string]: { chinese: string; english: string } } = {
  Y: { chinese: "经济舱", english: "ECONOMY" },
  C: { chinese: "公务舱", english: "BUSINESS" },
};

// 国内航站楼选项
export const terminalOptions = [
  { value: "-", label: "-" },
  { value: "T1", label: "T1" },
  { value: "T2", label: "T2" },
  { value: "T3", label: "T3" },
  { value: "T4", label: "T4" },
  { value: "T5", label: "T5" },
  { value: "T3A", label: "T3A" },
  { value: "大兴机场", label: "大兴机场" },
  { value: "虹桥T1", label: "虹桥T1" },
  { value: "虹桥T2", label: "虹桥T2" },
  { value: "浦东T1", label: "浦东T1" },
  { value: "浦东T2", label: "浦东T2" },
  { value: "白云T1", label: "白云T1" },
  { value: "白云T2", label: "白云T2" },
  { value: "宝安T3", label: "宝安T3" },
  { value: "双流T1", label: "双流T1" },
  { value: "双流T2", label: "双流T2" },
  { value: "天河T1", label: "天河T1" },
  { value: "天河T2", label: "天河T2" },
  { value: "长水", label: "长水" },
  { value: "咸阳T1", label: "咸阳T1" },
  { value: "咸阳T2", label: "咸阳T2" },
  { value: "咸阳T3", label: "咸阳T3" },
];

// 托运行李选项
export const baggageOptions = [
  { value: "-", label: "-" },
  { value: "5KG", label: "5KG" },
  { value: "10KG", label: "10KG" },
  { value: "15KG", label: "15KG" },
  { value: "20KG", label: "20KG" },
  { value: "25KG", label: "25KG" },
  { value: "30KG", label: "30KG" },
  { value: "35KG", label: "35KG" },
  { value: "40KG", label: "40KG" },
  { value: "45KG", label: "45KG" },
  { value: "50KG", label: "50KG" },
  { value: "1PC", label: "1PC" },
  { value: "2PC", label: "2PC" },
  { value: "3PC", label: "3PC" },
  { value: "23KG", label: "23KG" },
];