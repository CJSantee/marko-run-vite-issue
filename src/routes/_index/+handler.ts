import { emitToSocket } from "../../socket";

export async function GET(context, next) {
  emitToSocket('foo', 'bar');

  // do something before calling `next`
  const response = await next();
  // do something with the response from `next`
  return response;
}