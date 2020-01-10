INSERT INTO users(id, name, email, password)

VALUES (1, 'Maria', 'maria@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Joao', 'joao@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Jose', 'jose@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties(id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, city, street, province, post_code, active)

VALUES (1, 1,'house','close to the lake','http//somenthing.com', 'http//hahaha.com',120, 1, 1, 1,'Canada', 'Toronto', 'Dundas street', 'ON', 'm5a23w', true),

(2, 2,'Duplex','close to the shopping','https://i.pinimg.com/originals/12/20/15/1220152ec94842a895f76d78fb66ec57.jpg', 'https://i.pinimg.com/originals/12/20/15/1220152ec94842a895f76d78fb66ec57.jpg',90, 1, 1, 1,'Canada','Quebec', 'jarvis street', 'QC', 'k1a54e', true),

(3, 3, 'duplex', 'Amazing restaurants','http//kijiii.com', 'http//photo.com',150, 1, 3, 3, 'Canada','Hamilton', 'church street', 'ON', '35w2xa', false);

INSERT INTO reservations (id, guest_id, property_id, start_date, end_date)
VALUES (1, 1, 1, '2018-09-11', '2018-09-26'),
(2, 2, 2, '2019-01-04', '2019-02-01'),
(3, 3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews(id, guest_id, property_id, reservation_id, rating,message)
VALUES(1, 1, 1, 2, 5, 'amazing'),
(2, 2, 2, 3, 3, 'very good'),
(3, 3, 3, 2, 1, 'terrible');