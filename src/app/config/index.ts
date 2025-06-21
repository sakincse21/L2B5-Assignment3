import dotenv from 'dotenv';

dotenv.config()

const node_env = process.env.NODE_ENV || "";
const port = process.env.PORT || 5000;
const mongodb_url = process.env.MONGODB_URL || "";

export {
    node_env, port, mongodb_url
}