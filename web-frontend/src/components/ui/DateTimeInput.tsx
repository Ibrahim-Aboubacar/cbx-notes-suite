import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useId, useState } from "react";

type DateTimeInputProps = {
    date: Date;
    setDate: (date: Date) => void;
    defaultTimeValue?: string;
    dateLabel?: string;
    timeLabel?: string;
    datePlaceholder?: string;
};
export function DateTimeInput({ date, setDate, defaultTimeValue, dateLabel, timeLabel, datePlaceholder }: DateTimeInputProps) {
    const id = useId();
    const [open, setOpen] = useState(false);

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-3">
                <Label htmlFor={"date-picker" + id} className="px-1">
                    {dateLabel || "Date"}
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" id={"date-picker" + id} className="w-48 justify-between font-normal">
                            {date ? date.toLocaleDateString() : datePlaceholder || "Choisissez une date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="label"
                            disabled={{
                                before: new Date(),
                            }}
                            onSelect={(newDate) => {
                                setDate(newDate || date);
                                setOpen(false);
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor={"time-picker" + id} className="px-1">
                    {timeLabel || "Heure"}
                </Label>
                <Input
                    type="time"
                    id={"time-picker" + id}
                    step="600"
                    onChange={(e) => {
                        const time = e.target.value;
                        const [hours, minutes] = time.split(":").map(Number);
                        const newDate = new Date(date);
                        newDate.setHours(hours, minutes, 0, 0);
                        setDate(newDate);
                    }}
                    defaultValue={defaultTimeValue || "00:00:00"}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
        </div>
    );
}
