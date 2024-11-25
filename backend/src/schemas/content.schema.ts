import {InferSchemaType, Schema, model} from "mongoose";

const contentSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    type : {
        type : String,
        required : [true, "Type is required"]
    },
    link: {
        type: String,
    },
    tags : {
        type: [Schema.Types.ObjectId],
        ref: "Tag",
        default: []
    },
    user : {
        type : Schema.Types.ObjectId,
        ref :  "User",
        required : [true, "User is required"]
    }
    
}, {timestamps: true});

export type ContentSchemaType = InferSchemaType<typeof contentSchema>;


const ContentModel = model("Content", contentSchema);

export default ContentModel;