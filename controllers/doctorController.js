import Doctor from '../models/DoctorSchema.js';

export const  updateDoctor = async (req, res) => {    
    const id = req.params.id;
    try{
        const updateDoctor = await Doctor.findByIdAndUpdate(
            id,
            {$set:req.body},
            {new:true}
        );
        res.status(200).json({
            success: true,
            message:"Doctor updated successfully",
            data: updateDoctor,
        });

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Doctor not updated",
            
        });
    }
}

export const  deleteDoctor = async (req, res) => {    
    const id = req.params.id;
    
    try{
        await Doctor.findByIdAndDelete(
            id,
           
        );
        res.status(200).json({
            success: true,
            message:"Doctor deleted successfully",
            
        });

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "failed to delete Doctor",
            
        });
    }
}
export const  getSingleDoctor = async (req, res) => {    
    const id = req.params.id;
    
    try{
        const doctor = await Doctor.findById(
            Specialty,
           
        );
        res.status(200).json({
            success: true,
            message:"Doctor found successfully",
            data: doctor,
        });

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Doctor not found"
            + err
        });
    }
}

export const getAllDoctor = async (req, res) => {    
    
    try{
        const {query} = req.query;
        let doctors;
        if(query){
            doctors = await Doctor.find({Specialty:query,
                $or: [{name:[{$regex:query,$options :"i"}]},
                {location:[{$regex:query,$options :"i"}]}],
                
            }).select(-"password");
        }else{
           const doctors = await Doctor.find({Specialty:query}).select(-"password");
        }


        

        res.status(200).json({
            success: true,
            message:"Doctors found successfully",
            data: doctors,
        });

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Doctors not found" + err
           
        });
    }
}