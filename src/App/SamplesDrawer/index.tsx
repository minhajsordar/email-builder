import React from 'react';

import { Box, Divider, Drawer, Stack, Typography } from '@mui/material';

import { Tab, Tabs } from '@mui/material';

import { setLeftSidebarTab, useSelectedLeftSidebarTab, } from '../../documents/editor/EditorContext';

import { useSamplesDrawerOpen } from '../../documents/editor/EditorContext';

import SidebarButton from './SidebarButton';
import LeftSidebarComponents from './LeftSidebarComponents';

export const SAMPLES_DRAWER_WIDTH = 240;
export const INSPECTOR_DRAWER_WIDTH = 320;

export default function SamplesDrawer() {
  const samplesDrawerOpen = useSamplesDrawerOpen();
  const selectedLeftSidebarTab = useSelectedLeftSidebarTab();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={samplesDrawerOpen}
      sx={{
        width: samplesDrawerOpen ? SAMPLES_DRAWER_WIDTH : 0,
      }}
    >
      <Stack spacing={3} py={1} px={2} width={SAMPLES_DRAWER_WIDTH} justifyContent="space-between" height="100%">
        <Box sx={{ width: INSPECTOR_DRAWER_WIDTH, height: 49, borderBottom: 1, borderColor: 'divider' }}>
          <Box px={2}>
            <Tabs value={selectedLeftSidebarTab} onChange={(_, v) => setLeftSidebarTab(v)}>
              <Tab value="templates" label="Templates" />
              <Tab value="components" label="Components" />
            </Tabs>
          </Box>
        </Box>
        <Box sx={{ width: INSPECTOR_DRAWER_WIDTH, height: 'calc(100% - 49px)', overflow: 'auto' }}>

          {selectedLeftSidebarTab == 'components' &&
            <div style={{width: "210px"}}>
              <Stack alignItems="flex-start">
                <LeftSidebarComponents />
              </Stack>
            </div>
          }
          {selectedLeftSidebarTab == 'templates' &&
            <Stack spacing={2} sx={{ '& .MuiButtonBase-root': { width: '100%', justifyContent: 'flex-start' } }}>

              <Typography variant="h6" component="h1" sx={{ p: 0.1 }}>
                PreBuild Templates
              </Typography>
              <Stack alignItems="flex-start">
                <SidebarButton href="#">Empty</SidebarButton>
                <SidebarButton href="#sample/welcome">Welcome email</SidebarButton>
                <SidebarButton href="#sample/one-time-password">One-time passcode (OTP)</SidebarButton>
                <SidebarButton href="#sample/reset-password">Reset password</SidebarButton>
                <SidebarButton href="#sample/order-ecomerce">E-commerce receipt</SidebarButton>
                <SidebarButton href="#sample/subscription-receipt">Subscription receipt</SidebarButton>
                <SidebarButton href="#sample/reservation-reminder">Reservation reminder</SidebarButton>
                <SidebarButton href="#sample/post-metrics-report">Post metrics</SidebarButton>
                <SidebarButton href="#sample/respond-to-message">Respond to inquiry</SidebarButton>
              </Stack>
            </Stack>
          }
        </Box>

      </Stack>
    </Drawer>
  );
}
