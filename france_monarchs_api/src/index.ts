import { ApolloServer, gql } from "apollo-server";
import fs from "fs-extra";
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLScalarType,
  IntrospectionQuery,
  Kind,
  printSchema,
} from "graphql";
import { Line } from "../types/line";
import { Person } from "../types/person";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: any) {
    return value;
  },
  parseValue(value: any) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const typeDefs = gql`
  scalar Date

  type Line {
    label: String
    suite: [String]
  }

  type HistoricDate {
    date: Date
    precise: Boolean
    format: String
  }

  type Person {
    id: String!
    label: String!
    abstract: String
    birthDate: HistoricDate
    birthPlace: String
    deathDate: HistoricDate
    deathPlace: String
    burialPlace: String
    mother: String
    father: String
    child: [String]
    spouse: [String]
    house: String
    title: String
    activeYearsStartYear: Int
    activeYearsEndYear: Int
  }

  type Query {
    lines: [Line]
    persons: [Person]
  }
`;

const readDataFromDirectory = <T>(directoryName: string): T[] => {
  let file;
  const arr = [];
  const dir = fs.opendirSync(directoryName);

  while ((file = dir.readSync()) !== null) {
    const key = file.name.replace(".json", "");
    const data = fs.readJsonSync(`${directoryName}/${file.name}`);

    arr.push(data);
  }
  dir.closeSync();

  return arr;
};

const lines: Line[] = readDataFromDirectory<Line>("./assets/lines");
const persons: Person[] = readDataFromDirectory<Person>("./assets/persons");

const resolvers = {
  Query: {
    lines: () => {
      return lines;
    },
    persons: () => {
      return persons;
    },
  },
  Date: dateScalar,
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

const buildSchema = async () => {
  const { data } = await server.executeOperation({
    query: getIntrospectionQuery(),
  });
  if (data) {
    const schema = buildClientSchema(data as IntrospectionQuery);
    fs.writeFileSync("schema.graphql", printSchema(schema));
  }
};

buildSchema();

