import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function LabTabs({ tabs, defaultTab }) {
    const [value, setValue] = React.useState(defaultTab.value);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1'}}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                    >
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                label={tab.label}
                                value={tab.value}
                            />
                        ))}
                    </TabList>
                </Box>
                {tabs.map((tab, index) => (
                    <TabPanel sx={{overflowY: "scroll", height: '80vh'}} key={index} value={tab.value}>
                        {tab.children}
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
}
