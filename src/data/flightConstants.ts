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
  { value: "I", label: "I" },
  { value: "D", label: "D" },
  { value: "长水", label: "长水" },
 
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
