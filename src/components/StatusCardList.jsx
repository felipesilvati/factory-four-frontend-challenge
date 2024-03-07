import React from 'react';
import StatusCard from "./StatusCard"

const listStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  justifyContent: 'left',
};

export const StatusCardList = ({ statusCards }) => {
  const results = statusCards
    .map(statusCard => {
      const { title, success, hostname, time, error } = statusCard.data || {}

      return <StatusCard key={title} title={title} success={success} hostname={hostname} time={time} error={error} />
    })

  return (
    <div style={listStyle}>
      {results}
    </div >
  );
}