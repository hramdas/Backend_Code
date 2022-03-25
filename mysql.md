* Ubuntu
``` ruby
sudo mysql -u root
```
* MySQL commands
```ruby
show databases;

create database test;

use test;

create table users (id int auto_increment primary key, name varchar(50), dob date);

show tables;

describe users;

drop table users;

create table users (id int auto_increment primary key, name varchar(50) not null, dob date not null);

insert into users (name, dob) values ("Ramdas", "1998-05-29");

select * from users;

select name  from users;

select id, name from users where id = 1;

update users set name = "Ram";

update users set name = "Ramdas" where id = 1;







```
