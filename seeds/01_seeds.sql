

INSERT INTO users (name, email, password)
VALUES ('John Smith', 'johnsmith@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ted Buddy', 'tedbuddy@gmail.com' '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sahara Liston', 'saharaliston@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Seaside Mansion', 'description', https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg, https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg), 2000, 7, 7, 8, 'Canada', '2 Pencil Avenue', 'Markham', 'Ontario', 'L4E1D3', TRUE),
(2, 'Retro Bungalow', 'description', https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg, https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg), 700, 3, 3, 4, 'Canada', '2 Panini Drive', 'Brampton', 'Ontario', 'M4S1D5', TRUE),
(1, 'Urban condo', 'description', https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg, https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg), 300, 0, 2, 1, 'Canada', '2 Croissant Crescent', 'Toronto', 'Ontario', 'P7T1F2', TRUE);

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (2, 1, '2018-09-11', '2018-09-26'),
(3, 2, '2019-01-04', '2019-02-01'),
(1, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (reservation_id, guest_id, property_id, ratings, message)
VALUES (1, 2, 1, 5, '2018-09-26'),
(2, 3, 2, 3, 'message'),
(3, 1, 3, 1, 'message');