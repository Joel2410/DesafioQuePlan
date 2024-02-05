# Backend

Este proyecto fue generado con [Nest](https://github.com/nestjs/nest-cli) versión 10.3.0.

## Instalación

```bash
$ npm install
```

## Configuración

<p>
1. Buscar el archivo "docker-compose.yml" y cambiar las credenciales de Postgres y pgAdmin.
</p>

<p>
2. Buscar el archivo ".env.example" y cambiarle el nombre a ".env", luego cambiar las credenciales con las que pusieron en "docker-compose.yml"
</p>

<p>
3. Buscar el archivo "config/config.json" y cambiar las credenciales con las que pusieron en "docker-compose.yml"
</p>

<p>
4. Ejecutar docker
</p>

```bash
$ docker compose up
```

<p>
5. Ejecutar las migraciones:
</p>

```bash
$ npx sequelize-cli db:migrate
```

<p>
5. Ejecutar los seeders:
</p>

```bash
$ npx sequelize-cli db:seed:all
```

## Ejecutar la aplicación

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

