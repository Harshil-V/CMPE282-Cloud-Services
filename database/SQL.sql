create SCHEMA traveldatabase;

use traveldatabase;
show TABLES;

-- Create Queries

create table admin(
admin_email varchar(30) primary key,
admin_password varchar(20),
admin_fname varchar(30),
admin_lname varchar(30),
join_date datetime);

create table user(
user_email varchar(30) primary key,
user_password varchar(20),
user_fname varchar(30),
user_lname varchar(30),
join_date datetime);


