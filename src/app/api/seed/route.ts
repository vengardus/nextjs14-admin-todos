import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    await prisma.todo.deleteMany(); // delete all

    await prisma.todo.createMany({
      data: [
        { description: 'Ordenar lavandería'},
        { description: 'Ordenar cuarto', complete:true
        },
        { description: 'Ordenar medicinas'},
        { description: 'Ordenar cuentas'},
        { description: 'Hacer presupuesto remodelación del baño'},
      ]
    });

    return new Response(
        JSON.stringify({
            message: "Get Seed",
        }),
        { status: 200 }
    );
}
