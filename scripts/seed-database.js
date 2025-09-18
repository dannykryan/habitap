const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY
);

// Sample data for seeding
const sampleHabits = [
  {
    habit_name: 'Drink 8 glasses of water',
    completed: false,
  },
  {
    habit_name: 'Exercise for 30 minutes',
    completed: false,
  },
  {
    habit_name: 'Read for 20 minutes',
    completed: true,
  },
  {
    habit_name: 'Meditate for 10 minutes',
    completed: false,
  },
  {
    habit_name: 'Write in journal',
    completed: true,
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Create a test user (or use an existing one)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'dannykryan@gmail.com',
      password: 'password123',
    });

    if (authError && authError.message !== 'User already registered') {
      console.error('Error creating test user:', authError);
      return;
    }

    const userId = authData.user?.id;
    
    if (!userId) {
      console.error('Could not get user ID');
      return;
    }

    console.log('✅ Test user ready:', userId);

    // Insert sample habits
    const habitsToInsert = sampleHabits.map(habit => ({
      ...habit,
      user_id: userId,
    }));

    const { data: habitData, error: habitError } = await supabase
      .from('habit_table')
      .insert(habitsToInsert)
      .select();

    if (habitError) {
      console.error('Error inserting habits:', habitError);
      return;
    }

    console.log('✅ Inserted habits:', habitData.length);

    // Insert some sample habit logs
    const habitLogs = [];
    habitData.forEach(habit => {
      // Add some random logs for the past few days
      for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        habitLogs.push({
          user_id: userId,
          habit_id: habit.habit_id,
          completed_at: date.toISOString(),
        });
      }
    });

    const { data: logData, error: logError } = await supabase
      .from('habit_log')
      .insert(habitLogs)
      .select();

    if (logError) {
      console.error('Error inserting habit logs:', logError);
      return;
    }

    console.log('✅ Inserted habit logs:', logData.length);
    console.log('🎉 Database seeding completed successfully!');
    
    console.log('\n📋 Summary:');
    console.log(`- Test user: dannykryan@gmail.com`);
    console.log(`- Password: password123`);
    console.log(`- Habits created: ${habitData.length}`);
    console.log(`- Habit logs created: ${logData.length}`);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
}

seedDatabase();