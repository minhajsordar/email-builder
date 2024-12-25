import React, { useEffect, useState } from 'react';

import { AddOutlined } from '@mui/icons-material';
import { Fade, IconButton } from '@mui/material';

type Props = {
  buttonElement: HTMLElement | null;
  onClick: () => void;
  onDrop: (event: any) => void;
};
export default function DividerButton({ buttonElement, onClick, onDrop }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function listener({ clientX, clientY }: MouseEvent) {
      if (!buttonElement) {
        return;
      }
      const rect = buttonElement.getBoundingClientRect();
      const rectY = rect.y;
      const bottomX = rect.x;
      const topX = bottomX + rect.width;

      if (Math.abs(clientY - rectY) < 20) {
        if (bottomX < clientX && clientX < topX) {
          setVisible(true);
          return;
        }
      }
      setVisible(false);
    }
    window.addEventListener('mousemove', listener);
    window.addEventListener('dragover', listener);
    return () => {
      window.removeEventListener('mousemove', listener);
      window.removeEventListener('dragover', listener);
    };
  }, [buttonElement, setVisible]);

  return (
    <Fade in={visible}>
      <IconButton
        size="small"
        sx={{
          p: 0.12,
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-10px)',
          bgcolor: 'brand.blue',
          color: 'primary.contrastText',
          zIndex: 'fab',
          '&:hover, &:active, &:focus': {
            bgcolor: 'brand.blue',
            color: 'primary.contrastText',
          },
        }}
        onClick={(ev: React.MouseEvent) => {
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
      >
        <AddOutlined fontSize="small" />
      </IconButton>
    </Fade>
  );
}
