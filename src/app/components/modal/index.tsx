import React, { useState } from "react"
import { Button, Modal as AntModal, Row, Col } from "antd"

type ModalProps = {
  isOpen: boolean
  setOpen: Function
  children?: any
}

const Modal: React.FC<ModalProps> = ({ isOpen, setOpen, children }) => {
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState("Content of the modal")

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds")
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    console.log("Clicked cancel button")
    setOpen(false)
  }

  return (
    <>
      <AntModal
        centered
        closeIcon={false}
        width={"90%"}
        open={isOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {children}
      </AntModal>
    </>
  )
}

export default Modal
