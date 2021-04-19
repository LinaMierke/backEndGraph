import {User} from './schemas/User'
import { config, createSchema } from "@keystone-next/keystone/schema";
import "dotenv/config";


const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits-tutorial";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long the user will stay signed in: 60 sec in 60 min 24 hour , 360days
  secret: process.env.COOKIE_SECRET,
};

export default config({
    //@ts-ignore
  server: {
    cors: {
      origin: [process.env.FRONT_URL],
      credentials: true,
    },
  },
  db: {
    adapter: "mongoose",
    url: databaseURL,
    //TODO: add data seeding here
  },
  lists: createSchema({
    //schema items go here
    User

  
  }),
  ui: {
    //TODO: change this for roles
    isAccessAllowed: () => true,
  },

  //TODO: add session values here
});
