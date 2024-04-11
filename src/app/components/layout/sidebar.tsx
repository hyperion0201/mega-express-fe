import React, { useState } from "react"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  CheckSquareOutlined,
  SettingOutlined,
  ImportOutlined,
  GroupOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  DollarOutlined,
  ApiOutlined,
} from "@ant-design/icons"
import {
  Layout,
  Menu,
  Button,
  theme,
  MenuProps,
  Input,
  Space,
  Flex,
  Avatar,
  Row,
  Col,
} from "antd"
import Link from "next/link"
import { usePathname } from "next/navigation"

const { Header, Sider, Content } = Layout
const { Search } = Input

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const Sidebar: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const path = usePathname()

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={256} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[path]}
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "/",
              icon: <UserOutlined />,
              label: <Link href={"/"}>Trang chủ</Link>,
            },
            {
              key: "2",
              icon: <FileAddOutlined />,
              label: "Tạo vận dơn",
            },
            {
              key: "3",
              icon: <ImportOutlined />,
              label: "Import vận đơn",
            },
            {
              key: "/quan-ly-don",
              icon: <GroupOutlined />,
              label: <Link href={"/quan-ly-don"}>Quản lý đơn</Link>,
            },
            {
              key: "5",
              icon: <CheckSquareOutlined />,
              label: "Đối soát",
            },
            {
              key: "6",
              icon: <FileSearchOutlined />,
              label: "Tra cứu bưu cục",
            },
            getItem("Vận hành", "7", <SettingOutlined />, [
              getItem("Người dùng", "user", <UserOutlined />),
              getItem("Bảng giá", "priceTable", <DollarOutlined />),
              getItem("Tài khoản API", "apiList", <ApiOutlined />),
              getItem("Đối soát vận đơn", "dsvd", <CheckSquareOutlined />),
            ]),
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Row justify={"space-between"}>
            <Col>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Col>
              <Space>
                <Search
                  style={{ display: "block" }}
                  placeholder="Tìm vận đơn"
                  enterButton="Tìm kiếm"
                  size="large"
                />
              </Space>
            </Col>
            <Col style={{ paddingRight: 10 }}>
              <Space>
                <Avatar icon={<UserOutlined />} />
              </Space>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Sidebar
