---
title: Basic server with NestJs.
excerpt: A simple node typescript server with NestJs with Graphql and Rest APIs.
Tools: ["NestJs", "Webpack', "Typescript", "Graphql"]
---

# NestJs with Grpahql and Rest API

This is a simple practice repository to try out NestJs and see how to implement basic Rest and Graphql endpoints with it.

## Scope

- Rest Endpoints
  - SignIn
  - SignUp
- Graphql
  - Create Notes
  - View own Notes

## Local Development

- Run `npm ci` to install all deps.
- Run migrations to build the sqlite database - `npm run run:migration`.
- Then run `npm run start:dev` to run the server in development mode.
- Now we can access the Rest endpoint at `http://localhost:3000` and Graphql `http://localhost:3000/graphql`
- If you are using VsCode and have the `REST Client` extension, you can run the rest api directly from the editor. For that I have added a `src\requests.http` file, just open that and then you can do the signIn and signUp call from there.
- For the Graphql endpoints, we would first need the access token, which can be copied from the response of the `signIn` Rest api.
- After that in the Graphql playground at `http://localhost:3000/graphql` add the following HTTP header
  ```js
  {
  "Authorization": "<token u copied>"
  }
  ```

## DB setup with TypeORM

- For DB operations we will use TypeORM.
- For DB we will use sqlite, since its file based.
- We are using a config file `ormconfig.js` for TypeORM to have different configuration for environments.
- We use a '.js' extension as we don't run any transpiler through it. And `node` out of box understands js.
- Now let's configure the TypeORM in the App module as root.
- Then we create entity file for the models.
- In order to generate the repository service automatically we just configure each module with TypeORM and the entity we need the repo for.
  `TypeOrmModule.forFeature([Note])` - This will generate the Note Repository automatically from the entity with all basic DB operations.

### To auto generate files:

- Module -
  `nest generate module notes` - generates a folder `notes` under `src` folder and creates a `notes.module.ts` under it.
- Controller -
  `nest generate controller notes/notes --flat`. Generates a notes controller file under notes folder and it also updates the `module` file to add the newly created controller. `--flat` specifies not to create extra folder called 'controller' for the controller files.

## Authorization

### Rest End Point

- In order to secure the rest end point we are using cookie session.
- This is a simple approach where we store the userId of the logged in user in session and receive that in every request to verify if the user accessing is logged or not.

#### Graphql

- In order to protect our Grpahql endpoint we switched to using JWT instead of session, as the Grpahql has a no concept of session and does not share the server session we created with Rest API.
- To have JWT access in all module we created a Core module and register the JWT there and exposed it.
- Then we included the Core module in the main App Module.
- We have used Middleware a lot to intercept the request and add auth gaurds.
- To generate the typing for graphql run - `ts-node generate-typings`
