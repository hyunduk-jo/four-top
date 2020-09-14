/*
    Comment와 Video 사이에는 relationship이 있기 때문에 
    comment에 video의 id를 저장하거나
    video가 id의 배열을 가지도록 해야한다.
*/
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required" // required, default 등 option이 필요한 경우 {}사용
  },
  createdAt: {
    type: Date,
    default: Date.now
  }/*
    ,
    video:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video" // object id가 어는 model에서 왔는지 표시
        // Video.js의 const model = mongoose.model("modelName",schemaName)의 modelName과 같아야 함
    }
    */
});

const model = mongoose.model("Comment", CommentSchema);
export default model;