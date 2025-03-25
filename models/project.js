// models/project.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surfaceSchema = new Schema({
  width: { type: String, default: '' },
  height: { type: String, default: '' },
  sqft: { type: Number, default: 0 },
  manualSqft: { type: Boolean, default: false },
});

const workItemSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  subtype: { type: String, default: '' },
  surfaces: [surfaceSchema],
  linearFt: { type: String, default: '' },
  units: { type: String, default: '' },
  basePrice: { type: String, default: '0.00' },
  materialCost: { type: Number },
  laborCost: { type: Number },
  notes: { type: String, default: '' },
});

const categorySchema = new Schema({
  name: { type: String, required: true },
  workItems: [workItemSchema],
});

const miscFeeSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, default: 0 },
});

const customerInfoSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  street: { type: String, required: true },
  unit: { type: String },
  state: { type: String, default: 'IL' },
  zipCode: { type: String, match: /^\d{5}$/, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  projectName: { type: String },
  type: { type: String, enum: ['Residential', 'Commercial'], default: 'Residential' },
  paymentType: { 
    type: String, 
    enum: ['Credit', 'Debit', 'Check', 'Cash', 'Zelle'], 
    default: 'Cash' 
  },
  startDate: { type: Date, required: true },
  finishDate: { type: Date },
  notes: { type: String },
});

const settingsSchema = new Schema({
  taxRate: { type: Number, default: 0 },
  transportationFee: { type: Number, default: 0 },
  wasteFactor: { type: Number, default: 0 },
  miscFees: [miscFeeSchema],
  deposit: { type: Number, default: 0 },      // Added
  amountPaid: { type: Number, default: 0 },  // Added
  markup: { type: Number, default: 0 },      // Added
});

const projectSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  customerInfo: customerInfoSchema,
  categories: [categorySchema],
  settings: settingsSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', projectSchema);