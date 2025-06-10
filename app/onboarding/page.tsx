import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function OnboardingRoute() {
  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      <Card className="w-full max-w-md bg-white shadow-lg shadow-pink-100 rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Step into the world of{" "}
            <span className="text-pink-600">Calenara</span>
          </CardTitle>
          <CardDescription className="text-gray-500 mt-2">
            {" "}
            Let’s get started with a few quick questions to personalize your
            experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="grid gap-y-2">
            <Label>Full Name</Label>
            <Input placeholder="Saung Eaindray Min" />
          </div>
          <div className="grid gap-y-2">
            <label>Username</label>
            <div className="flex rounded-md ">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-200 text-sm text-gray-400">
                SaungEaindrayMin.com/
              </span>
              <Input placeholder="eample-user" className="rounded-l-none" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
