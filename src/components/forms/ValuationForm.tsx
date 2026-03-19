"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BedDouble, User, CheckCircle, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import { getSiteConfig } from '@/lib/config';
import { submitLead } from '@/lib/leads';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const propertyTypes = [
  { value: 'house', label: 'House' },
  { value: 'flat', label: 'Flat' },
  { value: 'bungalow', label: 'Bungalow' },
  { value: 'other', label: 'Other' },
] as const;

const bedroomOptions = ['1', '2', '3', '4', '5+'] as const;

const conditionOptions = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Needs Some Work' },
  { value: 'poor', label: 'Needs Major Work' },
] as const;

const timeframeOptions = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-month', label: 'Within 1 Month' },
  { value: '1-3-months', label: '1-3 Months' },
  { value: '3-plus-months', label: '3+ Months' },
  { value: 'just-curious', label: 'Just Curious' },
] as const;

const formSchema = z.object({
  propertyType: z.string().min(1, 'Please select a property type'),
  postcode: z.string().min(3, 'Please enter a valid postcode').max(10),
  bedrooms: z.string().min(1, 'Please select the number of bedrooms'),
  condition: z.string().min(1, 'Please select the property condition'),
  timeframe: z.string().min(1, 'Please select your timeframe'),
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number').max(15),
});

type FormData = z.infer<typeof formSchema>;

const TOTAL_STEPS = 3;

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

