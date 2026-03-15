import { NextResponse } from "next/server";
import type { ValidationError } from "./validators";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function validationError(errors: ValidationError[]) {
  return NextResponse.json({ success: false, errors }, { status: 400 });
}

export function notFound(message: string) {
  return NextResponse.json({ success: false, error: message }, { status: 404 });
}

export function forbidden(message: string) {
  return NextResponse.json({ success: false, error: message }, { status: 403 });
}

export function serverError(message = "Internal server error") {
  return NextResponse.json({ success: false, error: message }, { status: 500 });
}
