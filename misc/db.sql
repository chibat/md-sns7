CREATE TABLE app_user (
id SERIAL PRIMARY KEY,
google_id TEXT,
account TEXT,
name TEXT,
picture TEXT,
notification BOOLEAN DEFAULT false,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT app_user_google_id UNIQUE(google_id)
);

CREATE TABLE post (
 id SERIAL PRIMARY KEY,
 user_id INTEGER REFERENCES app_user(id) ON DELETE CASCADE,
 source TEXT,
 updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX post_user_id ON post(user_id);
CREATE INDEX post_source_index ON post USING pgroonga (source);

CREATE TABLE revision (
 id SERIAL PRIMARY KEY,
 post_id INTEGER,
 source TEXT,
 updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX revision_post_id ON revision(post_id);

CREATE OR REPLACE FUNCTION insert_revision() RETURNS TRIGGER AS $insert_revision$
    BEGIN
        IF (TG_OP = 'DELETE' OR TG_OP = 'UPDATE') THEN
            INSERT INTO revision(post_id, source, created_at) SELECT OLD.id, OLD.source, OLD.created_at;
            RETURN OLD;
        END IF;
        RETURN NULL;
    END;
$insert_revision$ LANGUAGE plpgsql;

CREATE TRIGGER insert_revision_trigger
AFTER UPDATE OR DELETE ON post
FOR EACH ROW EXECUTE PROCEDURE insert_revision();

CREATE TABLE app_session (
 id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
 user_id INTEGER NOT NULL REFERENCES app_user(id) ON DELETE CASCADE,
 updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX app_session_user_id ON app_session(user_id);

CREATE TABLE comment (
 id SERIAL PRIMARY KEY,
 post_id INTEGER REFERENCES post(id) ON DELETE CASCADE,
 user_id INTEGER REFERENCES app_user(id) ON DELETE CASCADE,
 source TEXT,
 updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX comment_post_id ON comment(post_id);

CREATE TABLE follow (
 user_id INTEGER REFERENCES app_user(id) ON DELETE CASCADE,
 following_user_id INTEGER,
 updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (user_id, following_user_id)
);

CREATE TYPE notification_type AS ENUM ('follow', 'like', 'comment');

CREATE TABLE notification (
 id SERIAL PRIMARY KEY,
 user_id INTEGER REFERENCES app_user(id) ON DELETE CASCADE,
 type notification_type NOT NULL,
 action_user_id INTEGER REFERENCES app_user(id) ON DELETE CASCADE,
 post_id INTEGER REFERENCES post(id) ON DELETE CASCADE,
 updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX notification_user_id ON notification(user_id);

CREATE TABLE likes (
 user_id INTEGER REFERENCES app_user(id) ON DELETE CASCADE,
 post_id INTEGER REFERENCES post(id) ON DELETE CASCADE,
 updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (user_id, post_id)
);