export default function ValuationForm() {
  const config = getSiteConfig();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: '',
      postcode: '',
      bedrooms: '',
      condition: '',
      timeframe: '',
      name: '',
      email: '',
      phone: '',
    },
  });

  const watchedValues = watch();

  // Pre-fill postcode from hero section
  useEffect(() => {
    // Check sessionStorage first (in case hero was submitted before this mounted)
    const stored = sessionStorage.getItem("heroPostcode");
    if (stored) {
      setValue("postcode", stored, { shouldValidate: true });
      sessionStorage.removeItem("heroPostcode");
    }
    // Listen for live hero postcode submissions
    function onHeroPostcode(e: Event) {
      const postcode = (e as CustomEvent).detail;
      if (postcode) {
        setValue("postcode", postcode, { shouldValidate: true });
      }
    }
    window.addEventListener("heroPostcode", onHeroPostcode);
    return () => window.removeEventListener("heroPostcode", onHeroPostcode);
  }, [setValue]);

  const goToStep = async (nextStep: number) => {
    if (nextStep > step) {
      let fieldsToValidate: (keyof FormData)[] = [];
      if (step === 1) fieldsToValidate = ['propertyType', 'postcode'];
      if (step === 2) fieldsToValidate = ['bedrooms', 'condition', 'timeframe'];
      const valid = await trigger(fieldsToValidate);
      if (!valid) return;
    }
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitLead({
        formType: "valuation",
        name: data.name,
        email: data.email,
        phone: data.phone,
        propertyType: data.propertyType,
        postcode: data.postcode,
        bedrooms: data.bedrooms,
        condition: data.condition,
        timeframe: data.timeframe,
      });

      if (result.ok) {
        setIsSubmitted(true);
      } else if (result.fallbackUrl) {
        // Webhook down or placeholder — open mailto fallback then show success
        window.open(result.fallbackUrl, "_blank");
        setIsSubmitted(true);
      } else {
        setSubmitError("Something went wrong. Please try again or call us directly.");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-2xl p-8 text-center space-y-4"
        id="valuation-form"
      >
        <CheckCircle className="h-16 w-16 text-accent mx-auto" />
        <h3 className="text-2xl font-bold text-card-foreground">Thank You!</h3>
        <p className="text-muted-foreground">
          We have received your details and will be in touch within 24 hours with your free cash offer.
        </p>
        <p className="text-sm text-muted-foreground">
          Need an immediate response? Call us at{' '}
          <a href={"tel:" + config.brand.phone.replace(/\s+/g, "")} className="text-accent font-semibold hover:underline">
            {config.brand.phone}
          </a>
        </p>
      </motion.div>
    );
  }

  return (
    <div id="valuation-form" className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl">
      <h3 className="text-xl md:text-2xl font-bold text-card-foreground text-center mb-2">
        Get Your Free Cash Offer
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Fill in a few details and receive your no-obligation offer within 24 hours.
      </p>

      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                s <= step
                  ? 'bg-accent text-background'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {s < step ? <CheckCircle className="h-4 w-4" /> : s}
            </div>
            {s < TOTAL_STEPS && (
              <div
                className={cn(
                  'w-8 h-0.5 transition-colors',
                  s < step ? 'bg-accent' : 'bg-muted'
                )}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Home className="h-5 w-5" />
                <span className="text-sm font-medium">Step 1: Property Details</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-3">
                  Property Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setValue('propertyType', type.value, { shouldValidate: true })}
                      className={cn(
                        'p-3 rounded-lg border text-sm font-medium transition-colors',
                        watchedValues.propertyType === type.value
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border text-card-foreground hover:border-accent/50'
                      )}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
                {errors.propertyType && (
                  <p className="text-destructive text-sm mt-1">{errors.propertyType.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="postcode" className="block text-sm font-medium text-card-foreground mb-2">
                  Postcode
                </label>
                <Input
                  id="postcode"
                  placeholder={config.location.postcode}
                  {...register('postcode')}
                  className="uppercase"
                />
                {errors.postcode && (
                  <p className="text-destructive text-sm mt-1">{errors.postcode.message}</p>
                )}
              </div>

              <Button
                type="button"
                onClick={() => goToStep(2)}
                className="w-full bg-accent text-background hover:bg-accent/90 py-6"
              >
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <BedDouble className="h-5 w-5" />
                <span className="text-sm font-medium">Step 2: Property Info</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-3">
                  Number of Bedrooms
                </label>
                <div className="flex gap-2">
                  {bedroomOptions.map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setValue('bedrooms', num, { shouldValidate: true })}
                      className={cn(
                        'flex-1 p-3 rounded-lg border text-sm font-medium transition-colors',
                        watchedValues.bedrooms === num
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border text-card-foreground hover:border-accent/50'
                      )}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                {errors.bedrooms && (
                  <p className="text-destructive text-sm mt-1">{errors.bedrooms.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-3">
                  Property Condition
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {conditionOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setValue('condition', opt.value, { shouldValidate: true })}
                      className={cn(
                        'p-3 rounded-lg border text-sm font-medium transition-colors',
                        watchedValues.condition === opt.value
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border text-card-foreground hover:border-accent/50'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors.condition && (
                  <p className="text-destructive text-sm mt-1">{errors.condition.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-card-foreground mb-3">
                  Timeframe to Sell
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeframeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setValue('timeframe', opt.value, { shouldValidate: true })}
                      className={cn(
                        'p-3 rounded-lg border text-sm font-medium transition-colors',
                        watchedValues.timeframe === opt.value
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border text-card-foreground hover:border-accent/50'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors.timeframe && (
                  <p className="text-destructive text-sm mt-1">{errors.timeframe.message}</p>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => goToStep(1)}
                  className="py-6"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => goToStep(3)}
                  className="flex-1 bg-accent text-background hover:bg-accent/90 py-6"
                >
                  Next Step
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">Step 3: Your Details</span>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                  Full Name
                </label>
                <Input id="name" placeholder="John Smith" {...register('name')} />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="john@example.com" {...register('email')} />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-2">
                  Phone Number
                </label>
                <Input id="phone" type="tel" placeholder="07XXX XXXXXX" {...register('phone')} />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {submitError && (
                <p className="text-destructive text-sm text-center">{submitError}</p>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => goToStep(2)}
                  className="py-6"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-accent text-background hover:bg-accent/90 py-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Get My Free Cash Offer'
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Your information is 100% confidential and will never be shared.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
