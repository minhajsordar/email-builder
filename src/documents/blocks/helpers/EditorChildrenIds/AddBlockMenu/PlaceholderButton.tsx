import React from 'react';

import { AddOutlined } from '@mui/icons-material';
import { ButtonBase } from '@mui/material';

type Props = {
  onClick: () => void;
  onDrop: (data:any) => void;
};
export default function PlaceholderButton({ onClick,onDrop }: Props) {
  return (
    <ButtonBase
      onClick={(ev) => {
        ev.stopPropagation();
        onClick();
      }}
      onDragOver={(ev: React.DragEvent) => {
        ev.stopPropagation();
        ev.preventDefault();
      }}
      onDrop={(ev: React.DragEvent) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        if (data) {
          onDrop(data);
        }
      }}

      sx={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        height: 48,
        width: '100%',
        bgcolor: 'rgba(0,0,0, 0.05)',
      }}
    >
      <AddOutlined
        sx={{
          p: 0.12,
          bgcolor: 'brand.blue',
          borderRadius: 24,
          color: 'primary.contrastText',
        }}
        fontSize="small"
      />
    </ButtonBase>
  );
}
