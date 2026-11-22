services:
  mysql:
    image: mysql:8.4
    container_name: mysql-dev
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: jwtdemo
    ports:
      - "3307:3306"
    volumes:
      - mysql_dev_data:/var/lib/mysql
volumes:
  mysql_dev_data:
  
# stop/wipe data command
# docker compose -f docker-compose.yml down (stop keep data)
# docker compose -f docker-compose.yml down -v (remove everything)