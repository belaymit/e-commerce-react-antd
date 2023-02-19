import { Typography } from 'antd';
import React from 'react';

const Footer = () => (
  <div className="footerContainer">
    <Typography.Link href="https://www.google.com">Privacy Policy</Typography.Link>
    <Typography.Link href="https://www.google.com">Terms and Conditions</Typography.Link>
    <Typography.Link href="https://www.google.com">Return Policy</Typography.Link>
    <Typography.Link href="https://www.google.com">About Us</Typography.Link>
    <Typography.Link href="tel:+12345678">+12345678</Typography.Link>
  </div>
);

export default Footer;
