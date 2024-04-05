"use client"
import React from "react"
import PieChart from "../components/charts"
import { Row, Col, Dropdown, Button, Space, MenuProps, Card } from "antd"
import { DownOutlined, UserOutlined } from "@ant-design/icons"

const cardStyle = {
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
}

const colStyle = { ...cardStyle }

const handleMenuClick: MenuProps["onClick"] = (e) => {
  alert("click", e)
}

const items: MenuProps["items"] = [
  {
    label: "1st menu item",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "2nd menu item",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "3rd menu item",
    key: "3",
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: "4rd menu item",
    key: "4",
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
]

const menuProps = {
  items,
  onClick: handleMenuClick,
}

const Page = () => {
  return (
    <>
      <Row gutter={[10, 0]} justify={"end"}>
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              Tất cả
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </Row>
      <br />
      <Row>
        <Col style={colStyle} xs={24} xl={12}>
          <Row justify={"center"}>
            <Space>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 30,
                  textAlign: "center",
                }}
              >
                THỐNG KÊ ĐƠN
              </p>
            </Space>
          </Row>
          <Row>
            <PieChart />
          </Row>
        </Col>
        <Col style={colStyle} xs={24} xl={12}>
          <Row gutter={[10, 0]} justify={"center"}>
            <Col xl={12} xs={24}>
              <Card style={cardStyle} title="TỔNG GIÁ BÁN" bordered={false}>
                <p style={{ fontSize: 30 }}>20,000,000,000 đ</p>
              </Card>
            </Col>
            <Col xl={12} xs={24}>
              <Card style={cardStyle} title="TỔNG GIÁ NET" bordered={false}>
                <p style={{ fontSize: 30 }}>15,000,000,000 đ</p>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Card
                title={
                  <p style={{ fontSize: 20, fontWeight: "bold" }}>
                    TÌNH TRẠNG ĐƠN
                  </p>
                }
              >
                <Row gutter={[10, 10]} align={"middle"} justify={"center"}>
                  <Col
                    style={{ ...cardStyle, padding: "20px 0" }}
                    xs={24}
                    xl={12}
                  >
                    <div style={{ textAlign: "center" }}>
                      Đơn hàng hoàn thành
                    </div>
                    <div style={{ textAlign: "center" }}>88%</div>
                  </Col>
                  <Col
                    style={{ ...cardStyle, padding: "20px 0" }}
                    xs={24}
                    xl={12}
                  >
                    <div style={{ textAlign: "center" }}>
                      Đơn hàng hoàn thành
                    </div>
                    <div style={{ textAlign: "center" }}>88%</div>
                  </Col>
                </Row>
                <Row gutter={[10, 10]}>
                  <Col
                    style={{ ...cardStyle, padding: "20px 0" }}
                    xs={24}
                    xl={12}
                  >
                    <div style={{ textAlign: "center" }}>
                      Đơn hàng hoàn thành
                    </div>
                    <div style={{ textAlign: "center" }}>88%</div>
                  </Col>
                  <Col
                    style={{ ...cardStyle, padding: "20px 0" }}
                    xs={24}
                    xl={12}
                  >
                    <div style={{ textAlign: "center" }}>
                      Đơn hàng hoàn thành
                    </div>
                    <div style={{ textAlign: "center" }}>88%</div>
                  </Col>
                </Row>
                <Row gutter={[10, 10]}>
                  <Col
                    style={{ ...cardStyle, padding: "20px 0" }}
                    xs={24}
                    xl={12}
                  >
                    <div style={{ textAlign: "center" }}>
                      Đơn hàng hoàn thành
                    </div>
                    <div style={{ textAlign: "center" }}>88%</div>
                  </Col>
                  <Col
                    style={{ ...cardStyle, padding: "20px 0" }}
                    xs={24}
                    xl={12}
                  >
                    <div style={{ textAlign: "center" }}>
                      Đơn hàng hoàn thành
                    </div>
                    <div style={{ textAlign: "center" }}>88%</div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Page
