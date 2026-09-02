import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { db } from "@/lib/db";
import { generateLogo } from "@/lib/ai";

const schema = z.object({
  brandName:z.string().min(1).max(80),
  description:z.string().min(3).max(500),
  style:z.string().min(1).max(40),
  colors:z.string().min(1).max(100)
});

export async function POST(req: Request) {
  const userId = (await cookies()).get("ql_user")?.value;
  if (!userId) return NextResponse.json({error:"Please login first"},{status:401});
  const body = schema.safeParse(await req.json());
  if (!body.success) return NextResponse.json({error:"Invalid logo request"},{status:400});

  const imageUrl = await generateLogo(body.data);
  const project = await db.project.create({
    data:{
      userId,
      brandName:body.data.brandName,
      description:body.data.description,
      style:body.data.style,
      colors:body.data.colors,
      logos:{create:{prompt:JSON.stringify(body.data),imageUrl}}
    },
    include:{logos:true}
  });
  return NextResponse.json(project);
}
