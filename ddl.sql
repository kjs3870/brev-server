create database mypage;

grant all privileges on mypage.* to mp@'%' identified by 'Mp123!@#';
flush privileges;