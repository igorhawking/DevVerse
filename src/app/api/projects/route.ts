import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// TODO: Substitua por lógica real para obter o userId autenticado
const getUserId = async (req: NextRequest) => {
  // Exemplo: extraia do token ou sessão
  // return user.uid;
  return "USER_ID_AQUI";
};

export async function GET(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const q = query(collection(db, "projects"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body || !body.name) {
    return NextResponse.json({ error: 'Missing project name' }, { status: 400 });
  }
  const docRef = await addDoc(collection(db, "projects"), {
    name: body.name,
    description: body.description || "",
    userId,
    createdAt: new Date(),
  });
  return NextResponse.json({ id: docRef.id, ...body, userId });
}

// PATCH: Update a project (only for owner)
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function PATCH(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  if (!body || !body.id) {
    return NextResponse.json({ error: 'Missing project id' }, { status: 400 });
  }
  try {
    const projectRef = doc(db, "projects", body.id);
    const projectSnap = await getDoc(projectRef);
    if (!projectSnap.exists()) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    const projectData = projectSnap.data();
    if (projectData.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    await updateDoc(projectRef, {
      name: body.name,
      description: body.description || ""
    });
    return NextResponse.json({ id: body.id, name: body.name, description: body.description || "", userId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a project (only for owner)
import { deleteDoc } from "firebase/firestore";

export async function DELETE(req: NextRequest) {
  const userId = await getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  if (!body || !body.id) {
    return NextResponse.json({ error: 'Missing project id' }, { status: 400 });
  }
  try {
    const projectRef = doc(db, "projects", body.id);
    const projectSnap = await getDoc(projectRef);
    if (!projectSnap.exists()) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    const projectData = projectSnap.data();
    if (projectData.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    await deleteDoc(projectRef);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
