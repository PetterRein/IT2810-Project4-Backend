import Movie from '../models/Movie';

export default function getMoviesFromDB(args) {
  if (!args.vote_average) {args.vote_average = 0.0}
  if(args.filter && args.sortDir){
    const movies = Movie.find({ $text: { $search: args.filter }, vote_average: {$gte: args.vote_average}}).sort('-'+args.sortField).skip(args.skip).limit(args.first)
    const nrMovies = Movie.find({ $text: { $search: args.filter }, vote_average: {$gte: args.vote_average}}).countDocuments()
    return { movies, nrMovies }
  }
  else if (args.filter) {
    const movies = Movie.find({ $text: { $search: args.filter }, vote_average: {$gte: args.vote_average}}).sort(args.sortField).skip(args.skip).limit(args.first)
    const nrMovies = Movie.find({ $text: { $search: args.filter }, vote_average: {$gte: args.vote_average}}).countDocuments()
    return { movies, nrMovies }
  }
  else if (args.sortDir){
    const movies = Movie.find({vote_average: {$gte: args.vote_average}}).sort('-'+args.sortField).skip(args.skip).limit(args.first)
    const nrMovies = Movie.find({vote_average: {$gte: args.vote_average}}).sort('-'+args.sortField).countDocuments()
    return { movies, nrMovies }
  }
  else {
    const movies = Movie.find({vote_average: {$gte: args.vote_average}}).sort(args.sortField).skip(args.skip).limit(args.first)
    const nrMovies = Movie.find({vote_average: {$gte: args.vote_average}}).sort(args.sortField).countDocuments()
    return { movies, nrMovies }
  }
}
