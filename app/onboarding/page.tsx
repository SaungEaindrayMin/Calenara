import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function OnboardingRoute() {
  return (
    <div className="min-h-screen w-screen flex justify-center items-center bg-gradient-to-tr from-pink-50 via-white to-pink-100 px-4">
      <Card className="w-full max-w-lg bg-white/70 backdrop-blur-md shadow-xl rounded-3xl border border-pink-100">
        <CardHeader className="text-center space-y-2 pt-6 px-6">
          <CardTitle className="text-3xl font-extrabold text-gray-800">
            Step into the world of{" "}
            <span className="text-pink-600">Calenara</span>
          </CardTitle>
          <CardDescription className="text-gray-500 text-base">
            Let’s get started with a few quick questions to personalize your
            experience.
          </CardDescription>
        </CardHeader>
        <form action="">
          <CardContent className="flex flex-col gap-6 px-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Full Name
              </Label>
              <Input
                placeholder="Saung Eaindray Min"
                className="rounded-xl border-gray-300 focus:ring-pink-500 focus:border-pink-500 mt-2"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Username
              </Label>
              <div className="flex overflow-hidden rounded-xl border border-gray-300 bg-gray-100 mt-2">
                <span className="flex items-center px-3 text-gray-500 text-sm bg-gray-200">
                  SaungEaindrayMin.com/
                </span>
                <Input
                  placeholder="example-user"
                  className="flex-1 border-none rounded-none focus:ring-pink-500 focus:border-pink-500 "
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-2 mt-4">
            <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white text-base font-semibold rounded-xl transition-all duration-200 shadow-md">
              Continue
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
