-- blogs
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  url TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (title, url) VALUES ('A blog without an author or likes', 'www.no-author-no-likes.com');
INSERT INTO blogs (title, author, url) VALUES ('A blog without likes', 'First Author', 'www.no-author-no-likes.com');
INSERT INTO blogs (title, author, url, likes) VALUES ('A blog', 'Second Author', 'www.no-author-no-likes.com', 10);

SELECT * FROM blogs;

-- users

INSERT INTO users (username, name) VALUES ('root', 'Superuser');

SELECT * FROM users;

-- reset

DROP TABLE blogs;
DROP TABLE users;

-- lists

INSERT INTO user_blogs (user_id, blog_id) VALUES (1, 1);
INSERT INTO user_blogs (user_id, blog_id) VALUES (1, 2);

SELECT * FROM user_blogs;