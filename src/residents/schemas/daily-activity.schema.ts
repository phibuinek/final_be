import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type DailyActivityDocument = DailyActivity & Document;

// Sub-schema for a single activity in the list
@Schema({ _id: false })
export class ActivityDetail {
  @Prop({ required: true })
  time: Date;

  @Prop({ type: String, enum: ['meal', 'medication', 'exercise', 'bath', 'sleep', 'recreation', 'other'], required: true })
  type: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: ['completed', 'skipped', 'refused', 'pending'], default: 'pending' })
  status: string;

  @Prop()
  notes: string;

  @Prop({ type: String, enum: ['happy', 'neutral', 'sad', 'angry', 'anxious'], required: true })
  mood: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  performedBy: MongooseSchema.Types.ObjectId;
}
const ActivityDetailSchema = SchemaFactory.createForClass(ActivityDetail);

// Sub-schema for meal details
@Schema({ _id: false })
class MealDetail {
  @Prop({ default: false })
  eaten: boolean;
  @Prop()
  notes: string;
}
const MealDetailSchema = SchemaFactory.createForClass(MealDetail);

// Sub-schema for snacks
@Schema({ _id: false })
class Snack {
  @Prop()
  time: Date;
  @Prop()
  notes: string;
}
const SnackSchema = SchemaFactory.createForClass(Snack);

// Main schema for all meals
@Schema({ _id: false })
class Meals {
  @Prop({ type: MealDetailSchema, default: () => ({}) })
  breakfast: MealDetail;

  @Prop({ type: MealDetailSchema, default: () => ({}) })
  lunch: MealDetail;

  @Prop({ type: MealDetailSchema, default: () => ({}) })
  dinner: MealDetail;

  @Prop({ type: [SnackSchema], default: [] })
  snacks: Snack[];
}
const MealsSchema = SchemaFactory.createForClass(Meals);

// Sub-schema for sleep tracking
@Schema({ _id: false })
class Sleep {
  @Prop()
  startTime: Date;
  @Prop()
  endTime: Date;
  @Prop({ type: String, enum: ['good', 'fair', 'poor'] })
  quality: string;
  @Prop()
  notes: string;
}
const SleepSchema = SchemaFactory.createForClass(Sleep);

@Schema({ timestamps: true })
export class DailyActivity {
  @Prop({ required: true, ref: 'Resident' })
  @ApiProperty({ description: 'Resident ID' })
  resident: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, type: Date })
  @ApiProperty({ description: 'Date of activities' })
  date: Date;

  @Prop({ type: [ActivityDetailSchema], default: [] })
  @ApiProperty({ description: 'List of activities for the day' })
  activities: ActivityDetail[];

  @Prop({ type: MealsSchema, default: () => ({}) })
  @ApiProperty({ description: 'Meal tracking for the day' })
  meals: Meals;

  @Prop({ type: SleepSchema, default: () => ({}) })
  @ApiProperty({ description: 'Sleep tracking' })
  sleep: Sleep;

  @Prop({ type: String })
  @ApiProperty({ description: 'Overall notes for the day' })
  dailyNotes: string;

  @Prop({ type: Boolean, default: false })
  @ApiProperty({ description: 'Whether the day record is completed' })
  isCompleted: boolean;
}

export const DailyActivitySchema = SchemaFactory.createForClass(DailyActivity); 