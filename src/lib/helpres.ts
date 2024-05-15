import { NextResponse } from "next/server";
import { ZodError } from "zod";

type EnvVariableKey = "JWT_SECRET_KEY" | "JWT_EXPIRES_IN";

export function getEnvVariable(key: EnvVariableKey): string {
  const value = process.env[key];
  if (!value || value.length === 0) {
    console.error(`The environment variable ${key} is not set.`);
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
}

export function getErrorResponse(
  status: number = 500,
  message: string,
  errors: ZodError | null = null,
) {
  return NextResponse.json(
    {
      status: status < 500 ? "fail" : "error",
      message,
      errors: errors,
    },
    { status, headers: { "Content-Type": "application/json" } },
  );
}
