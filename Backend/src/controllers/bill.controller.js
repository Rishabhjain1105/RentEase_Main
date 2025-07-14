import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponses } from "../utils/ApiResponses.js";
import { Bill } from "../models/Bills.Model.js";

const addBill = asyncHandler(async (req, res)=>{
    const {propertyId, roomId, billDate, bills} = req.body;

    // console.log(billDate, bills, roomNumber, propertyId)

    const billTypes = bills.map((bill) => bill.billType);
    const uniqueBillTypes = new Set(billTypes);

    if (uniqueBillTypes.size !== billTypes.length) {
        throw new ApiError(400, "Duplicate bill types are not allowed");
    }


    if(!billDate || !Array.isArray(bills) || bills.length === 0){
        throw new ApiError(400, "All fields are required");
    }

    for (const bill of bills) {
        bill.amount = Number(bill.amount); // convert string to number
        
        if (!bill.billType || isNaN(bill.amount)) {
          throw new ApiError(400, "Each bill must have billType and a valid amount");
        }
      }
      
    const newBill = await Bill.create({
        propertyId,
        roomId,
        billDate,
        bills,
    })

    res.status(201).json(
        new ApiResponses(201, newBill, "Bill added successfully")
    );
    
})

const fetchBill = asyncHandler(async (req, res)=>{
    const {id} = req.params; //property id
    const { roomId } = req.query;

    if(!id || !roomId){
        throw new ApiError(401, "PropertyId and RoomId is required to fetch bills ")
    }

    const filter = { propertyId: id };

    if(!filter){
        throw new ApiError(500, "Can not filter properties")
    }

    if (roomId) {
        filter.roomId = roomId;
    }

    // console.log(filter)

    const bill = await Bill.find(filter);

    res
    .status(200)
    .json(
        new ApiResponses(
            201, 
            bill,
            "Bill Fetched Successfully"

        )
    )
})

const fetchAllBills = asyncHandler(async (req, res)=>{
    // const {roomNumber} = req.body;
    // const bill = await Bill.find(roomNumber)

    // res
    // .json(
    //     200,
    //     new ApiResponses(
    //         201, 
    //         bill,
    //         "Bill Fetched Successfully"
    //     )
    // )
})

export {addBill, fetchBill, fetchAllBills}