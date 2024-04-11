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

create table file(
file_name varchar(50) not null,
file_desc varchar(500),
file_url varchar(500),
version_no varchar(50),
upload_date varchar(100),
update_date varchar(100),
user_email varchar(60),
primary key (file_name),
foreign key (user_email) references user(user_email)
);

create table tag (
    tag_id varchar(50) not null,
    tag_name varchar(50) not null,
    primary key (tag_id)
);

create table file_tag (
    file_name varchar(50),
    tag_id varchar(50),
    primary key (file_name, tag_id),
    foreign key (file_name) references file(file_name),
    foreign key (tag_id) references tag(tag_id)
);


-- Select Queries

SELECT * from traveldatabase.admin;
SELECT * from traveldatabase.user;
SELECT * from traveldatabase.file;
SELECT * from traveldatabase.tag;
SELECT * from traveldatabase.file_tag;


-- Drop Queries

drop table traveldatabase.admin;
drop table traveldatabase.user;
drop table traveldatabase.file_tag;
drop table traveldatabase.tag;
drop table traveldatabase.file;

