import React from 'react';
import { Card, Tag, Flex, Statistic } from 'antd';

const StatusCard = ({ title, success, hostname, time }) => (
  <Card
    hoverable
    style={{ width: 250 }}
    title={
      <Flex justify='space-between'>{title?.toUpperCase()}
        <Tag color={success ? 'green' : 'red'}>{success ? 'Healthy' : 'Error'}</Tag>
      </Flex>
    }
  >
    <Flex vertical gap='middle'>
      <Statistic valueStyle={{ fontSize: 14 }} title="Hostname" value={hostname} />
      <Statistic valueStyle={{ fontSize: 14 }} title="Time" value={time} />
    </Flex>
  </Card>
);

export default StatusCard;