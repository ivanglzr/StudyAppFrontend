import { redirect } from "next/navigation";

import { UnauthorizedError } from "@/errors/auth.errors";

import { IBadResponse, IResponse } from "@/interfaces/response.interfaces";

export function validateResponse(res: IResponse | IBadResponse) {
  if (res.statusCode === 401) throw new UnauthorizedError("Login unauthorized");
}

export async function handleErrors(err: unknown) {
  "use server";

  if (err instanceof UnauthorizedError) redirect("/login");
}
