import React from "react";
import MainCarosel from "../../Components/HomeCarosel/MainCrosel";
import HomeSectionCarosel from "../../Components/HomeSectionCarosel/HomeSectionCarosel";
import {mens_kurta} from "../../../Data/mens_curta";

const HomePage = () => {
    return (
        <div>
            <MainCarosel></MainCarosel>
            <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
                <HomeSectionCarosel data={mens_kurta} sectioName={"men's kurta"}/>
                <HomeSectionCarosel data={mens_kurta} sectioName={"men's shoes"}/>
                <HomeSectionCarosel data={mens_kurta} sectioName={"men's shirt"}/>
                <HomeSectionCarosel data={mens_kurta} sectioName={"women's saree"}/>
                <HomeSectionCarosel data={mens_kurta} sectioName={"women's dress"}/>

            </div>
        </div>

    )
}
export default HomePage;
