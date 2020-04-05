const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const GainsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  partials: {
    type: String
  },
  startDate: {
    type: String
  },
  gainsType: {
    type: String
  },
  limitDate: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

GainsSchema.plugin(mongoosePaginate);
mongoose.model("Gains", GainsSchema);
