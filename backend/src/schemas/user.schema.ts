import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email  is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
}, {timestamps : true});

export type MongooseUserType = {
  _id : Schema.Types.ObjectId,
  username : string,
  password : string,
  email : string
}


const UserModel = mongoose.model("User", userSchema);
export default UserModel;