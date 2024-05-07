import {Avatar, Grid, Rating} from '@mui/material';
import React from 'react';

const ProductReviewCard = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={1}>
                <Avatar className="text-white" sx={{width: 56, height: 56, bgcolor: "#9155fd"}}>
                    R
                </Avatar>
            </Grid>
            <Grid item xs={11}>
                <div className="space-y-2">
                    <div>
                        <p className='font-semibold text-lg'>Raam</p>
                        <p className='opacity-70'>April 5, 2023</p>
                    </div>
                </div>
                <Rating value={4.5} name="half-rating" readOnly precision={0.5}/>
                <p>nice product, i love this shirt</p>
            </Grid>
        </Grid>
    );
};

export default ProductReviewCard;
