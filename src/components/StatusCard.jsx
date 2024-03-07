import React from 'react';
import { Card, Tag, Flex, Statistic, Typography } from 'antd';
import { format } from "date-fns";
const { Text } = Typography;

const StatusCard = ({ title, success, hostname, time, error }) => {
  const formattedTime = time ? format(new Date(time), 'HH:mm:ss') : null;
  const cardContent = success ? (
    <Flex vertical gap='middle'>
      <Statistic valueStyle={{ fontSize: 14 }} title="Hostname" value={hostname} />
      <Statistic valueStyle={{ fontSize: 14 }} title="Time" value={formattedTime} />
    </Flex>
  ) : (
    <Flex vertical gap='middle'>
      <Text type='danger'>OUTAGE</Text>
      <Text type='danger'>{error}</Text>
    </Flex>
  )


  return (
    <Card
      style={{ width: 250 }}
      title={
        <Flex justify='space-between'>{title?.toUpperCase()}
          <Tag color={success ? 'green' : 'red'}>{success ? 'Healthy' : 'Error'}</Tag>
        </Flex>
      }
    >
      {cardContent}
    </Card>
  )
};

export default StatusCard;