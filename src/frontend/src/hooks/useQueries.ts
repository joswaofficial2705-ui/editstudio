import { useMutation, useQuery } from "@tanstack/react-query";
import type { PortfolioItem, PricingPackage } from "../backend.d";
import { useActor } from "./useActor";

export const SAMPLE_PORTFOLIO: PortfolioItem[] = [
  {
    title: "Cinematic Wedding Film",
    description:
      "Full day wedding highlights with color grading and audio mixing",
    category: "Wedding",
    thumbnailUrl: "/assets/generated/portfolio-wedding.dim_600x400.jpg",
  },
  {
    title: "Corporate Brand Video",
    description: "Multi-camera corporate event with professional titles",
    category: "Corporate",
    thumbnailUrl: "/assets/generated/portfolio-corporate.dim_600x400.jpg",
  },
  {
    title: "Teal & Orange Color Grade",
    description: "Cinematic LUT application on urban night footage",
    category: "Color",
    thumbnailUrl: "/assets/generated/portfolio-color-grade.dim_600x400.jpg",
  },
  {
    title: "Product Photography Edit",
    description: "Luxury watch campaign with studio-grade retouching",
    category: "Product",
    thumbnailUrl: "/assets/generated/portfolio-product.dim_600x400.jpg",
  },
  {
    title: "Music Video Edit",
    description: "Fast-paced music video with beat-sync cuts and VFX",
    category: "Music",
    thumbnailUrl: "/assets/generated/portfolio-video-edit.dim_600x400.jpg",
  },
];

export const SAMPLE_PACKAGES: PricingPackage[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for individuals and small projects",
    priceInCents: BigInt(9900),
    features: [
      "Up to 5 minutes final video",
      "Basic color correction",
      "2 revision rounds",
      "48-hour delivery",
      "MP4 export (1080p)",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "Ideal for creators and growing businesses",
    priceInCents: BigInt(24900),
    features: [
      "Up to 15 minutes final video",
      "Advanced color grading",
      "5 revision rounds",
      "24-hour delivery",
      "4K export + social formats",
      "Custom motion graphics",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    description: "Full-service for agencies and enterprises",
    priceInCents: BigInt(59900),
    features: [
      "Unlimited video length",
      "Cinema-grade color grading",
      "Unlimited revisions",
      "12-hour priority delivery",
      "All formats + RAW files",
      "Dedicated editor",
      "Sound design & mixing",
    ],
  },
];

export function usePortfolioItems() {
  const { actor, isFetching } = useActor();
  return useQuery<PortfolioItem[]>({
    queryKey: ["portfolioItems"],
    queryFn: async () => {
      if (!actor) return SAMPLE_PORTFOLIO;
      const items = await actor.getAllPortfolioItems();
      return items.length > 0 ? items : SAMPLE_PORTFOLIO;
    },
    enabled: !!actor && !isFetching,
    placeholderData: SAMPLE_PORTFOLIO,
  });
}

export function usePackages() {
  const { actor, isFetching } = useActor();
  return useQuery<PricingPackage[]>({
    queryKey: ["packages"],
    queryFn: async () => {
      if (!actor) return SAMPLE_PACKAGES;
      const pkgs = await actor.getAllPackages();
      return pkgs.length > 0 ? pkgs : SAMPLE_PACKAGES;
    },
    enabled: !!actor && !isFetching,
    placeholderData: SAMPLE_PACKAGES,
  });
}

export function useCreateCheckout() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (pkg: PricingPackage) => {
      if (!actor) throw new Error("Not connected");
      const successUrl = `${window.location.origin}?checkout=success`;
      const cancelUrl = `${window.location.origin}?checkout=cancel`;
      const url = await actor.createCheckoutSession(
        [
          {
            productName: pkg.name,
            currency: "usd",
            quantity: BigInt(1),
            priceInCents: pkg.priceInCents,
            productDescription: pkg.description,
          },
        ],
        successUrl,
        cancelUrl,
      );
      return url;
    },
    onSuccess: (url: string) => {
      window.location.href = url;
    },
  });
}
