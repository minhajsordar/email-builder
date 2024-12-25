import React from 'react';

import { Box, Button, SxProps, Typography } from '@mui/material';

type BlockMenuButtonProps = {
  label: string;
  icon: React.ReactNode;
  onClick?: (ev:React.MouseEvent) => void;
};

const BUTTON_SX: SxProps = { p: 1, display: 'flex', flexDirection: 'column' };
const ICON_SX: SxProps = {
  mb: 0.75,
  width: '100%',
  bgcolor: 'cadet.200',
  display: 'flex',
  justifyContent: 'center',
  p: 1,
  border: '1px solid',
  borderColor: 'cadet.300',
};

export default function CustomBlockButton({ label, icon }: BlockMenuButtonProps) {
  return (
    <Button
      sx={BUTTON_SX}
    >
      <Box sx={ICON_SX}>{icon}</Box>
      <Typography variant="body2">{label}</Typography>
    </Button>
  );
}
