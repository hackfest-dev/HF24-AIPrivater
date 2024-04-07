import User from '../models/UserSchema.js';

export const  updateUser = async (req, res) => {    
    const id = req.params.id;
    try{
        const updateUser = await User.findByIdAndUpdate(
            id,
            {$set:req.body},
            {new:true}
        );
        res.status(200).json({
            success: true,
            message:"User updated successfully",
            data: updateUser,
        });

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "User not updated",
            
        });
    }
}

export const  deleteUser = async (req, res) => {    
    const id = req.params.id;
    
    try{
        await User.findByIdAndDelete(
            id,
           
        );
        res.status(200).json({
            success: true,
            message:"User deleted successfully",
            
        });

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "failed to delete user",
            
        });
    }
}
export const  getSingleUser = async (req, res) => {    
    const id = req.params.id;
    
    try{
        const user = await User.findById(
            id,
           
        );
        res.status(200).json({
            success: true,
            message:"User found successfully",
            data: user,
        });

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "User not found",
            
        });
    }
}

export const getAllUser = async (req, res) => {    
    
    try{
        const users = await User.find({}).select(-"password");
        res.status(200).json({
            success: true,
            message:"Users found successfully",
            data: users,
        });

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Users not found",
           
        });
    }
}