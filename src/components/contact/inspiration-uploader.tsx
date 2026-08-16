import { useEffect, useMemo, useRef } from "react";
import type { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import Cross from "@/assets/svgs/doodle-icons/cross.svg?react";
import ImagePlus from "@/assets/svgs/image-plus.svg?react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Inquiry } from "@/types/inquiry";

export function InspirationUploader({
  field,
  fieldState,
}: {
  field: ControllerRenderProps<Inquiry, "inspirationImages">;
  fieldState: ControllerFieldState;
}) {
  const files = useMemo(() => Array.from(field.value ?? []), [field.value]);
  const previews = useMemo(
    () => files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [files],
  );
  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        URL.revokeObjectURL(preview.url);
      });
    };
  }, [previews]);
  const inputRef = useRef<HTMLInputElement>(null);

  function updateFiles(nextFiles: File[]) {
    const transfer = new DataTransfer();
    nextFiles.forEach((file) => {
      transfer.items.add(file);
    });
    field.onChange(transfer.files);
  }

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel
        htmlFor="inspirationImages"
        className="font-body text-[10px] text-brand-text/60 uppercase tracking-[0.18em]"
      >
        Share your inspiration{" "}
        <span className="text-brand-text/40 normal-case tracking-normal">(optional)</span>
      </FieldLabel>
      <FieldContent className="relative">
        <Input
          ref={inputRef}
          id="inspirationImages"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onClick={(event) => {
            event.currentTarget.value = "";
          }}
          onChange={(event) => updateFiles([...Array.from(event.target.files ?? []), ...files])}
          className="sr-only!"
        />
        {previews.length ? (
          <div className="space-y-4">
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-3">
                {previews.map(({ file, url }, index) => (
                  <CarouselItem
                    key={`${file.name}-${file.lastModified}`}
                    className="basis-82/100 pl-3 sm:basis-1/2"
                  >
                    <div className="relative overflow-hidden border border-brand-detail/60 bg-card/40">
                      <img
                        src={url}
                        alt={`Inspiration reference ${index + 1}: ${file.name}`}
                        className="aspect-4/3 w-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Remove ${file.name}`}
                        onClick={() =>
                          updateFiles(files.filter((_, fileIndex) => fileIndex !== index))
                        }
                        className="absolute top-2 right-2 rounded-full border border-brand-bg/70 bg-brand-bg/90 text-brand-text hover:bg-brand-detail"
                      >
                        <Cross className="w-4" />
                      </Button>
                      <p className="truncate px-3 py-2 font-body text-[10px] text-brand-text/55">
                        {file.name}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 disabled:hidden" />
              <CarouselNext className="right-2 disabled:hidden" />
            </Carousel>
            <Button
              nativeButton={false}
              variant="outline"
              // biome-ignore lint/a11y/noLabelWithoutControl: ()
              render={<label htmlFor={field.name} />}
              className="h-10 w-full rounded-none border-brand-text bg-transparent font-body text-[10px] uppercase tracking-[0.18em] hover:bg-brand-detail"
            >
              Add another reference <ImagePlus className="ml-2 w-4" />
            </Button>
          </div>
        ) : (
          <Empty className="border border-brand-detail/70 border-dashed bg-card/25 px-5 py-8">
            <EmptyHeader>
              <EmptyMedia variant="icon" className="bg-brand-detail/25 text-brand-text">
                <ImagePlus className="w-4" />
              </EmptyMedia>
              <EmptyTitle className="font-heading font-normal text-lg">
                No references yet
              </EmptyTitle>
              <EmptyDescription className="font-body text-brand-text/55 text-xs">
                Add screenshots or moodboards if you already have a feeling in mind.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                nativeButton={false}
                variant="outline"
                // biome-ignore lint/a11y/noLabelWithoutControl: ()
                render={<label htmlFor={field.name} />}
                className="h-10 rounded-none border-brand-text bg-transparent font-body text-[10px] uppercase tracking-[0.18em] hover:bg-brand-detail"
              >
                Choose images <ImagePlus className="ml-2 w-4" />
              </Button>
            </EmptyContent>
          </Empty>
        )}
        <FieldError errors={[fieldState.error]} />
      </FieldContent>
    </Field>
  );
}
