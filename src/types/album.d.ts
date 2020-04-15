import { Artist } from "./artist";

export interface Album {
  _id: String,
  name: String,
  artist: String,
  artists: [Artist],
  picture: String,
  year: Number,
  created_at: Date
}
