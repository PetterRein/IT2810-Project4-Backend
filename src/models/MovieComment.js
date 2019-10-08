import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Modelen for hvordan MovieComment Object skal bli lagret i Databasen
const MovieCommentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  movieid: Schema.Types.ObjectId,
  comment: String,
})

export default mongoose.model('MovieComment', MovieCommentSchema);