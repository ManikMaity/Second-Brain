import {Schema, model} from "mongoose";

const contentSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    link: {
        type: String,
    },
    tags : [{
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }],
    user : {
        type : Schema.Types.ObjectId,
        ref :  "User",
        required : [true, "User is required"]
    }
    
})


const ContentModel = model("Content", contentSchema);

export default ContentModel;