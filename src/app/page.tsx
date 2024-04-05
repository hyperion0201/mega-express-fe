import Image from "next/image";
import styles from "./page.module.css";

import React from 'react';
import { Button } from 'antd';
import GlobalLayout from './components/layout'

const Home = () => (
  <div className="App">
    <GlobalLayout>
    <Button type="primary">Button</Button>
    </GlobalLayout>

  </div>
);


export default Home