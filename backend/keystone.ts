import { User } from "./schemas/User";
import { config, createSchema } from "@keystone-next/keystone/schema";
import "dotenv/config";
import { createAuth } from "@keystone-next/auth";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";


const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-sick-fits-tutorial";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long the user will stay signed in: 60 sec in 60 min 24 hour , 360days
  secret: process.env.COOKIE_SECRET || 'secret',
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    //TODO: Add in initial roles here
  },
});

export default withAuth(
  config({
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
      User,
    }),
    ui: {
      //show the UI only for people who pass this/: any logic or if they are admit.etc
      isAccessAllowed: ({ session }) => {
        console.log(session);
        return !!session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: `id`,
    }),
  })
);
