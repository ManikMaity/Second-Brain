import {InferSchemaType, Schema, model} from "mongoose"

const linkSchema = new Schema({
    hash : {
        type : String,
        unique : true,
    },

    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : [true, "User is required"],
        unique : true
    }

}, {timestamps : true});

export type LinkSchemaType = InferSchemaType<typeof linkSchema>;

export const LinkModel = model("Link", linkSchema);