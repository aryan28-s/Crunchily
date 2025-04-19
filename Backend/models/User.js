const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
  });