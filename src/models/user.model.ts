import mongoose from "mongoose";
import bcrypt from "bcrypt";
import c from "config";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  compaerPassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async (next: any) => {
  let user = this as unknown as UserDocument;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(c.get<number>("saltWorkFactor"));

  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async (candidatePassword: string) => {
  const user = this as unknown as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model("Users", userSchema);

export default User;
