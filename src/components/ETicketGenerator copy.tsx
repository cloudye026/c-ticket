import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  DatePicker,
  Space,
  Typography,
  Select,
  TimePicker,
  Divider,
  AutoComplete,
} from "antd";
import type { Dayjs } from "dayjs";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import "./ETicketGenerator.css";
import { IATA_LOGO_DATA_URI } from '../constants/iataLogo';

// 使用本地思源黑体字体
Font.register({
  family: "NotoSansSC",
  src: "/fonts/NotoSansSC-Regular.ttf",
  fontStyle: "normal",
  fontWeight: "normal",
});
const { Title, Text: AntText } = Typography;
const { Option } = Select;

// 格式化机场代码显示
const formatAirportCode = (airportInfo: string) => {
  // 匹配格式："城市机场 代码-英文名"
  const match = airportInfo?.match(/^(.+?)\s+([A-Z]{3})-(.+)$/);
  if (match) {
    const [, cityAirport, code, englishName] = match;
    return `${cityAirport}\n${code}-${englishName.toUpperCase()}`;
  }
  return airportInfo;
};

// 格式化航司信息显示
// const formatAirlineInfo = (airlineInfo: string) => {
//   // 如果包含中文和英文，分行显示
//   const match = airlineInfo?.match(/^(.+?)\s+([A-Z][A-Z\s]+)$/);
//   if (match) {
//     const [, chinese, english] = match;
//     return `${chinese}\n${english}`;
//   }
//   return airlineInfo;
// };

// 舱位映射
const classMapping: { [key: string]: { chinese: string; english: string } } = {
  Y: { chinese: "经济舱", english: "ECONOMY" },
  C: { chinese: "公务舱", english: "BUSINESS" },
};

