"use client"

import {
  Table,
  Divider,
  DatePicker,
  Radio,
  Space,
  Button,
  Col,
  Row,
  Select,
  Form,
  Input,
  Checkbox,
  Card,
} from "antd"
import React, { useState } from "react"
import { mockData } from "../../utils/table-data"
import type { FormProps, MenuProps, TableColumnsType } from "antd"
import {
  PrinterOutlined,
  DownloadOutlined,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons"
import { btnColors } from "../components/colors/colors-pattern"
import Modal from "../components/modal"

const { RangePicker } = DatePicker

enum PACKAGE_NOTES {
  CALL_RECIPIENT_BEFORE_DELIVERY = "Gọi cho khách trước khi giao",
  FRAGILE = "Hàng dễ vỡ xin nhẹ tay",
  ALLOWED_TO_CHECK = "Cho khách xem hàng",
  CALL_SHOP_IF_ISSUE = "Gọi lại cho shop khi gặp vấn đề, không gọi lại đền 100% giá trị hàng",
}

enum ORDER_STATUS {
  WAIT_FOR_PICKUP = "Chờ lấy hàng",
  SUCCESSFULLY_PICKED_UP = "Đã lấy hàng",
  ON_DELIVERING = "Đang giao",
  SUCCESSFULLY_DELIVERED = "Đơn hoàn thành",
  RETURNED = "Hoàn hàng",
  CANCELLED = "Huỷ",
}
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

type DetailOrderFieldType = {
  // sender / recipient info
  senderName?: string
  recipientName?: string
  senderPhone?: string
  recipientPhone?: string
  senderAddress?: string
  recipientAddress?: string
  senderProvince?: string
  recipientProvince?: string
  senderDistrict?: string
  recipientDistrict?: string
  senderWard?: string
  recipientWard?: string

  // package info

  packageWeight?: number
  realPackageWeight?: number
  packageLength?: number
  packageWidth?: number
  packageHeight?: number
  exchangeProportion?: number
  packageValue?: number
  codPrice?: number
  insurancePrice?: number
  totalTaxPrice?: number
  referenceId?: string
  packageDescription?: string
  packageNote?: PACKAGE_NOTES
  orderStatus?: ORDER_STATUS
  updatedAt: string
  orderVisibility?: boolean
}

const onFinish: FormProps<DetailOrderFieldType>["onFinish"] = (values) => {
  console.log("Success:", values)
}

const onFinishFailed: FormProps<DetailOrderFieldType>["onFinishFailed"] = (
  errorInfo
) => {
  console.log("Failed:", errorInfo)
}

const QuanLyDon: React.FC = () => {
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
      sorter: (a, b) => a.recipient.localeCompare(b.recipient),
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
          <Button type="primary" onClick={() => setDetailModalOpen(true)}>
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
  const [showDatePicker, setDatePickerVisibility] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [dateFilterSelected, setDateFilterSelected] = useState("all")

  React.useEffect(() => {
    if (dateFilterSelected === "custom") {
      setDatePickerVisibility(true)
    } else {
      setDatePickerVisibility(false)
    }
  }, [dateFilterSelected])

  return (
    <div>
      <Modal isOpen={detailModalOpen} setOpen={setDetailModalOpen}>
        <Form
          layout="vertical"
          name="basic"
          labelCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={[10, 0]}>
            <Col xs={24} xl={12}>
              <Card size="small" title="THÔNG TIN GIAO NHẬN">
                <Row gutter={[10, 0]}>
                  <Col span={12}>
                    <Form.Item<DetailOrderFieldType>
                      label="Tên người gửi"
                      name="senderName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item<DetailOrderFieldType>
                      label="Số điện thoại người gửi"
                      name="senderPhone"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item<DetailOrderFieldType>
                      label="Địa chỉ người gửi"
                      name="senderAddress"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item<DetailOrderFieldType>
                      label="Tỉnh gửi"
                      name="senderProvince"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn tỉnh thành"
                        allowClear
                        options={[
                          { value: "l1", label: "Leader 1" },
                          { value: "l2", label: "Leader 2" },
                          { value: "l3", label: "Leader 3" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item<DetailOrderFieldType>
                      label="Huyện gửi"
                      name="senderDistrict"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn quận huyện"
                        allowClear
                        options={[
                          { value: "l1", label: "Leader 1" },
                          { value: "l2", label: "Leader 2" },
                          { value: "l3", label: "Leader 3" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item<DetailOrderFieldType>
                      label="Xã gửi"
                      name="senderWard"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn phường xã"
                        allowClear
                        options={[
                          { value: "l1", label: "Leader 1" },
                          { value: "l2", label: "Leader 2" },
                          { value: "l3", label: "Leader 3" },
                        ]}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item<DetailOrderFieldType>
                      label="Tên người nhận"
                      name="recipientName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item<DetailOrderFieldType>
                      label="Số điện thoại người nhận"
                      name="recipientPhone"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item<DetailOrderFieldType>
                      label="Địa chỉ người nhận"
                      name="recipientAddress"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item<DetailOrderFieldType>
                      label="Tỉnh nhận"
                      name="recipientProvince"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn tỉnh thành"
                        allowClear
                        options={[
                          { value: "l1", label: "Leader 1" },
                          { value: "l2", label: "Leader 2" },
                          { value: "l3", label: "Leader 3" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item<DetailOrderFieldType>
                      label="Huyện nhận"
                      name="recipientDistrict"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn quận huyện"
                        allowClear
                        options={[
                          { value: "l1", label: "Leader 1" },
                          { value: "l2", label: "Leader 2" },
                          { value: "l3", label: "Leader 3" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item<DetailOrderFieldType>
                      label="Xã nhận"
                      name="recipientWard"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn phường xã"
                        allowClear
                        options={[
                          { value: "l1", label: "Leader 1" },
                          { value: "l2", label: "Leader 2" },
                          { value: "l3", label: "Leader 3" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={24} xl={12}>
              <Card size="small" title="THÔNG TIN GÓI HÀNG">
                <Row gutter={[10, 0]}>
                  <Col span={8}>
                    <Form.Item<DetailOrderFieldType>
                      label="Rộng"
                      name="packageWidth"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item<DetailOrderFieldType>
                      label="Giá trị hàng"
                      name="packageValue"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item<DetailOrderFieldType>
                      label="Tổng cước"
                      name="totalTaxPrice"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item<DetailOrderFieldType>
                      label="Trọng lượng thực (kg)"
                      name="realPackageWeight"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item<DetailOrderFieldType>
                      label="Cao (cm)"
                      name="packageHeight"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item<DetailOrderFieldType>
                      label="Tiền thu hộ"
                      name="codPrice"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item<DetailOrderFieldType>
                      label="Dài (cm)"
                      name="packageLength"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item<DetailOrderFieldType>
                      label="Tỷ lệ qui đổi"
                      name="exchangeProportion"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item<DetailOrderFieldType>
                      label="Phí bảo hiểm"
                      name="insurancePrice"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <Form.Item<DetailOrderFieldType>
                      label="Thông tin sản phẩm (nhập mô tả)"
                      name="packageDescription"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item<DetailOrderFieldType>
                      label="Ghi chú"
                      name="packageNote"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn ghi chú"
                        allowClear
                        options={[
                          {
                            value: "l1",
                            label: PACKAGE_NOTES.ALLOWED_TO_CHECK,
                          },
                          {
                            value: "l2",
                            label: PACKAGE_NOTES.CALL_RECIPIENT_BEFORE_DELIVERY,
                          },
                          {
                            value: "l3",
                            label: PACKAGE_NOTES.CALL_SHOP_IF_ISSUE,
                          },
                          { value: "l3", label: PACKAGE_NOTES.FRAGILE },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[10, 0]}>
                  <Col span={8}>
                    <Form.Item<DetailOrderFieldType>
                      label="Trạng thái đơn"
                      name="orderStatus"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn trạng thái"
                        allowClear
                        options={[
                          {
                            value: "l1",
                            label: ORDER_STATUS.WAIT_FOR_PICKUP,
                          },
                          {
                            value: "l2",
                            label: ORDER_STATUS.SUCCESSFULLY_PICKED_UP,
                          },
                          {
                            value: "l3",
                            label: ORDER_STATUS.ON_DELIVERING,
                          },
                          {
                            value: "l4",
                            label: ORDER_STATUS.SUCCESSFULLY_DELIVERED,
                          },
                          { value: "l5", label: ORDER_STATUS.RETURNED },
                          { value: "l6", label: ORDER_STATUS.CANCELLED },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item<DetailOrderFieldType>
                      label="Thời gian cập nhật"
                      name="updatedAt"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <DatePicker showTime />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item<DetailOrderFieldType>
                      label="Ẩn hiện đơn"
                      name="orderVisibility"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Chọn ẩn hiện"
                        options={[
                          { value: true, label: "Hiển thị" },
                          { value: false, label: "Ẩn đơn" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Card size="small" title="TRẠNG THÁI ĐƠN HÀNG">
                <Row>
                  <Col span={4}>
                    <p>7</p>
                  </Col>
                  <Col span={10}>
                    <p>05/04/2024 21:06:08</p>
                  </Col>
                  <Col span={10}>Bưu cục đã nhận hàng</Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Divider />
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item>
                <Space align="center">
                  <Button
                    style={{ backgroundColor: btnColors.update }}
                    type="primary"
                    htmlType="submit"
                  >
                    Cập nhật
                  </Button>
                  <Button
                    style={{ backgroundColor: btnColors.clone }}
                    type="primary"
                    htmlType="submit"
                  >
                    Nhân bản
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
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
      <Row justify={"space-between"}>
        <Col>
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
              placeholder="Lọc theo user"
              style={{ width: 200 }}
              allowClear
              options={[
                { value: "l1", label: "Leader 1" },
                { value: "l2", label: "Leader 2" },
                { value: "l3", label: "Leader 3" },
              ]}
            />
          </Space>
        </Col>
        <Col>
          <Space>
            <Select
              placeholder="Lọc theo thời gian"
              style={{ width: 200 }}
              defaultValue={"all"}
              allowClear
              options={[
                { value: "all", label: "Tất cả" },
                { value: "today", label: "Hôm nay" },
                { value: "yesterday", label: "Hôm qua " },
                { value: "custom", label: "Tuỳ chọn " },
                { value: "7days", label: "7 ngày qua " },
                { value: "30days", label: "30 ngày qua " },
              ]}
              onChange={(value) => {
                setDateFilterSelected(value)
              }}
            />
            {showDatePicker && <RangePicker showTime />}
          </Space>
        </Col>
      </Row>

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
