import {Schema, model} from "mongoose";

const tagSchema = new Schema({
    title : {
        type : String,
        required : [true, "Title is required"]
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : [true, "User is required"]
    }
})

const TagModel = model("Tag", tagSchema);

export default TagModel;