// 国内航站楼选项
const terminalOptions = [
  { value: "-", label: "-" },
  { value: "T1", label: "T1" },
  { value: "T2", label: "T2" },
  { value: "T3", label: "T3" },
  { value: "T4", label: "T4" },
  { value: "1号航站楼", label: "1号航站楼" },
  { value: "2号航站楼", label: "2号航站楼" },
  { value: "3号航站楼", label: "3号航站楼" },
  { value: "4号航站楼", label: "4号航站楼" },
  { value: "A航站楼", label: "A航站楼" },
  { value: "B航站楼", label: "B航站楼" },
  { value: "C航站楼", label: "C航站楼" },
  { value: "D航站楼", label: "D航站楼" },
  { value: "E航站楼", label: "E航站楼" },
  { value: "F航站楼", label: "F航站楼" },
  { value: "首都机场T1", label: "首都机场T1" },
  { value: "首都机场T2", label: "首都机场T2" },
  { value: "首都机场T3", label: "首都机场T3" },
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
const baggageOptions = [
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

// 航空公司映射
const airlineMapping: { [key: string]: string } = {
  中国国际航空: "AIR CHINA",
  中国东方航空: "CHINA EASTERN",
  中国南方航空: "CHINA SOUTHERN",
  海南航空: "HAINAN AIRLINES",
  厦门航空: "XIAMEN AIR",
  深圳航空: "SHENZHEN AIRLINES",
  山东航空: "SHANDONG AIRLINES",
  四川航空: "SICHUAN AIRLINES",
  天津航空: "TIANJIN AIRLINES",
  春秋航空: "SPRING AIRLINES",
  吉祥航空: "JUNEYAO AIRLINES",
  华夏航空: "CHINA EXPRESS",
  西部航空: "WEST AIR",
  联合航空: "CHINA UNITED AIRLINES",
  河北航空: "HEBEI AIRLINES",
  长龙航空: "LOONG AIR",
  奥凯航空: "OKAY AIRWAYS",
  首都航空: "BEIJING CAPITAL AIRLINES",
  江西航空: "JIANGXI AIR",
  九元航空: "9 AIR",
  中国货运航空: "AIR CHINA CARGO",
  东海航空: "DONGHAI AIRLINES",
  祥鹏航空: "LUCKY AIR",
  西藏航空: "TIBET AIRLINES",
  昆明航空: "KUNMING AIRLINES",
  福州航空: "FUZHOU AIRLINES",
  北部湾航空: "GX AIRLINES",
  青岛航空: "QINGDAO AIRLINES",
  桂林航空: "GUILIN AIRLINES",
  乌鲁木齐航空: "URUMQI AIR",
  成都航空: "CHENGDU AIRLINES",
  江南航空: "JIANGNAN AIRLINES",
  长安航空: "CHANGAN AIRLINES",
  中国联合航空: "CHINA UNITED AIRLINES",
  瑞丽航空: "RUILI AIRLINES",
};

// 航空公司选项数组
const airlineOptions = Object.keys(airlineMapping).map((airline) => ({
  value: airline,
  label: airline,
}));

// 添加浏览器打印功能
const handlePrint = () => {
  window.print();
};

const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 20,
    fontSize: 10,
    fontFamily: "NotoSansSC",
  },
  header: {
    // borderBottom: "2px solid #000",
    paddingBottom: 15,
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: "auto",
  },
  titleSection: {
    borderTop: "1px solid #CCC",
    paddingBottom: 15,
    marginTop: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    fontFamily: "NotoSansSC",
  },
  titleEn: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "NotoSansSC",
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingBottom: 5,
    // borderBottom: "1px solid #eee",
  },
  infoLeft: {
    flex: 1,
    paddingRight: 10,
  },
  infoRight: {
    flex: 1,
  },
  table: {
    // border: "2px solid #000",
    borderTop: "2px solid #CCC",
    borderBottom: "1px solid #CCC",
    paddingBottom: 15,
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: "row",
    // backgroundColor: "#f5f5f5",
    // borderBottom: "2px solid #000",
    fontWeight: "bold",
    fontSize: 8,
  },
  tableRow: {
    flexDirection: "row",
    fontSize: 9,
  },
  tableCell: {
    padding: 8,
    // borderRight: "1px solid #000",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  tableColOrigin: {
    flex: 2,
    textAlign: "left",
    paddingLeft: 10,
  },
  tableColOther: {
    flex: 2,
  },
  noticeSection: {
    marginTop: 20,
    paddingTop: 15,
    // borderTop: "1px solid #000",
  },
  noticeTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noticeItem: {
    marginBottom: 10,
    fontSize: 8,
    lineHeight: 1.4,
    textAlign: "left",
  },
});

