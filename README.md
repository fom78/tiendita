
## Tiendita



# Cypress

- instalarlo

```bash
npm install cypress --save-dev
```
- Lo ejecutamos

```bash
npx cypress open
```

- En el cypress.json le decimos cual es la url base

```json
{
    "baseUrl":"http://localhost:3000"
}
```

- En la carpeta cypress, creamos un tsconfig.json, es para manejar las configuraciones para cypress, similar al tsconfig de la aplicacion.

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": false,
    "jsx": "preserve",
    "types": ["cypress"]
  },
  "include": [
    "./"
  ],
}
```

# React JEST

- Instalamos dependencias de desarrollo

```bash
npm install --save.dev jest ts-jest @types/jest @testing-library/react
```

- Luego ejecutamos el siguiente comando para crear el json de configuracion

```bash
npx ts-jest config:init
```

Como resultado tenemos el archivo: jest.config.js

- Jest dom
```bash
npm install --save-dev @testing-library/jest-dom
```
- Correr los test con jet

```bash
npx jest
```

min 1:23:51

