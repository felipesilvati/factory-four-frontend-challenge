import React from 'react';
import { Card, Tag, Flex, Statistic, Row, Col } from 'antd';
const { Meta } = Card;

const StatusCard = ({ title }) => (
  <Card
    hoverable
    style={{ width: 250 }}
    title={<Flex justify='space-between'>{title?.toUpperCase()}<Tag color="green">Healthy</Tag></Flex>}
  >
    <Statistic valueStyle={{ fontSize: 14 }} title="Hostname" value="accounts-9368cf6fc17d" />
    <Statistic valueStyle={{ fontSize: 14 }} title="Time" value="14:47:06" />
  </Card>
);

export default StatusCard;