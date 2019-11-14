import Movie from '../models/Movie';

export default function getMoviesFromDB(args) {
  if (!args.vote_average) {args.vote_average = 0.0}
  if(args.filter && args.sortDir){
    const movies = Movie.find({ $text: { $search: args.filter }, vote_average: {$gte: args.vote_average}}).sort('-'+args.sortField).skip(args.skip).limit(args.first)
    return movies
  }
  else if (args.filter) {
    const movies = Movie.find({ $text: { $search: args.filter }, vote_average: {$gte: args.vote_average}}).sort(args.sortField).skip(args.skip).limit(args.first)
    return movies
  }
  else if (args.sortDir){
    const movies = Movie.find({vote_average: {$gte: args.vote_average}}).sort('-'+args.sortField).skip(args.skip).limit(args.first)
    return movies
  }
  else {
    const movies = Movie.find({vote_average: {$gte: args.vote_average}}).sort(args.sortField).skip(args.skip).limit(args.first)
    return movies
  }
}

export function getNumberOfMovies(args) {
  if (!args.vote_average) {args.vote_average = 0.0}
  if(args.filter && args.sortDir){
    const movies = Movie.find({ $text: { $search: args.filter }, vote_average: {$gte: args.vote_average}}).sort('-'+args.sortField)
    return movies.countDocuments()
  }
  else if (args.filter) {
    const movies = Movie.find({ $text: { $search: args.filter }, vote_average: {$gte: args.vote_average}}).sort(args.sortField)
    return movies.countDocuments()
  }
  else if (args.sortDir){
    const movies = Movie.find({vote_average: {$gte: args.vote_average}}).sort('-'+args.sortField)
    return movies.countDocuments()
  }
  else {
    const movies = Movie.find({vote_average: {$gte: args.vote_average}}).sort(args.sortField)
    return movies.countDocuments()
  }
}
