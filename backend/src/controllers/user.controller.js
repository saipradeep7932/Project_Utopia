import {User} from '../models/user.model.js';

const registerUser = async(req,res) => {
  try {
    const {name,email,password}=req.body;

    //basic validation  for checking the needed things are there or not

    if(!username || !email || !password){
      return res.status(400).json({message:"Please provide all required fields"});
    }

    //check if user already exists
    const existing = await User.findOne({email:email.toLowerCase()});
    if(existing){
      return res.status(409).json({message:"User with this email already exists"});
    }


    //create new user
    const user = new User({
      username,
      email:email.toLowerCase(),
      password,
      loggedIn:false,
    });
    res.status(201).json({
      message:"User registered successfully",
      user:{id:user._id,email:user.email,username:user.username},                    
    });
  } catch (error) {
    res.status(500).json({message:"Server error",error:error.message});
  }
};

export {registerUser};