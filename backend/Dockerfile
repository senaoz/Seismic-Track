FROM php:8.3-apache

WORKDIR /var/www/html

COPY . .

RUN apt-get update && \
    apt-get install -y libpng-dev && \
    docker-php-ext-install mysqli && docker-php-ext-enable mysqli

EXPOSE 80

CMD ["apache2-foreground"]