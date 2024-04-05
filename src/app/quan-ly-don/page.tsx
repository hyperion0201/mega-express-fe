"use client"
import { Table, Divider, Radio, Space, Button, Col, Row, Select } from "antd"
import React, { useState } from "react"
import { mockData } from "../../utils/table-data"
import type { MenuProps, TableColumnsType } from "antd"
import {
  PrinterOutlined,
  DownloadOutlined,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons"
import { btnColors } from "../components/colors/colors-pattern"

const { Column, ColumnGroup } = Table

interface DataType {
  key: React.Key
  orderId: string
  orderStatus: string
  recipient: string
  recipientAddress: string
  recipientMobileNumber: string
  codPrice: number
  totalTaxPrice: number
  totalTaxRealtime: number
  referenceId: string
  createdAt: string
  updatedAt: string
  username: string
  provider: string
}
const columns: TableColumnsType<DataType> = [
  {
    title: "Mã vận đơn",
    dataIndex: "orderId",
    key: "orderId",
    sorter: (a, b) => Number(a.orderId) - Number(b.orderId),
  },
  {
    title: "Trạng thái",
    dataIndex: "orderStatus",
    key: "orderStatus",
    filters: [
      {
        text: "Hoàn thành",
        value: "onCompleted",
      },
      {
        text: "Chờ lấy hàng",
        value: "onWaitingForPickUp",
      },
      {
        text: "Đã lấy hàng",
        value: "onSuccessfullyPickedUp",
      },
      {
        text: "Chưa giao",
        value: "onDelivering",
      },
      {
        text: "Hoàn hàng",
        value: "onReturned",
      },
      {
        text: "Hủy",
        value: "onCancelled",
      },
    ],
    onFilter: (value: any, record) => record.orderStatus === value,
  },
  {
    title: "Người nhận",
    dataIndex: "recipient",
    key: "recipient",
  },
  {
    title: "SĐT nhận",
    dataIndex: "recipientMobileNumber",
    key: "recipientMobileNumber",
  },
  {
    title: "Địa chỉ nhận",
    dataIndex: "recipientAddress",
    key: "recipientAddress",
  },
  {
    title: "Thu hộ",
    dataIndex: "codPrice",
    key: "codPrice",
    sorter: (a, b) => a.codPrice - b.codPrice,
  },
  {
    title: "Tổng cước",
    dataIndex: "totalTaxPrice",
    key: "totalTaxPrice",
    sorter: (a, b) => a.totalTaxPrice - b.totalTaxPrice,
  },
  {
    title: "Tổng cước thực",
    dataIndex: "totalTaxRealtime",
    key: "totalTaxRealtime",
    sorter: (a, b) => a.totalTaxRealtime - b.totalTaxRealtime,
  },
  {
    title: "Mã tham chiếu",
    dataIndex: "referenceId",
    key: "referenceId",
  },
  {
    title: "Tạo lúc",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Cập nhật",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
  {
    title: "User",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Provider",
    dataIndex: "provider",
    key: "provider",
  },
  {
    title: "Sửa",
    key: "action",
    render: (row) => (
      <Space size="middle">
        <Button type="primary" onClick={() => console.log(row)}>
          Chi tiết vận đơn
        </Button>
      </Space>
    ),
  },
]
// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    )
  },
}

const QuanLyDon = () => {
  return (
    <div>
      <Row gutter={[0, 10]} justify={"space-between"}>
        <Col xs={24} xl={12}>
          <Space wrap>
            <Button icon={<PrinterOutlined />} type="primary">
              In vận đơn
            </Button>
            <Button icon={<DownloadOutlined />}>Tải vận đơn</Button>
            <Button icon={<DeleteOutlined />} type="primary" danger>
              Hủy vận đơn
            </Button>
          </Space>
        </Col>
        <Col xs={24} xl={12}>
          <Space wrap>
            <Button
              style={{ backgroundColor: btnColors.completed, color: "white" }}
            >
              Hoàn thành
            </Button>
            <Button
              style={{
                backgroundColor: btnColors.waitForPickUp,
                color: "white",
              }}
            >
              Chờ lấy hàng
            </Button>
            <Button
              style={{ backgroundColor: btnColors.pickedUp, color: "white" }}
            >
              Đã lấy hàng
            </Button>
            <Button
              style={{ backgroundColor: btnColors.notDone, color: "white" }}
            >
              Chưa giao
            </Button>
            <Button
              style={{ backgroundColor: btnColors.returned, color: "white" }}
            >
              Hoàn hàng
            </Button>

            <Button
              style={{ backgroundColor: btnColors.cancelled, color: "white" }}
            >
              Hủy
            </Button>
          </Space>
        </Col>
      </Row>
      <Divider />

      <Space wrap>
        <Select
          placeholder="Lọc theo leader"
          style={{ width: 200 }}
          allowClear
          options={[
            { value: "l1", label: "Leader 1" },
            { value: "l2", label: "Leader 2" },
            { value: "l3", label: "Leader 3" },
          ]}
        />
        <Select
          placeholder="Lọc theo sales"
          style={{ width: 200 }}
          allowClear
          options={[
            { value: "l1", label: "Leader 1" },
            { value: "l2", label: "Leader 2" },
            { value: "l3", label: "Leader 3" },
          ]}
        />
        <Select
          placeholder="Lọc theo leader"
          style={{ width: 200 }}
          allowClear
          options={[
            { value: "l1", label: "Leader 1" },
            { value: "l2", label: "Leader 2" },
            { value: "l3", label: "Leader 3" },
          ]}
        />
      </Space>

      <Divider />
      <Table
        size="small"
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        dataSource={mockData}
        columns={columns}
      />
    </div>
  )
}

export default QuanLyDon
