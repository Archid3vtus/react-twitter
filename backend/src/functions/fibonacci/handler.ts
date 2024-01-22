import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const fibonacciCalculateNumber = (n: number) =>
  n === 0 || n === 1
    ? n
    : fibonacciCalculateNumber(n - 1) + fibonacciCalculateNumber(n - 2);

const fibonacciSequence = (n: number) => {
  let response = [];

  for (let i = 0; i < n; i++) response.push(fibonacciCalculateNumber(i));

  return response;
};

const fibonacci: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const number = parseInt(event.pathParameters.number);

  return formatJSONResponse({
    sequence: fibonacciSequence(number),
  });
};

export const main = middyfy(fibonacci);
