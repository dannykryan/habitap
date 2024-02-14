# Habitap

![Habitap Header Image](/public/assets/readme/habitap-demo-small.gif)

Try Now: https://habitap.vercel.app/

Video: [Introducing Habitap](https://youtu.be/i2uwY6e7KoY?si=vTsemKo-X-czdcyx)

## Overview

Habitap is a mobile-first application that is designed to help its users to establish good habits. Users can commit to up to 5 habits for a chosen number of days and Habitap will give the user a visual representation of their progress in the form of a ‘habit flower’ which starts as a sapling and grows into a beautiful bouquet of flowers as your ability to stick to your habits increases. Those who manage to complete over 70% of their committed habits will even attract bees! Invite your friends or family to join your ‘hive’ to check to see who is sticking to their habits and who could benefit from a friendly nudge!.

### Technologies

- React, Next.js, Typescript, Supabase, Vercel, vanilla CSS

### Design Tools

- Figma, Adobe Illustrator, After Effects and Photoshop, LottieFiles

---

### Features

When a user first visits Habitap, they will be required to register to use the platform so that they can be given an individualised experience. When logging in for the first time, the user is taken to the commitment page and a dialogue box appears which asks them to enter up to five daily habits to track for ten days.

Once committed, the user can then proceed to tick off each of their habits as they complete them each day. Only one tick per day for each habit is allowed. Any attempt to ‘untick’ or ‘double-tick’ a habit and the user will be given a message telling them to come back tomorrow.

After ticking off some habits, the user can return to the flower page to watch as their habit plant grows depending on how well they have adhered to their habit commitment.

If the user would like to view their personal information, they can visit the settings page where they can see their name, email, username and profile photo. By clicking ‘edit’ on this page, they can update any of the information stored for themselves including a new url string to the location of an updated profile photo, if they so choose.

---

### How does the scoring work?

The progress of the flower’s growth depends on the user’s percentage of a total possible score. So, for a user that has committed to 5 habits for 10 days, they have a total possible score of 50 (5 * 10 = 50). Let’s now say that that user has ticked off all of their habits for the first five days, this gives them a score of 25 (5 * 5 = 25), or 50% of the total possible score of 50. The following chart will show how that percentage is reflected in the flower animation:

#### Plant Growth Status Chart

| Percentage of total possible score | Status of plant growth          |
| ---------------------------------- | ------------------------------- |
| 10%                                | 1 full flower                   |
| 20%                                | 2 full flowers                  |
| 30%                                | 3 full flowers                  |
| 40%                                | 4 full flowers                  |
| 50%                                | 5 full flowers                  |
| 60%                                | 6 full flowers                  |
| 70%                                | 7 full flowers (maximum growth) |
| 80%                                | Your first bee                  |
| 90%                                | Two bees                        |
| 100%                               | Queen Bee (perfect score!)      |

You will see from the table above that it’s only those that have scores above 70% that will be able to attract bees to their habit flower. The queen bee will only visit those with a perfect score and therefore, will only be unlocked on the final day of the commitment if the user has completed all of their habits.

---

## How to Play

Watch a quick demo video: https://youtu.be/G5pAIrBaXzo

#### Register:

To start tracking your habits with Habitap, simply visit the application [HERE](https://habitap.vercel.app/). If this marks your first visit, input your email and password, then click the register button. This action registers you in our database and triggers a confirmation email to the provided email address. Click the link in this email to verify your registration. Now you can return to the app to log in using your registered credentials.

#### Make a Commitment:

Once logged in, navigate to the checklist page and dismiss the welcome message. Now, enter up to 5 good habits in the inputs that you aim to accomplish daily before clicking ‘commit’. A popup will then confirm the number of habits and the duration of your commitment.

#### Nurture Your Habit Flower:

Once you've committed to your habits, you can begin marking off those you've completed for the day. Remember, each habit can only be ticked off once per day throughout your commitment period. As progress accumulates, head over to the flower page to visualize your journey. Completing all habits for the first day should yield at least one fully bloomed flower. For detailed insights on how your score influences the animation, consult the plant growth status chart.

#### Update Your Personal Details:

Users have the flexibility to revise their personal information conveniently by navigating to the settings page. Here, you can modify your first name, last name, and username. To update your profile picture, simply provide a new URL directing to the desired image location online.

## Demo Buttons

Habitap includes built-in demo buttons conveniently located just below the flower, enabling developers to preview some of its features easily:

- The green button initiates the animation of the flower's growth from 0% to 100%. click again to preview our bee animations. This does not affect the user's progress and return to normal after 30 seconds.
- The orange button will advance time by ten days, thereby ending the current commitment and allowing users to start a new one.

## Installation

To work with Habitap, follow these steps:

1. Start a new project in your IDE.
2. Clone down the repo:
   ```
   git clone https://github.com/dannykryan/habitap.git
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a new `.env` file and add your Supabase URL and Key:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```
   Make sure to replace `your_supabase_url` and `your_supabase_key` with your actual Supabase URL and Key.
5. Habitap uses four seperate tables in a Supabase database, three of which are defined below.
   The fourth table is the default supabase auth table that comes as standard with every new project and shoudn't need to be set up.
   Refer to the [Supabase Docs](https://supabase.io/docs) for details on setting up a new project in Supabase.

   The 'habit_log' table is used to store a record of every habit that is ticked off by each user:
   ```
   create table
   public.habit_log (
   habit_id uuid not null,
   completed_at timestamp with time zone not null default now(),
   user_id text null,
   constraint habit_log_pkey primary key (habit_id),
   constraint habit_log_habit_id_fkey foreign key (habit_id) references habit_table (habit_id)
   ) tablespace pg_default;
   ```
   
   The 'habit_table' table stores the habits that each user has committed to:
   ```
   create table
   public.habit_table (
   habit_id uuid not null default gen_random_uuid (),
   created_at timestamp with time zone not null default now(),
   habit_name text null,
   days_committed bigint null,
   user_id text null,
   constraint habit_table_pkey primary key (habit_id)
   ) tablespace pg_default;
   ```

   Finally, the 'profiles' table is used to store user information and preferences:
   ```
   create table
   public.profiles (
   id uuid not null default gen_random_uuid (),
   updated_at timestamp with time zone not null default now(),
   username text null,
   full_name text null,
   profile_pic_url text null,
   constraint profiles_pkey primary key (id)
   ) tablespace pg_default;
   ```

## Credits

The original Habitap team:

- Danny Ryan - https://github.com/dannykryan
- Liz Robson - https://github.com/liz-robson
- Luis Rodriguez Valido - https://github.com/LuisValrod
- Ana Raducanu - https://github.com/AnaRaducan
- Spencer Ley - https://github.com/Spencerley
