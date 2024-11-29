// nodeTypes/CustomNode.tsx
import React from 'react';

export const CustomNode = ({ data }: { data: any }) => (
  <div style={{ padding: '10px', backgroundColor: '#f3f3f3', border: '1px solid #ccc', borderRadius: '5px' }}>
    <h4>{data.label}</h4>
    <p>{data.info}</p>
  </div>
);
