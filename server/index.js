import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import authRoutes from './routes/auth.js'
import analysisRoutes from './routes/analysis.js'
import videoCallRoutes from './controllers/videoCall/videoCallRoutes.js'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();
// const __dirname = path.resolve();
console.log(__dirname);

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
// app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, '/public')));



app.use(cors());


const PORT = process.env.PORT || 5000
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});


//define endpoint for all the routes in authRoutes.js and analysisRoutes.js
app.use('/user', authRoutes);
app.use('/analysis', analysisRoutes);
app.use('/video-call', videoCallRoutes);


if (process.env.NODE_ENV == "production") {

    app.use(express.static("public"));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
    })
}
