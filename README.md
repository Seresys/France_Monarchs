## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

You'll need either yarn (recommended) or npm to start the project.

- npm ([npm official documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))
  ```sh
  npm install npm@latest -g
  ```
- yarn
  ```sh
  npm install --global yarn
  ```

### Installation and set up

1. Clone the repo

```sh
git clone https://github.com/Seresys/France_Monarchs.git
```

2. Install packages

```sh
yarn
```

3. Build dist in watch mode for server

```sh
cd france_monarchs_api/
tsc -w
```

4. Start server

```sh
yarn start
```

5. Start app

```sh
cd ../france_monarchs_app/
yarn dev
```

You should now be able to test your GraphQL request on [http://localhost:4000/](http://localhost:4000/) and see the app on [http://localhost:3000/](http://localhost:3000/).

If you need to generate GraphQL schema:

```sh
yarn relay-compiler
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
