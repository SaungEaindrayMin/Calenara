import { PrismaClient, PlanType } from '../app/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.plan.deleteMany();

  const freePlan = await prisma.plan.create({
    data: {
      name: 'Free',
      description: 'Basic features for personal use',
      price: 0,
      type: PlanType.FREE,
      features: ['Access to home page', 'View features page', 'View pricing page'],
    },
  });

  const proPlan = await prisma.plan.create({
    data: {
      name: 'Pro',
      description: 'Advanced features for professionals',
      price: 10,
      type: PlanType.PRO,
      features: [
        'All Free features',
        'Login with OAuth',
        'Create event types',
        'Manage availability',
        'Booking page',
      ],
    },
  });

  const plusPlan = await prisma.plan.create({
    data: {
      name: 'Plus',
      description: 'Premium features for teams',
      price: 20,
      type: PlanType.PLUS,
      features: [
        'All Pro features',
        'Team scheduling',
        'Advanced integrations',
        'Priority support',
        'Custom branding',
      ],
    },
  });

  console.log({ freePlan, proPlan, plusPlan });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
