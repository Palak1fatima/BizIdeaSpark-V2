
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function IdeaListSkeleton() {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="bg-card">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-5">
                             <Skeleton className="h-12 w-12 rounded-xl mt-1" />
                            <div className="space-y-3 flex-1 pt-1">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </div>
                         <div className="flex items-start gap-3 mt-4">
                            <Skeleton className="h-4 w-4 rounded-full" />
                             <Skeleton className="h-4 w-4/5" />
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                         <Skeleton className="h-8 w-8 rounded-full" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
