import BuilderLayout from "@/components/BuilderLayout";
import ClientOnly from "@/components/ClientOnly";

export default function BuilderPage() {
    return (
        <ClientOnly>
            <BuilderLayout />
        </ClientOnly>
    );
}
