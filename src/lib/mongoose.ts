import mongoose from "mongoose";

export function mongooseConnect(){
    if(mongoose.connection.readyState == 1){
        return mongoose.connection.asPromise();
    } else {
        const uri = process.env.MONGODB_URI || 'mongodb+srv://admin:password@cluster.kxlw7lk.mongodb.net/';
        return mongoose.connect(uri);
    }
}