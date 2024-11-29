// nodeTypes/DefaultNode.tsx
import React from 'react';

export const DefaultNode = ({ data }: { data: any }) => (
  <div style={{ padding: '10px', backgroundColor: '#e0e0e0', border: '1px solid #bbb', borderRadius: '5px' }}>
    <h4>{data.label}</h4>
    <p>{data.info}</p>
  </div>
);
