# Desafío QuePlan

Este proyecto trata de un backend en NestJS conetado a una base de datos en Postgres y un frontend en Angular, donde la base de datos emite una notificacion al backend al realizarse un cambio en una tabla, el backend recibe esa notificacion con los cambios realizados y luego emite una notificacion al frontend por medio de web sockets, a su vez el frontend estará escuchando dichas notificaciones y presentando los cambios en tiempo real.

## Instrucciones
Para el correcto funcionamiento del proyecto seguir los siguientes pasos:

##### Primero ir al proyecto "backend" y seguir los pasos de [README.md](https://github.com/Joel2410/DesafioQuePlan/blob/master/backend/README.md)

##### Segundo ir al proyecto "frontend" y seguir los pasos de [README.md](https://github.com/Joel2410/DesafioQuePlan/blob/master/frontend/README.md)

Una vez que los proyectos esten en ejecución podemos validar su funcionamiento aplicando cambios a la tabla directamente en la base de datos.

##### Ej.: 
```UPDATE "my_friends" SET "name" = 'Raúl' WHERE "name" = 'Sebastián';```
