import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useGridView } from "@/contexts/GridViewContext";

export default function GridSlider() {
    const { gridView, setGridView } = useGridView();
    const max = 8;
    const skipInterval = 1; // Set to 1 to allow no text skipping
    const ticks = [...Array(max + 1)].map((_, i) => i).slice(1); // Remove 0 by slicing

    const handleChange = (newValue: number[]) => {
        let selectedValue = newValue[0];
        if (selectedValue === 0) {
            selectedValue = 1;
        }
        setGridView(selectedValue);
    };

    return (
        <div className="space-y-4 m-2">
            <Label className="text-white font-semibold">Adjust Grid View</Label>
            <div>
                <Slider
                    value={[gridView]}
                    onValueChange={handleChange}
                    max={max}
                    aria-label="Slider with ticks"
                />
                <span
                    className="mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium text-muted-foreground"
                    aria-hidden="true"
                >
                    {ticks.map((_, i) => (
                        <span key={i} className="flex w-0 flex-col items-center justify-center gap-2">
                            <span
                                className={cn("h-1 w-px bg-muted-foreground/70", (i + 1) % skipInterval !== 0 && "h-0.5")}
                            />
                            <span className={cn((i + 1) % skipInterval !== 0 && "opacity-0")}>{i + 1}</span>
                        </span>
                    ))}
                </span>
            </div>
        </div>
    );
}
