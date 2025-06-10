"use server";

import prisma from "./lib/db";
import requireUser from "./lib/requireUser";

export async function OnboardingAction (){
    const session = await requireUser();
    const data = await prisma.user.update({
        where:{
            id:session.user?.id
        },
        data:{
            
        }
        
    })
}