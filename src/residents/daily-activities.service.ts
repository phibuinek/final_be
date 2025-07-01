import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DailyActivity, DailyActivityDocument } from './schemas/daily-activity.schema';
import { DailyActivityDto } from './dto/daily-activity.dto';

@Injectable()
export class DailyActivitiesService {
  constructor(
    @InjectModel(DailyActivity.name) private dailyActivityModel: Model<DailyActivityDocument>,
  ) {}

  async create(dailyActivityDto: DailyActivityDto): Promise<DailyActivity> {
    const newActivity = new this.dailyActivityModel(dailyActivityDto);
    return newActivity.save();
  }

  async findByResident(residentId: string, startDate?: Date, endDate?: Date): Promise<DailyActivity[]> {
    const query: any = { resident: residentId };
    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }
    return this.dailyActivityModel.find(query).exec();
  }

  async findOne(id: string): Promise<DailyActivity> {
    const activity = await this.dailyActivityModel.findById(id).exec();
    if (!activity) {
      throw new NotFoundException(`Daily activity record with ID ${id} not found`);
    }
    return activity;
  }

  async findOrCreateForDate(residentId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    let dailyActivity = await this.dailyActivityModel.findOne({
      resident: residentId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (!dailyActivity) {
      dailyActivity = new this.dailyActivityModel({
        resident: residentId,
        date: date,
        activities: [],
        meals: {
          breakfast: { eaten: false },
          lunch: { eaten: false },
          dinner: { eaten: false },
          snacks: []
        },
        sleep: {},
        isCompleted: false
      });
      await dailyActivity.save();
    }

    return dailyActivity;
  }

  async addActivity(id: string, activity: any): Promise<DailyActivity> {
    return this.dailyActivityModel.findByIdAndUpdate(
      id,
      { $push: { activities: activity } },
      { new: true },
    ) as Promise<DailyActivity>;
  }

  async updateActivity(id: string, index: number, activityUpdate: any): Promise<DailyActivity> {
    const key = `activities.${index}`;
    return this.dailyActivityModel.findByIdAndUpdate(
      id,
      { $set: { [key]: activityUpdate } },
      { new: true },
    ) as Promise<DailyActivity>;
  }

  async updateMeals(id: string, meals: any): Promise<DailyActivity> {
    return this.dailyActivityModel.findByIdAndUpdate(
      id,
      { $set: { meals: meals } },
      { new: true },
    ) as Promise<DailyActivity>;
  }

  async updateSleep(id: string, sleep: any): Promise<DailyActivity> {
    return this.dailyActivityModel.findByIdAndUpdate(
      id,
      { $set: { sleep: sleep } },
      { new: true },
    ) as Promise<DailyActivity>;
  }

  async completeDay(id: string): Promise<DailyActivity> {
    return this.dailyActivityModel.findByIdAndUpdate(
      id,
      { isCompleted: true },
      { new: true },
    ) as Promise<DailyActivity>;
  }

  async getActivityStats(residentId: string, startDate: Date, endDate: Date) {
    const activities = await this.findByResident(residentId, startDate, endDate);
    
    return {
      totalActivities: activities.reduce((sum, day) => sum + day.activities.length, 0),
      sleepQuality: activities.reduce((stats, day) => {
        if (day.sleep?.quality) {
          stats[day.sleep.quality] = (stats[day.sleep.quality] || 0) + 1;
        }
        return stats;
      }, { good: 0, fair: 0, poor: 0 }),
      mostCommonMood: this.getMostCommonMood(activities)
    };
  }

  private getMostCommonMood(days: DailyActivity[]): string | null {
    const moodCounts: { [key: string]: number } = days.reduce((counts, day) => {
      day.activities.forEach((activity: any) => {
        if (activity.mood) {
          counts[activity.mood] = (counts[activity.mood] || 0) + 1;
        }
      });
      return counts;
    }, {});

    if (Object.keys(moodCounts).length === 0) {
      return null;
    }

    const [mostFrequentMood] = Object.entries(moodCounts).reduce((a, b) => 
      (a[1] > b[1] ? a : b));
      
    return mostFrequentMood;
  }
} 