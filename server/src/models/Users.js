import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    receitasSalvas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "receitas"
        }
    ]
});

const UserModel = mongoose.model("usuarios", UserSchema);

export default UserModel