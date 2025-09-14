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
import iataLogo from "../images/IATA.jpg";

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
const formatAirlineInfo = (airlineInfo: string) => {
  // 如果包含中文和英文，分行显示
  const match = airlineInfo?.match(/^(.+?)\s+([A-Z][A-Z\s]+)$/);
  if (match) {
    const [, chinese, english] = match;
    return `${chinese}\n${english}`;
  }
  return airlineInfo;
};

// 舱位映射
const classMapping: { [key: string]: { chinese: string; english: string } } = {
  Y: { chinese: "经济舱", english: "ECONOMY" },
  C: { chinese: "公务舱", english: "BUSINESS" },
};

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
    borderBottom: "2px solid #000",
    paddingBottom: 15,
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: "auto",
  },
  titleSection: {
    borderBottom: "1px solid #000",
    paddingBottom: 15,
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
    borderBottom: "1px solid #eee",
  },
  infoLeft: {
    flex: 1,
    paddingRight: 10,
  },
  infoRight: {
    flex: 1,
  },
  table: {
    border: "2px solid #000",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderBottom: "2px solid #000",
    fontWeight: "bold",
    fontSize: 8,
  },
  tableRow: {
    flexDirection: "row",
    fontSize: 9,
  },
  tableCell: {
    padding: 8,
    borderRight: "1px solid #000",
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
    flex: 1,
  },
  noticeSection: {
    marginTop: 20,
    paddingTop: 15,
    borderTop: "1px solid #000",
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

const ETicketPDF = ({ flightData }: { flightData: FormattedFlightData }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <Image src={iataLogo} style={pdfStyles.logo} />
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
              出票航空公司 ISSUING AIRLINE:{" "}
              {formatAirlineInfo(flightData.issuingAirline || "")?.split("\n")[0]}
            </Text>
            {formatAirlineInfo(flightData.issuingAirline || "")?.includes("\n") && (
              <Text>
                {formatAirlineInfo(flightData.issuingAirline || "")?.split("\n")[1]}
              </Text>
            )}
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

        {flightData.segments && flightData.segments.length > 0 && flightData.segments.map((segment, index) => (
          <View key={index} style={pdfStyles.tableRow}>
            <View style={[pdfStyles.tableCell, pdfStyles.tableColOrigin]}>
              <Text>
                {formatAirportCode(segment.origin || "")?.split("\n")[0] || ""}
                {"\n"}
                {formatAirportCode(segment.origin || "")?.split("\n")[1] || ""}
                {"\n"}
                {formatAirportCode(segment.destination || "")?.split("\n")[0] || ""}
                {"\n"}
                {formatAirportCode(segment.destination || "")?.split("\n")[1] || ""}
              </Text>
            </View>
            <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
              <Text>{segment.flightNumber || ""}</Text>
            </View>
            <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
              <Text>
                {classMapping[segment.flightClass]?.chinese ||
                  segment.flightClass || ""}
                {"\n"}
                {classMapping[segment.flightClass]?.english ||
                  segment.flightClass || ""}
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
            <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
              <Text>{segment.baggage || ""}</Text>
            </View>
            <View style={[pdfStyles.tableCell, pdfStyles.tableColOther]}>
              <Text>{segment.terminal || ""}</Text>
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
  terminal: string;
}

interface FlightData {
  airlineRecordLocator: string;
  bookingRef: string;
  passengerName: string;
  eticketNbr: string;
  idNumber: string;
  conjNbr: string;
  issuingAirline: string;
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
  terminal: string;
}

interface FormattedFlightData {
  airlineRecordLocator: string;
  bookingRef: string;
  passengerName: string;
  eticketNbr: string;
  idNumber: string;
  conjNbr: string;
  issuingAirline: string;
  dateOfIssue: string;
  segments: FormattedFlightSegment[];
}

const ETicketGenerator: React.FC = () => {
  const [form] = Form.useForm();
  const [flightData, setFlightData] = useState<FormattedFlightData | null>(
    null
  );
  const [showTicket, setShowTicket] = useState(false);

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
          <img src={iataLogo} alt="IATA" className="iata-logo" />
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
                {formatAirlineInfo(flightData.issuingAirline || "")
                  ?.split("\n")
                  .map((line, index) => (
                    <div key={index}>
                      <AntText strong>{line}</AntText>
                    </div>
                  ))}
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

          {flightData.segments && flightData.segments.length > 0 && flightData.segments.map((segment, index) => (
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
                    segment.flightClass || ""}
                </div>
                <div>
                  {classMapping[segment.flightClass]?.english ||
                    segment.flightClass || ""}
                </div>
              </div>
              <div className="col-date">
                <div>{segment.date?.split("\n")[0] || ""}</div>
                <div>{segment.date?.split("\n")[1] || ""}</div>
              </div>
              <div className="col-deptime">{segment.depTime || ""}</div>
              <div className="col-arrtime">{segment.arrTime || ""}</div>
              <div className="col-baggage">{segment.baggage || ""}</div>
              <div className="col-terminal">{segment.terminal || ""}</div>
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
      <Card title="ETERM电子客票生成器" className="form-card">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="form-grid">
            <Form.Item
              label="航司记录编号"
              name="airlineRecordLocator"
              rules={[{ message: "请输入航司记录编号" }]}
            >
              <Input placeholder="例: QLPXMR" />
            </Form.Item>

            <Form.Item
              label="订座记录编号"
              name="bookingRef"
              rules={[{ message: "请输入订座记录编号" }]}
            >
              <Input placeholder="例: HT6E3T" />
            </Form.Item>

            <Form.Item
              label="旅客姓名"
              name="passengerName"
              rules={[{ message: "请输入旅客姓名" }]}
            >
              <Input placeholder="例: 黄吉华" />
            </Form.Item>

            <Form.Item
              label="电子客票号"
              name="eticketNbr"
              rules={[{ message: "请输入电子客票号" }]}
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
              label="出票航空公司"
              name="issuingAirline"
              rules={[{ message: "请输入出票航空公司" }]}
            >
              <Input placeholder="例: 江西航空 JIANGXI AIR" />
            </Form.Item>

            <Form.Item
              label="出票日期"
              name="dateOfIssue"
              rules={[{ required: true, message: "请选择出票日期" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <Divider orientation="left">航班行程信息</Divider>

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
                        rules={[{ message: "请输入出发地" }]}
                      >
                        <Input placeholder="例: 南昌昌北 KHN-NANCHANG" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        label="目的地"
                        name={[name, "destination"]}
                        rules={[{ message: "请输入目的地" }]}
                      >
                        <Input placeholder="例: 北京大兴 PEK-BEIJING" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        label="航班号"
                        name={[name, "flightNumber"]}
                        rules={[{ message: "请输入航班号" }]}
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
                        // rules={[{ message: "请选择起飞时间" }]}
                      >
                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        label="到达时间"
                        name={[name, "arrTime"]}
                        // rules={[{ message: "请选择到达时间" }]}
                      >
                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        label="托运行李"
                        name={[name, "baggage"]}
                      >
                        <Input placeholder="例: 20KG" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        label="航站楼"
                        name={[name, "terminal"]}
                      >
                        <Input placeholder="例: T2" />
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
                      fileName={`电子客票-${flightData.passengerName || "unknown"}-${
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
