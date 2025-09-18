-- Enable RLS (Row Level Security)
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Create habit_table
CREATE TABLE IF NOT EXISTS public.habit_table (
    habit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    habit_name TEXT,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create habit_log table (based on your context code usage)
CREATE TABLE IF NOT EXISTS public.habit_log (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    habit_id UUID REFERENCES public.habit_table(habit_id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on tables
ALTER TABLE public.habit_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habit_log ENABLE ROW LEVEL SECURITY;

-- Create policies for habit_table
CREATE POLICY "Users can view own habits" ON public.habit_table
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own habits" ON public.habit_table
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own habits" ON public.habit_table
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own habits" ON public.habit_table
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for habit_log
CREATE POLICY "Users can view own habit logs" ON public.habit_log
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own habit logs" ON public.habit_log
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own habit logs" ON public.habit_log
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own habit logs" ON public.habit_log
    FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS habit_table_user_id_idx ON public.habit_table(user_id);
CREATE INDEX IF NOT EXISTS habit_log_user_id_idx ON public.habit_log(user_id);
CREATE INDEX IF NOT EXISTS habit_log_habit_id_idx ON public.habit_log(habit_id);