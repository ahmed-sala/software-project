import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {confirmOrder, deleteOrder, deliverOrder, getOrders, shipOrder} from "../../State/Admin/Order/Action";
import {
    Avatar,
    AvatarGroup,
    Card,
    CardHeader, Menu, MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Button from "@mui/material/Button";

const OrdersTable = () => {
    const [anchorEl, setAnchorEl] = React.useState([]);
    const open = Boolean(anchorEl);
    const handleClick = (event, index) => {
        const newAnchorElArray=[...anchorEl]
        newAnchorElArray[index]=event.currentTarget
        setAnchorEl(newAnchorElArray);
    };
    const handleClose = (index) => {
        const newAnchorElArray=[...anchorEl]
        newAnchorElArray[index]= null
        setAnchorEl(newAnchorElArray);
    };
    const dispatch = useDispatch()
    const { adminOrder } = useSelector(store => store)
    useEffect(() => {
        dispatch(getOrders())
    }, [adminOrder.confirmed, adminOrder.shipped, adminOrder.delivered, adminOrder.deletedOrder])
    console.log("admin Orders ",adminOrder)
    const handleShippedOrder=(orderId)=>{
        dispatch(shipOrder(orderId))
        console.log("handle shipped Order ", orderId)
        handleClose()
    }
    const handleConfirmedOrder=(orderId)=>{
        dispatch(confirmOrder(orderId))
        console.log("handle confirmed order", orderId)
        handleClose()
    }
    const handleDeliveredOrder=(orderId)=>{
        dispatch(deliverOrder(orderId))
        console.log("handle delivered order", orderId)
        handleClose()
    }
    const handleDeleteOrder=(orderId)=>{
        dispatch(deleteOrder(orderId))
        console.log("handle deleted order", orderId)

        handleClose()
    }
    return (
        <div className="p-2">
             <Card>
        <CardHeader title="All Products">

        </CardHeader>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Status</TableCell>
                <TableCell align="left">Update</TableCell>

              <TableCell align="left">Delete</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {adminOrder.orders?.map((item, index) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="" className="">
                  <AvatarGroup max={3} sx={{justifyContent:"start"}}>
                    {item.orderItems.map((orderItem) => <Avatar src={
                     orderItem.product.imageUrl
                    }>
                    </Avatar>)}
                  </AvatarGroup>
                  
                </TableCell>

                <TableCell align="left" scope="row">
                    {item.orderItems.map((orderItem)=><p> {orderItem.product.title}</p>)}
                  {/*{item.title}*/}
                </TableCell>
                 <TableCell align="left">{item.id}</TableCell>
                <TableCell align="left">{item.totalPrice}</TableCell>
                  <TableCell align="left"><span className={`text-white px-5 py-2 rounded-full ${item.orderStatus=="CONFIRMED"? "bg-[green]" : item.orderStatus==="SHIPPED"? "bg-[red]" : item.orderStatus==="PLACED"?"bg-[gray]" : item.orderStatus==="PENDING"?"bg-[gray]": "bg-[red]"}`}>{item.orderStatus}</span></TableCell>
<TableCell>
                  <Button
                      id="basic-button"

                      aria-haspopup="true"

                      onClick={(event)=>handleClick(event, index)}
                      aria-controls={`basic-menu-${item.id}`} aria-expanded={Boolean(anchorEl[index])}
                  >
                      Status
                  </Button>
    </TableCell>
                  <Menu
                      id={`basic-menu-${item.id}`}
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClose={()=>handleClose(index)}
                      MenuListProps={{
                          'aria-labelledby': 'basic-button',
                      }}
                  >
                      <MenuItem onClick={()=>handleConfirmedOrder(item.id)}>Confirmed</MenuItem>
                      <MenuItem onClick={()=>handleShippedOrder(item.id)}>Shipped</MenuItem>
                      <MenuItem onClick={()=>handleDeliveredOrder(item.id)}>Delivered</MenuItem>
                  </Menu>
                <TableCell align="left">
                  <Button onClick={()=>handleDeleteOrder(item.id)} variant="outlined" aria-controls={`basic-menu-${item.id}`} aria-expanded={Boolean(anchorEl[index])}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        </Card>
        </div>
    )
    }
export default OrdersTable;
