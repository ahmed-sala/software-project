import { AccountCircle, TrendingDown, TrendingUp } from "@mui/icons-material";
import React from "react";
import SettingCellIcon from '@mui/icons-material/SettingsCell'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import Grid from "@mui/material/Grid";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Avatar, Box, Card, CardContent, CardHeader, IconButton, Typography} from "@mui/material";


const salesData = [
    {
        states: "245k",
        tittle: "Sales",
        color: "#E5D68A",
        icon:<TrendingUp sx={{fontSize:"1.75rem"}}/>
    },
    {
        states: "12.5k",
        tittle: "Customers",
        color: "#22CB5C",
        icon:<AccountCircle sx={{fontSize:"1.75rem"}}/>
    },
    {
        states: "1.54k",
        tittle: "Products",
        color: "#DE4839",
        icon: <SettingCellIcon sx={{ fontSize: "1.75rem" }}/>
    },
    {
        states: "88k",
        tittle: "Revenue",
        color: "#12B0E8",
        icon:<AttachMoneyIcon sx={{fontSize:"1.75rem"}}/>
    }
]

const renderStats = () => {
    return salesData.map((item, index) => (
        <Grid item xs={12} sm={3} key={index}>
            <Box sx={{
                display: "flex", alignltems: 'center'
            }}>
                <Avatar variant='rounded' sx={{
                    mr: 3,
                    width: 44,
                    height: 44,
                    boxShadow: 3,
                    color: "common.white",
                    backgroundColor:`${item.color}`,
                }}
                >
                    {item.icon}
                </Avatar>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="caption">{item.tittle}</Typography>
                    <Typography variant="h6">{item.states}</Typography>
</Box>
            </Box>
        </Grid>
    ))
}
const MonthlyOverview = () => {
    return (
        <Card sx={{}}>
            <CardHeader title="Monthly Overview"
                action={
                    <IconButton size="small">
                        <MoreVertIcon/>
                </IconButton>
            }
                subheader={<Typography variant="body2">
                    <Box component="span" sx={{ frontWeight: 600}}>
                        Total 48.5% groth
                    </Box>
                 😎 this month 
                </Typography>
                }
                titleTypographyProps={{
                    sx: {
                        mb:2.5,
                        lineHeight: '2rem ! important' ,
                        letterSpacing: '.15px ! important',
                    }
                    
                }
                }
            />
            <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
                <Grid container spacing={[5, 0]}>
                    {renderStats()}
                </Grid>
            </CardContent>
      </Card>
    )
}
export default MonthlyOverview;
