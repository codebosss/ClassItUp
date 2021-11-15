import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    smtpUserName: {
        type: String,
        default: null
    },

})

const Notification = mongoose.model("Notification", notificationSchema)

export default Notification