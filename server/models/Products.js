const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const productSchema = Schema(
  {
    id: Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { strictQuery: false }
);

const product = mongoose.model("Products", productSchema);

module.exports = {
  product,
};
