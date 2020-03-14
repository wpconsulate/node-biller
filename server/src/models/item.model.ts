import mongoose, { Schema } from "mongoose";

export const ItemSchema = new mongoose.Schema(
	{
		name: String,
		gender: String,
		type: String,
		height: Number,
		weight: Number,
		photo: String
	},
	{ versionKey: false }
);

ItemSchema.set("toJSON", {
	transform: function(doc: any, ret: any, options: any) {
		ret.id = ret._id;
		delete ret._id;
	}
});

export const Pokemon = mongoose.model("Item", ItemSchema);
