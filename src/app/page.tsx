import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Brasil from "./home-sections/Brasil";
import Global from "./home-sections/Global";

export default function Home() {
  return (
    <div className="w-full max-w-5xl px-3">
      <Card className="p-4 md:p-8">
        {/* Tabs para trocar os dados entre Brasil e Global */}
        <Tabs defaultValue="account">
          <TabsList className="flex">
            <TabsTrigger value="account" className="w-full">
              Brasil
            </TabsTrigger>
            <TabsTrigger value="password" className="w-full">
              Global
            </TabsTrigger>
          </TabsList>
          {/* Conteúdo para cada um */}
          <div className="mt-6">
            <TabsContent value="account">
              <Brasil />
            </TabsContent>
            <TabsContent value="password">
              <Global />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
