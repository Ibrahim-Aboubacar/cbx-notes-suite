import { ChevronDownIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useId, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function TagsSelect({ tags, onSelect, selected }: { tags: { id: string; name: string }[]; selected: string[]; onSelect: (state: { id: string; selected: boolean }) => void }) {
    const id = useId();
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="*:not-first:mt-2">
            <Popover open={open} onOpenChange={setOpen} modal>
                {open && <div className="fixed -inset-150 z-[1]"></div>}
                <PopoverTrigger asChild>
                    <Button id={id} variant="outline" className="w-full justify-between">
                        Selectionnez un tag
                        <ChevronDownIcon className="-me-1 opacity-60" size={16} aria-hidden="true" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0" align="start">
                    <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandList>
                            <CommandEmpty>Aucun tag trouvé!</CommandEmpty>
                            <CommandGroup className="max-h-[20rem] overflow-y-auto">
                                {tags.map((tag) => {
                                    const isSelected = selected.includes(tag.id);
                                    return (
                                        <CommandItem
                                            key={tag.id}
                                            value={tag.name}
                                            onSelect={() => {
                                                onSelect({ id: tag.id, selected: !isSelected });
                                                // setValue(currentValue === value ? "" : currentValue);
                                                setOpen(false);
                                            }}
                                        >
                                            {tag.name}
                                            {isSelected && <CheckIcon size={16} className="ml-auto" />}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
