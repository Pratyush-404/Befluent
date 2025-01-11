-- Schema for user profiles
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Schema for lesson history
CREATE TABLE lesson_history (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id),
    lesson_id UUID,
    lesson_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress_metrics JSONB,
    ai_interactions JSONB
);

-- Schema for progress metrics
CREATE TABLE progress_metrics (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id),
    lesson_id UUID REFERENCES lesson_history(id),
    metric_name VARCHAR(255),
    metric_value VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Schema for AI interactions
CREATE TABLE ai_interactions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id),
    interaction_type VARCHAR(255),
    interaction_content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
