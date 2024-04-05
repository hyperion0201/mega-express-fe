"use client"
import React from "react"
import Sidebar from "./sidebar"

export default function GlobalLayout({ children }) {
  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  )
}
