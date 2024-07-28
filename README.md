# Movie API with NestJS

## Developed by : [Enes Şahin](www.http://linkedin.com/enescyc)

#### For Start the project
```bash
  host: process.env.PG_HOST || "localhost",
  port: Number(process.env.PG_PORT) || 5432 as number,
  username: process.env.PG_USERNAME || "root",
  password: process.env.PG_PASSWORD || "root",
  database: process.env.PG_DATABASE || "root",
  $ docker-compose up --build
```
Default users are created with the following credentials when the project is started.
```bash
  username: "customer",
  password: "customer",
  
  username: "manager",
  password: "manager",
```

You need MANAGER role to create,delete or update a movie. You can use the following credentials to get MANAGER role.
```bash
  username: "manager",
  password: "manager",
```