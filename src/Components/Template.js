import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import IPFileDefinition from "../Pages/IPFileDefinition"
import OPFileDefinition from "../Pages/OPFileDefinition"
import Header from "./Header";



export default function Template() {
    return (
        <>
            <Header />
            <Tabs variant='unstyled'>
                <TabList style={{ height: '3rem' }}>
                    <Tab _selected={{ color: 'white', bg: '#12B5B0', borderWidth: "thin" }} style={{ width: '65rem', borderWidth: "thin" }}><b>Input</b></Tab>
                    <Tab _selected={{ color: 'white', bg: '#12B5B0', borderWidth: "thin" }} style={{ width: '65rem', borderWidth: "thin" }}><b>Output</b></Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <IPFileDefinition />
                    </TabPanel>
                    <TabPanel>
                        <OPFileDefinition />
                    </TabPanel>
                </TabPanels>
            </Tabs >
        </>
    )
}