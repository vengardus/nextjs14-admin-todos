# DEVELPMENT

## Requisitos

    - pnpm
    - docker

## Pasos para levatar la app en desarrollo

    1. Levantar la BD (postgres establecido en el docker-compose.yml)

    ```bash
    docker compose up -d
    ```

    2. Crear la BD
        - Utilizar la herramienta que utilicen, puede ser [Table Plus](https://tableplus.com/)
        - Yo lo hago desde la terminal (Ubuntu 22.04). 

        ```bash
        sudo docker exec -it nombre_del_contenedor_de_postgres psql -U nombre_de_usuario
        
        # Reemplaza nombre_del_contenedor_de_postgres con el nombre o ID real de tu contenedor PostgreSQL y nombre_de_usuario con el nombre de usuario que tienes configurado en tu base de datos PostgreSQL.
        ```
    3. Hacer una copia de env.template y renombrarla a .env
    4. Reemplaar las variables de entorno
    5. Ejecutar el comando pnpm install
    6. Ejecutar el comando pnpm run dev
    7. Ejecutar los comandos de prisma

    ```bash
    npx prisma migrate dev
    npx prisma generate    
    ```

    5. Ejecutar el SEED para [crear la bd local](localhost:3000/api/seed)

## Prisma comandos

    ```bash
    npx prisma init

    npx prisma migrate dev

    npx prisma generate
    ```
