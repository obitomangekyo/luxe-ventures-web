import { Cancel01Icon, ImageAdd01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useMemo } from "react";
import type { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Inquiry } from "@/types/inquiry";

const MAX_REFERENCE_IMAGES = 6;
const MAX_REFERENCE_FILE_SIZE = 10 * 1024 * 1024;

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

  function formatFileSize(bytes: number) {
    if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function updateFiles(nextFiles: File[]) {
    const transfer = new DataTransfer();
    nextFiles
      .filter((file) => file.size <= MAX_REFERENCE_FILE_SIZE)
      .slice(0, MAX_REFERENCE_IMAGES)
      .forEach((file) => {
        transfer.items.add(file);
      });
    field.onChange(transfer.files);
  }

  return (
    <Field className="col-span-full font-semibold text-sm" data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name} className="font-[weight:inherit]">
        Share the vibe <span className="font-normal text-brand-detail">(optional)</span>
      </FieldLabel>
      <FieldContent className="relative">
        <Input
          id={field.name}
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
                    <div className="group/preview relative overflow-hidden border border-brand-text/20 bg-white shadow-[5px_5px_0_rgb(17_17_17/0.1)]">
                      <img
                        src={url}
                        alt={`Uploaded inspiration ${index + 1}, ${file.name}`}
                        width={640}
                        height={480}
                        loading="lazy"
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
                        className="absolute top-3 right-3 rounded-full border border-brand-text/20 bg-white/95 text-brand-text shadow-sm hover:bg-brand-accent hover:text-white"
                      >
                        <HugeiconsIcon icon={Cancel01Icon} className="w-4" />
                      </Button>
                      <div className="flex items-center justify-between gap-3 border-brand-text/10 border-t px-3 py-2.5">
                        <p className="truncate font-body text-[10px] text-brand-text/70">
                          {file.name}
                        </p>
                        <span className="shrink-0 font-body text-[10px] text-brand-detail">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
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
              className="h-11 w-full rounded-none border-brand-text bg-brand-text font-body text-[10px] text-white uppercase tracking-[0.18em] hover:bg-brand-accent"
            >
              Add another reference <HugeiconsIcon icon={ImageAdd01Icon} className="ml-2 w-4" />
            </Button>
          </div>
        ) : (
          <Empty className="rounded-none border border-brand-text/25 border-dashed bg-brand-accent/5 px-5 py-8 shadow-[5px_5px_0_rgb(17_17_17/0.08)]">
            <EmptyHeader>
              <EmptyMedia variant="icon" className="rounded-none bg-brand-text text-brand-accent">
                <HugeiconsIcon icon={ImageAdd01Icon} className="w-4" />
              </EmptyMedia>
              <EmptyTitle className="font-heading font-normal text-xl">
                Show us the feeling
              </EmptyTitle>
              <EmptyDescription className="font-body text-brand-text/60 text-xs leading-5">
                Add screenshots, palettes, or moodboards if you already have a direction in mind.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                nativeButton={false}
                variant="outline"
                // biome-ignore lint/a11y/noLabelWithoutControl: ()
                render={<label htmlFor={field.name} />}
                className="h-11 rounded-none border-brand-text bg-transparent font-body text-[10px] uppercase tracking-[0.18em] hover:bg-brand-text hover:text-white"
              >
                Choose images <HugeiconsIcon icon={ImageAdd01Icon} className="ml-2 w-4" />
              </Button>
            </EmptyContent>
          </Empty>
        )}
        <FieldDescription>
          Up to six reference images · JPG, PNG, or WEBP · 10 MB each.
        </FieldDescription>
        <FieldError errors={[fieldState.error]} />
      </FieldContent>
    </Field>
  );
}
