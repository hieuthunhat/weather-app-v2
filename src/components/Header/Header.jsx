import React, {useContext} from 'react'

import SearchBox from "../SearchBox/SearchBox.jsx";
import {Box, Button, Drawer, Stack} from "@mui/material";
import {TiThMenu} from "react-icons/ti";
import {SettingContext} from "../../contexts/SettingContext.jsx";
import {DrawerList} from "../DrawerList/DrawerList.jsx";

const Header = () => {
    const {isOpenDrawer, setIsOpenDrawer} = useContext(SettingContext);
    const toggleDrawer = (value) => () => setIsOpenDrawer(value)

    return (
        <Box paddingBlock={1.5} bgcolor={'primary.main'}>
            <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                <Button onClick={toggleDrawer(true)} sx={{color: 'primary.contrastText'}}><TiThMenu size={30}/></Button>
                <SearchBox />
            </Stack>
            <Drawer open={isOpenDrawer} onClose={toggleDrawer(false)}>
                <DrawerList/>
            </Drawer>
        </Box>
    )
}

export default Header
