import 'dotenv/config';
import {config, createSchema} from '@keystone-next/keystone/schema'

const databaseURL = 
process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // how long the user will stay signed in: 60 sec in 60 min 24 hour , 360days
    secret: process.env.COOKIE_SECRET ,  
}