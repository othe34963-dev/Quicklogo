import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function POST(req: Request) {
  const {email,password} = await req.json();
  const user = await db.user.findUnique({where:{email}});
  if (!user || user.passwordHash !== password) return NextResponse.json({error:"Invalid credentials"},{status:401});
  const response = NextResponse.json({ok:true});
  response.cookies.set("ql_user", user.id, {httpOnly:true, sameSite:"lax", secure:process.env.NODE_ENV==="production", path:"/"});
  return response;
}
