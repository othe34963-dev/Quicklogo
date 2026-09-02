import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({name:z.string().min(2), email:z.string().email(), password:z.string().min(8)});

export async function POST(req: Request) {
  const body = schema.safeParse(await req.json());
  if (!body.success) return NextResponse.json({error:"Invalid signup data"},{status:400});
  const exists = await db.user.findUnique({where:{email:body.data.email}});
  if (exists) return NextResponse.json({error:"Email already exists"},{status:409});

  // Starter only. Replace with bcrypt/argon2 before production.
  const user = await db.user.create({data:{
    name:body.data.name, email:body.data.email, passwordHash:body.data.password
  }});
  return NextResponse.json({id:user.id});
}
