import { Box, Button, Container, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useContext } from 'react'
import { SettingContext } from '../../contexts/SettingContext'

const Header = () => {
    const { isOpenDrawer, setIsOpenDrawer } = useContext(SettingContext);

    const toggleDrawer = (value) => () => setIsOpenDrawer(value)
    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Button>Light theme</Button>
        </Box>
    );

    return (
        // <Container>
        <Box width={'100'} bgcolor={'red'} display={'flex'} justifyContent={'space-between'}>
            <p>Header here</p>
            <Button onClick={toggleDrawer(true)}>Open here</Button>
            <Drawer open={isOpenDrawer} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box>
        // </Container>
    )
}

export default Header