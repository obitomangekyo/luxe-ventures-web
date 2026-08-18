import { useCallback, useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  root?: Element | null;
  onChange?: (inView: boolean) => void;
}

export function useInView<T extends Element>(options: UseInViewOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "200px",
    triggerOnce = true,
    root = null,
    onChange,
  } = options;
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<T>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const callbackRef = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        onChangeRef.current?.(true);
        if (triggerOnce) {
          setHasTriggered(true);
        }
      } else if (!triggerOnce) {
        setIsInView(false);
        onChangeRef.current?.(false);
      }
    },
    [triggerOnce],
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || (triggerOnce && hasTriggered)) return;

    const observer = new IntersectionObserver(callbackRef, { threshold, rootMargin, root });
    observer.observe(node);

    return () => observer.disconnect();
  }, [callbackRef, threshold, rootMargin, root, triggerOnce, hasTriggered]);

  return { ref, isInView: triggerOnce ? isInView || hasTriggered : isInView };
}
