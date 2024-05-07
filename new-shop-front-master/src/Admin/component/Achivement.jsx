import React from "react";
import { Button, Card, CardContent, Typography, styled } from "@mui/material"

const TrignleImg = styled("img")({
    right: 0,
    bottom: 0,
    height: 170,
    position:"absolute"
})
const TrophyImg = styled("img")({
    right: 36,
    bottom: 20,
    height: 98,
    position:"absolute"    
    })
const Achivement = () => {
    return (
        <Card className="" sx={{position:"relative"}}>
            <CardContent>
                <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
                    Shop With Zosh
                </Typography>
                <Typography variant="body2">Congratulations 🥳</Typography>
                <Typography variant="h5" sx={{my:3.1}}>420.8k</Typography>
                <Button size="small" variant="contained">view sales</Button>
                <TrignleImg src=""></TrignleImg> 
                <TrophyImg src="https://www.pngmart.com/files/22/UEFA-Champions-League-PNG.png" ></TrophyImg>
            </CardContent>
     </Card>
    )
}
export default Achivement;
