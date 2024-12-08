import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // リクエストのホストを取得（例：192.168.1.1 または sample.com）
    const host = request.headers.get("host")?.split(":")[0];

    if (!host) {
      return NextResponse.json({ error: "Host not found" }, { status: 400 });
    }

    // バックエンドのURLを構築
    const backendUrl = `http://${host}:3001/api/leases/v4`;

    const response = await fetch(backendUrl);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
