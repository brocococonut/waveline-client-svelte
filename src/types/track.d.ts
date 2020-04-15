import { Artist } from "./artist";
import { Album } from "./album";
import { Genre } from "./genre";

export interface Track {
  _id: String,
  album: Album,
  artist: String,
  artists: [Artist],
  created_at: Date,
  duration: Number,
  favourited: Boolean,
  genre: Genre,
  last_play: Date,
  lossless: Boolean,
  name: String,
  path: String,
  plays: Number,
  updated_at: Date,
  year: Number
}
