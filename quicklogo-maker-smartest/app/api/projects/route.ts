import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function GET() {
  const userId = (await cookies()).get("ql_user")?.value;
  if (!userId) return NextResponse.json({error:"Unauthorized"},{status:401});
  const projects = await db.project.findMany({
    where:{userId}, orderBy:{createdAt:"desc"}, include:{logos:{orderBy:{createdAt:"desc"}}}
  });
  return NextResponse.json(projects);
}