// 导出 PDF
const ETicketPDF = ({ flightData }: { flightData: FormattedFlightData }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Image src={IATA_LOGO_DATA_URI} style={pdfStyles.logo} />
      </View>
      <View style={pdfStyles.titleSection}>
        <Text style={pdfStyles.title}>{"电子客票行程单"}</Text>
        <Text style={pdfStyles.titleEn}>ITINERARY</Text>
      </View>
      <View style={pdfStyles.infoSection}>
        <View style={pdfStyles.infoRow}>
          <View style={pdfStyles.infoLeft}>
            <Text>
              航司记录编号 AIR BOOKING REF: {flightData.airlineRecordLocator}
            </Text>
          </View>
          <View style={pdfStyles.infoRight}>
            <Text>订座记录编号 BOOKING REF: {flightData.bookingRef}</Text>
          </View>
        </View>

        <View style={pdfStyles.infoRow}>
          <View style={pdfStyles.infoLeft}>
            <Text>旅客姓名 NAME: {flightData.passengerName}</Text>
          </View>
          <View style={pdfStyles.infoRight}>
            <Text>票号 ETKT NBR: {flightData.eticketNbr}</Text>
          </View>
        </View>

        <View style={pdfStyles.infoRow}>
          <View style={pdfStyles.infoLeft}>
            <Text>旅行证件号码 ID NUMBER: {flightData.idNumber}</Text>
          </View>
          <View style={pdfStyles.infoRight}>
            <Text>联票 CONJ NBR: {flightData.conjNbr}</Text>
          </View>
        </View>

        <View style={pdfStyles.infoRow}>
          <View style={pdfStyles.infoLeft}>
            <Text>
              出票航空公司 ISSUING AIRLINE: {flightData.issuingAirlineCN || ""}
            </Text>
            <Text>{flightData.issuingAirlineEN || ""}</Text>
          </View>
          <View style={pdfStyles.infoRight}>
            <Text>出票时间 DATE OF ISSUE: {flightData.dateOfIssue}</Text>
          </View>
        </View>
      </View>
      <View style={pdfStyles.table}>
        <View style={pdfStyles.tableHeader}>
          <View style={[pdfStyles.tableCell, pdfStyles.tableColOrigin]}>
            <Text>始发地/目的地{"\n"}ORIGIN/DES</Text>
          </View>
          <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
            <Text>航班号{"\n"}FLIGHT</Text>
          </View>
          <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
            <Text>舱位{"\n"}CLASS</Text>
          </View>
          <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
            <Text>日期{"\n"}DATE</Text>
          </View>
          <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
            <Text>起飞时间{"\n"}DEPTIME</Text>
          </View>
          <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
            <Text>到达时间{"\n"}ARRTIME</Text>
          </View>
          <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
            <Text>托运行李{"\n"}BAGGAGE</Text>
          </View>
          <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
            <Text>航站楼{"\n"}TERMINAL</Text>
          </View>
        </View>

        {flightData.segments &&
          flightData.segments.length > 0 &&
          flightData.segments.map((segment, index) => (
            <View key={index} style={pdfStyles.tableRow}>
              <View style={[pdfStyles.tableCell, pdfStyles.tableColOrigin]}>
                <Text>
                  {formatAirportCode(segment.origin || "")?.split("\n")[0] ||
                    ""}
                  {"\n"}
                  {formatAirportCode(segment.origin || "")?.split("\n")[1] ||
                    ""}
                  {"\n"}
                  {formatAirportCode(segment.destination || "")?.split(
                    "\n"
                  )[0] || ""}
                  {"\n"}
                  {formatAirportCode(segment.destination || "")?.split(
                    "\n"
                  )[1] || ""}
                </Text>
              </View>
              <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
                <Text>{segment.flightNumber || ""}</Text>
              </View>
              <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
                <Text>
                  {classMapping[segment.flightClass]?.chinese ||
                    segment.flightClass ||
                    ""}
                  {"\n"}
                  {classMapping[segment.flightClass]?.english ||
                    segment.flightClass ||
                    ""}
                </Text>
              </View>
              <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
                <Text>
                  {segment.date?.split("\n")[0] || ""}
                  {"\n"}
                  {segment.date?.split("\n")[1] || ""}
                </Text>
              </View>
              <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
                <Text>{segment.depTime || ""}</Text>
              </View>
              <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
                <Text>{segment.arrTime || ""}</Text>
              </View>
              {/* 托运行李 */}
              <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
                <Text>{segment.baggage || ""}</Text>
              </View>
              <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
                <Text>
                  {segment.terminal1 || "-"} {segment.terminal2 || "-"}
                </Text>
              </View>
            </View>
          ))}
      </View>

      <View style={pdfStyles.noticeSection}>
        <Text style={pdfStyles.noticeTitle}>须知 NOTICE:</Text>
        <View style={pdfStyles.noticeItem}>
          <Text>
            · 请您再次核对航班信息；{"\n"}Please check the flight information
            again;
          </Text>
        </View>
        <View style={pdfStyles.noticeItem}>
          <Text>
            · 联程客票须按顺序使用，不得跳段使用；{"\n"}The connecting ticket
            shall be used in sequence and shall not be used in skip section;
          </Text>
        </View>
        <View style={pdfStyles.noticeItem}>
          <Text>
            · 请确认您的护照有效期至少在半年以上；{"\n"}Please confirm that your
            passport is valid for at least half a year;
          </Text>
        </View>
        <View style={pdfStyles.noticeItem}>
          <Text>
            · 国际航班请您至少在航班起飞前3小时到达机场，并且办理乘机手续；
            {"\n"}For international flights, please arrive at the airport at
            least 3 hours before departure and check in;
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

interface FlightSegment {
  origin: string;
  destination: string;
  flightNumber: string;
  flightClass: string;
  date: Dayjs | null;
  depTime: Dayjs | null;
  arrTime: Dayjs | null;
  baggage: string;
  terminal1: string;
  terminal2: string;
}

interface FlightData {
  airlineRecordLocator: string;
  bookingRef: string;
  passengerName: string;
  eticketNbr: string;
  idNumber: string;
  conjNbr: string;
  issuingAirlineCN: string;
  issuingAirlineEN: string;
  dateOfIssue: Dayjs | null;
  segments: FlightSegment[];
}

interface FormattedFlightSegment {
  origin: string;
  destination: string;
  flightNumber: string;
  flightClass: string;
  date: string;
  depTime: string;
  arrTime: string;
  baggage: string;
  terminal1: string;
  terminal2: string;
}

interface FormattedFlightData {
  airlineRecordLocator: string;
  bookingRef: string;
  passengerName: string;
  eticketNbr: string;
  idNumber: string;
  conjNbr: string;
  issuingAirlineCN: string;
  issuingAirlineEN: string;
  dateOfIssue: string;
  segments: FormattedFlightSegment[];
}

const ETicketGenerator: React.FC = () => {
  const [form] = Form.useForm();
  const [flightData, setFlightData] = useState<FormattedFlightData | null>(
    null
  );
  const [showTicket, setShowTicket] = useState(false);
  const [airlineSearchOptions, setAirlineSearchOptions] =
    useState(airlineOptions);

  // 处理航空公司搜索
  const handleAirlineSearch = (value: string) => {
    const filteredOptions = airlineOptions.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    setAirlineSearchOptions(filteredOptions);
  };

  // 处理航空公司选择，自动填充英文名称
  const handleAirlineSelect = (value: string) => {
    const englishName = airlineMapping[value] || "";
    form.setFieldsValue({ issuingAirlineEN: englishName });
  };

  // 处理航空公司中文名称变化，自动填充英文名称
  const handleAirlineChange = (value: string) => {
    const englishName = airlineMapping[value] || "";
    form.setFieldsValue({ issuingAirlineEN: englishName });
  };

  const onFinish = (values: FlightData) => {
    try {
      const formattedData: FormattedFlightData = {
        ...values,
        dateOfIssue: values.dateOfIssue?.format("DDMMMYY").toUpperCase() || "",
        segments: (values.segments || []).map((segment) => ({
          ...segment,
          date: segment.date
            ? `${segment.date.format("MM月DD日")}\n${segment.date
                .format("DD MMM")
                .toUpperCase()}`
            : "",
          depTime: segment.depTime?.format("HH:mm") || "",
          arrTime: segment.arrTime?.format("HH:mm") || "",
        })),
      };
      setFlightData(formattedData);
      setShowTicket(true);
    } catch (error) {
      console.error("生成客票时出错:", error);
      // 可以在这里添加用户友好的错误提示
    }
  };

  const generateTicket = () => {
    if (!flightData) {
      console.log("flightData is null, cannot generate ticket");
      return null;
    }

    console.log("Generating ticket with data:", flightData);

    return (
      <div className="eticket-container">
        <div className="eticket-header">
          <img src={IATA_LOGO_DATA_URI} alt="IATA" className="iata-logo" />
        </div>

        <div className="ticket-title-section">
          <div className="ticket-title">
            <Title level={2} className="chinese-title">
              电子客票行程单
            </Title>
            <Title level={2} className="english-title">
              ITINERARY
            </Title>
          </div>
        </div>

        <div className="ticket-info-section">
          <div className="info-row">
            <div className="info-left">
              <AntText>航司记录编号 AIR BOOKING REF: </AntText>
              <AntText strong>{flightData.airlineRecordLocator}</AntText>
            </div>
            <div className="info-right">
              <AntText>订座记录编号 BOOKING REF: </AntText>
              <AntText strong>{flightData.bookingRef}</AntText>
            </div>
          </div>

          <div className="info-row">
            <div className="info-left">
              <AntText>旅客姓名 NAME: </AntText>
              <AntText strong>{flightData.passengerName}</AntText>
            </div>
            <div className="info-right">
              <AntText>票号 ETKT NBR: </AntText>
              <AntText strong>{flightData.eticketNbr}</AntText>
            </div>
          </div>

          <div className="info-row">
            <div className="info-left">
              <AntText>旅行证件号码 ID NUMBER: </AntText>
              <AntText strong>{flightData.idNumber}</AntText>
            </div>
            <div className="info-right">
              <AntText>联票 CONJ NBR: </AntText>
              <AntText strong>{flightData.conjNbr}</AntText>
            </div>
          </div>

          <div className="info-row">
            <div className="info-left">
              <AntText>出票航空公司 ISSUING AIRLINE: </AntText>
              <div>
                <AntText strong>{flightData.issuingAirlineCN || ""}</AntText>
              </div>
              <div>
                <AntText strong>{flightData.issuingAirlineEN || ""}</AntText>
              </div>
            </div>
            <div className="info-right">
              <AntText>出票时间 DATE OF ISSUE: </AntText>
              <AntText strong>{flightData.dateOfIssue}</AntText>
            </div>
          </div>
        </div>

        <div className="flight-table">
          <div className="table-header">
            <div className="col-origin">
              始发地/目的地
              <br />
              ORIGIN/DES
            </div>
            <div className="col-flight">
              航班号
              <br />
              FLIGHT
            </div>
            <div className="col-class">
              舱位
              <br />
              CLASS
            </div>
            <div className="col-date">
              日期
              <br />
              DATE
            </div>
            <div className="col-deptime">
              起飞时间
              <br />
              DEPTIME
            </div>
            <div className="col-arrtime">
              到达时间
              <br />
              ARRTIME
            </div>
            <div className="col-baggage">
              托运行李
              <br />
              BAGGAGE
            </div>
            <div className="col-terminal">
              航站楼
              <br />
              TERMINAL
            </div>
          </div>

          {flightData.segments &&
            flightData.segments.length > 0 &&
            flightData.segments.map((segment, index) => (
              <div key={index} className="table-row">
                <div className="col-origin">
                  {formatAirportCode(segment.origin || "")
                    ?.split("\n")
                    .map((line, lineIndex) => (
                      <div key={`origin-${index}-${lineIndex}`}>{line}</div>
                    ))}
                  {formatAirportCode(segment.destination || "")
                    ?.split("\n")
                    .map((line, lineIndex) => (
                      <div key={`dest-${index}-${lineIndex}`}>{line}</div>
                    ))}
                </div>
                <div className="col-flight">{segment.flightNumber || ""}</div>
                <div className="col-class">
                  <div>
                    {classMapping[segment.flightClass]?.chinese ||
                      segment.flightClass ||
                      ""}
                  </div>
                  <div>
                    {classMapping[segment.flightClass]?.english ||
                      segment.flightClass ||
                      ""}
                  </div>
                </div>
                <div className="col-date">
                  <div>{segment.date?.split("\n")[0] || ""}</div>
                  <div>{segment.date?.split("\n")[1] || ""}</div>
                </div>
                <div className="col-deptime">{segment.depTime || ""}</div>
                <div className="col-arrtime">{segment.arrTime || ""}</div>
                <div className="col-baggage">{segment.baggage || ""}</div>
                <div className="col-terminal">
                  {segment.terminal1 || "-"} {segment.terminal2 || "-"}
                </div>
              </div>
            ))}
        </div>

        <div className="notice-section">
          <Title className="notice-item" level={4}>
            须知 NOTICE:
          </Title>
          <div className="notice-item">
            <AntText>· 请您再次核对航班信息；</AntText>
            <br />
            <AntText>Please check the flight information again;</AntText>
          </div>
          <div className="notice-item">
            <AntText>· 联程客票须按顺序使用，不得跳段使用；</AntText>
            <br />
            <AntText>
              The connecting ticket shall be used in sequence and shall not be
              used in skip section;
            </AntText>
          </div>
          <div className="notice-item">
            <AntText>· 请确认您的护照有效期至少在半年以上；</AntText>
            <br />
            <AntText>
              Please confirm that your passport is valid for at least half a
              year;
            </AntText>
          </div>
          <div className="notice-item">
            <AntText>
              · 国际航班请您至少在航班起飞前3小时到达机场，并且办理乘机手续；
            </AntText>
            <br />
            <AntText>
              For international flights, please arrive at the airport at least 3
              hours before departure and check in;
            </AntText>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="eticket-generator">
      {/* 主表单卡片：包含所有输入字段和操作按钮 */}
      <Card title="ETERM电子客票生成器" className="form-card">
        {/* 主表单：使用垂直布局，提交时调用onFinish函数 */}
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* 表单字段网格布局 */}
          <div className="form-grid">
            <Form.Item
              label="航司记录编号"
              name="airlineRecordLocator"
              rules={[{ required: true, message: "请输入航司记录编号" }]}
            >
              <Input placeholder="例: QLPXMR" />
            </Form.Item>

            <Form.Item
              label="订座记录编号"
              name="bookingRef"
              rules={[{ required: true, message: "请输入订座记录编号" }]}
            >
              <Input placeholder="例: HT6E3T" />
            </Form.Item>

            <Form.Item
              label="旅客姓名"
              name="passengerName"
              rules={[{ required: true, message: "请输入旅客姓名" }]}
            >
              <Input placeholder="例: 黄吉华" />
            </Form.Item>

            <Form.Item
              label="电子客票号"
              name="eticketNbr"
              rules={[{ required: true, message: "请输入电子客票号" }]}
            >
              <Input placeholder="例: 989295869152" />
            </Form.Item>

            <Form.Item
              label="证件号码"
              name="idNumber"
              rules={[{ message: "请输入证件号码" }]}
            >
              <Input placeholder="证件号码" />
            </Form.Item>

            <Form.Item label="联票号" name="conjNbr">
              <Input placeholder="联票号（可选）" />
            </Form.Item>

            <Form.Item
              label="出票航空公司（中文）"
              name="issuingAirlineCN"
              rules={[{ required: true, message: "请输入出票航空公司" }]}
            >
              <AutoComplete
                options={airlineSearchOptions}
                placeholder="例: 江西航空"
                onSearch={handleAirlineSearch}
                onSelect={handleAirlineSelect}
                onChange={handleAirlineChange}
                filterOption={false}
                allowClear
              />
            </Form.Item>

            <Form.Item label="出票航空公司（英文）" name="issuingAirlineEN">
              <Input
                placeholder="例: JIANGXI AIR"
                disabled
                style={{ backgroundColor: "#f5f5f5" }}
              />
            </Form.Item>

            <Form.Item
              label="出票日期"
              name="dateOfIssue"
              rules={[{ required: true, message: "请选择出票日期" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          {/* 航班信息分割线 */}
          <Divider orientation="left">航班行程信息</Divider>

          {/* 动态航段列表：支持多航段添加和删除 */}
          <Form.List name="segments" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Card key={key} size="small" style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <h4>航段 {index + 1}</h4>
                      {fields.length > 1 && (
                        <Button
                          danger
                          size="small"
                          onClick={() => remove(name)}
                        >
                          删除航段
                        </Button>
                      )}
                    </div>
                    <div className="form-grid">
                      <Form.Item
                        {...restField}
                        label="出发地"
                        name={[name, "origin"]}
                        rules={[{ required: true, message: "请输入出发地" }]}
                      >
                        <Input placeholder="例: 南昌昌北 KHN-NANCHANG" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        label="目的地"
                        name={[name, "destination"]}
                        rules={[{ required: true, message: "请输入目的地" }]}
                      >
                        <Input placeholder="例: 北京大兴 PEK-BEIJING" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        label="航班号"
                        name={[name, "flightNumber"]}
                        rules={[{ required: true, message: "请输入航班号" }]}
                      >
                        <Input placeholder="例: RY8865" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        label="舱位"
                        name={[name, "flightClass"]}
                        rules={[{ required: true, message: "请选择舱位" }]}
                      >
                        <Select placeholder="选择舱位">
                          <Option value="Y">Y - 经济舱</Option>
                          <Option value="C">C - 公务舱</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        label="航班日期"
                        name={[name, "date"]}
                        rules={[{ required: true, message: "请选择航班日期" }]}
                      >
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        label="起飞时间"
                        name={[name, "depTime"]}
                        rules={[{ required: true, message: "请选择起飞时间" }]}
                      >
                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        label="到达时间"
                        name={[name, "arrTime"]}
                        rules={[{ required: true, message: "请选择到达时间" }]}
                      >
                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        label="托运行李"
                        name={[name, "baggage"]}
                      >
                        <Select placeholder="选择托运行李" defaultValue="20KG">
                          {baggageOptions.map((option) => (
                            <Option key={option.value} value={option.value}>
                              {option.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        label="航站楼1"
                        name={[name, "terminal1"]}
                      >
                        <Select placeholder="选择航站楼" defaultValue="-">
                          {terminalOptions.map((option) => (
                            <Option key={option.value} value={option.value}>
                              {option.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        label="航站楼2"
                        name={[name, "terminal2"]}
                      >
                        <Select placeholder="选择航站楼" defaultValue="-">
                          {terminalOptions.map((option) => (
                            <Option key={option.value} value={option.value}>
                              {option.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </Card>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    添加航段
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                生成电子客票
              </Button>
              {showTicket && (
                <>
                  <Button onClick={() => setShowTicket(false)}>隐藏客票</Button>
                  <Button onClick={handlePrint} type="default">
                    浏览器打印 (中文完整)
                  </Button>
                  {flightData && (
                    <PDFDownloadLink
                      document={<ETicketPDF flightData={flightData} />}
                      fileName={`电子客票-${
                        flightData.passengerName || "unknown"
                      }-${
                        flightData.segments && flightData.segments.length > 0
                          ? flightData.segments
                              .map((s) => s.flightNumber || "")
                              .filter(Boolean)
                              .join("-") || "flight"
                          : "flight"
                      }.pdf`}
                      style={{ textDecoration: "none" }}
                    >
                      {({ loading, error }) => {
                        if (error) {
                          console.error("PDF生成错误:", error);
                          return (
                            <Button type="default" danger>
                              PDF生成失败
                            </Button>
                          );
                        }
                        return (
                          <Button type="default" loading={loading}>
                            {loading ? "生成PDF中..." : "导出PDF (中英对照)"}
                          </Button>
                        );
                      }}
                    </PDFDownloadLink>
                  )}
                </>
              )}
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {showTicket && flightData && (
        <Card className="ticket-card">{generateTicket()}</Card>
      )}
    </div>
  );
};

export default ETicketGenerator;
