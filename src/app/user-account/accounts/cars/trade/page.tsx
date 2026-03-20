"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const formSchema = z.object({
  vehicleType: z.string(),
  preferredVehicle: z.string().optional(),
  budget: z.string(),
  tradeIn: z.string(),
  creditRating: z.string(),
  employmentStatus: z.string(),
  incomeType: z.string(),
  hourlyWage: z.string().optional(),
  averageHours: z.string().optional(),
  annualIncome: z.string().optional(),
  companyName: z.string().optional(),
  jobTitle: z.string().optional(),
  homeOwnership: z.string(),
  monthlyPayment: z.string(),
  isCanadianCitizen: z.string(),
  hasDriversLicense: z.string(),
  dob: z.date(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  verificationCode: z.string().min(4, "Please enter the verification code"),
});

type FormData = z.infer<typeof formSchema>;

const carTypes = [
  {
    type: "Car",
    description: "(Sedan & Coupes)",
    image: "/carTrade/car1.png",
  },
  {
    type: "SUV",
    description: "(Sports Utility Vehicle)",
    image: "/carTrade/car2.png",
  },
  {
    type: "Truck",
    description: "(Light - Heavy Duty)",
    image: "/carTrade/car3.png",
  },
  {
    type: "Mini Van",
    description: "(Up to 8 passenger)",
    image: "/carTrade/car4.png",
  },
];

const steps = [
  {
    id: 1,
    title: "Get Pre-Approved for the Car You Want at a Price You Can Afford",
    description: "What type of vehicle are you looking for?",
  },
  {
    id: 2,
    title: "What is your preferred vehicle?",
    description: "It’s okay if you’re unsure, you can skip this step.",
  },
  { id: 3, title: "What is your budget?" },
  { id: 4, title: "Do you have a trade-in?" },
  { id: 5, title: "What is your estimated credit rating?" },
  { id: 6, title: "What is your employment status?" },
  { id: 7, title: "Income Details. Please Select One:" },
  {
    id: 8,
    title: "Income Details.",
    description: "How much do you get paid per hour?",
  },
  { id: 9, title: "What is your annual income before taxes & deductions?" },
  { id: 10, title: "Where do you work?" },
  { id: 11, title: "Do you rent or own your home?" },
  {
    id: 12,
    description1: "Are you a Canadian citizen or permanent resident?",
    description2: "Do you have a valid Canadian driver's license?",
  },
  {
    id: 13,
    title: "Personal Details",
    description: "What is your date of birth?",
    description2: "Almost done! Create your account:",
  },
  {
    id: 14,
    title: "Verification",
    description1: "Please verify your phone number.",
    description2:
      "This helps us confirm your identity and secure your account. When you tap 'Submit' we will text you a verification code. Message and data rates may apply.",
  },
];

export default function CarTradePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const router = useRouter();

  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpVerifyError, setOtpVerifyError] = useState("");

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
      agreeToTerms: false,
    },
  });

  const selectedVehicleType = watch("vehicleType");

  // Send OTP via Twilio
  const sendOtp = async () => {
    const phone = watch("phoneNumber") || "";
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
      setOtpError("Please enter a valid phone number");
      return;
    }
    setOtpSending(true);
    setOtpError("");
    try {
      const phoneE164 = digitsOnly.length === 10 ? `+1${digitsOnly}` : `+${digitsOnly}`;
      const res = await fetch("/api/verify/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phoneE164 }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to send OTP");
      }
      setOtpSent(true);
    } catch (err: any) {
      setOtpError(err.message || "Failed to send verification code");
    } finally {
      setOtpSending(false);
    }
  };

  const processForm = async (data: FormData) => {
    // Verify OTP before submitting
    setOtpVerifyError("");
    try {
      const digitsOnly = (data.phoneNumber || "").replace(/\D/g, "");
      const phoneE164 = digitsOnly.length === 10 ? `+1${digitsOnly}` : `+${digitsOnly}`;
      const res = await fetch("/api/verify/check-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phoneE164, code: data.verificationCode }),
      });
      if (!res.ok) {
        setOtpVerifyError("Invalid verification code. Please try again.");
        return;
      }
    } catch (err) {
      setOtpVerifyError("Failed to verify code. Please try again.");
      return;
    }
    console.log("Form Data:", data);
    setFormData(data);
    router.push("/user-account/accounts/cars");
  };

  const nextStep = async () => {
    const fields: (keyof FormData)[] = [];
    switch (currentStep) {
      case 0:
        fields.push("vehicleType");
        break;
      case 2:
        fields.push("budget");
        break;
      case 3:
        fields.push("tradeIn");
        break;
      case 4:
        fields.push("creditRating");
        break;
      case 5:
        fields.push("employmentStatus");
        break;
      case 6:
        fields.push("incomeType");
        break;
      case 10:
        fields.push("homeOwnership", "monthlyPayment");
        break;
      case 11:
        fields.push("isCanadianCitizen", "hasDriversLicense");
        break;
      case 12:
        fields.push("dob", "firstName", "lastName", "email", "agreeToTerms");
        break;
      case 13:
        fields.push("verificationCode");
        break;
    }

    const isValid = await trigger(fields);

    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div>
      <div className=" h-2 w-full bg-gray-300 block md:hidden">
        <div
          className="h-2 rounded-full bg-blue-600"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="px-6 py-10">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-xl">
            <p className="text-center text-gray-500 text-sm font-light md:text-base md:font-normal mb-4 block md:hidden">
              3 minutes from finish
            </p>
            <div className={`mb-8 ${currentStep >= 3 ? "border" : ""}`}>
              {currentStep >= 3 && (
                <Card className="mb-0 shadow-none rounded-none py-3.5 pb-2 border-none">
                  <CardContent className="flex items-center justify-between p-1 relative">
                    <div className="flex items-start gap-x-2 relative">
                      {selectedVehicleType && (
                        <Image
                          src={
                            carTypes.find((c) => c.type === selectedVehicleType)
                              ?.image || ""
                          }
                          alt={selectedVehicleType}
                          width={80}
                          height={80}
                        />
                      )}
                      <div className="flex flex-col justify-start items-start">
                        <p className="text-sm">{watch("preferredVehicle")}</p>
                        <p className="text-gray-500 text-xs text-light">
                          {watch("budget")}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="link"
                      onClick={() => goToStep(0)}
                      className="absolute right-0 -top-4"
                    >
                      Edit
                    </Button>
                  </CardContent>
                </Card>
              )}
              <div className="hidden md:block">
                <p className="text-center text-gray-500 text-sm font-light md:text-base md:font-normal">
                  3 minutes from finish
                </p>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-300">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit(processForm)}>
                <CardHeader className="!px-0">
                  <CardTitle className="md:text-2xl text-sm text-center text-gray-800 mb-2.5">
                    {steps[currentStep].title}
                  </CardTitle>
                  {steps[currentStep].description && (
                    <CardDescription className="mb-3 text-center font-medium text-gray-400 md:text-sm text-xs">
                      {steps[currentStep].description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="px-0">
                  {currentStep === 0 && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {carTypes.map((car) => (
                        <div
                          key={car.type}
                          className={`cursor-pointer border ${
                            selectedVehicleType === car.type
                              ? "bg-blue-100 border-gray-400 md:bg-transparent md:border-blue-600"
                              : "bg-transparent"
                          }`}
                          onClick={() => setValue("vehicleType", car.type)}
                        >
                          <div className="grid grid-cols-2 md:grid-cols-1 md:items-start justify-between px-2 md:py-4 py-1.5">
                            <Image
                              src={car.image}
                              alt={car.type}
                              width={100}
                              height={100}
                              className="order-2 md:order-1 justify-self-end"
                            />
                            <div className="order-1 md:order-2">
                              <p className="mt-2 font-semibold">{car.type}</p>
                              <p className="text-[10px] text-gray-500">
                                {car.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {currentStep === 1 && (
                    <>
                      <Input
                        placeholder="Model, Years (ex. RAV4 2018-2020)"
                        {...register("preferredVehicle")}
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        If you have more than one choice please type them
                      </p>
                    </>
                  )}
                  {currentStep === 2 && (
                    <RadioGroup
                      onValueChange={(value) => {
                        setValue("budget", value);
                        nextStep();
                      }}
                    >
                      
                      <BudgetRadioOption
                        value="Under $400 / Month"
                        id="r1"
                        label="Under $400 / Month"
                        selectedValue={watch("budget")}
                      />
                      <BudgetRadioOption
                        value="$400-$499 / Month"
                        id="r2"
                        label="$400-$499 / Month"
                        selectedValue={watch("budget")}
                      />
                      <BudgetRadioOption
                        value="$500-$600 / Month"
                        id="r3"
                        label="$500-$600 / Month"
                        selectedValue={watch("budget")}
                      />
                      <BudgetRadioOption
                        value="Over $600 /Month"
                        id="r4"
                        label="Over $600 /Month"
                        selectedValue={watch("budget")}
                      />
                    </RadioGroup>
                  )}
                  {currentStep === 3 && (
                    <RadioGroup
                      onValueChange={(value) => {
                        setValue("tradeIn", value);
                        nextStep();
                      }}
                    >
                      <BudgetRadioOption
                        value="yes"
                        id="t1"
                        label="Yes"
                        selectedValue={watch("tradeIn")}
                      />
                      <BudgetRadioOption
                        value="no"
                        id="t2"
                        label="No"
                        selectedValue={watch("tradeIn")}
                      />
                      <BudgetRadioOption
                        value="unsure"
                        id="t3"
                        label="Unsure"
                        selectedValue={watch("tradeIn")}
                      />
                    </RadioGroup>
                  )}
                  {currentStep === 4 && (
                    <RadioGroup
                      onValueChange={(value) => {
                        setValue("creditRating", value);
                        nextStep();
                      }}
                    >
                      {[
                        "Poor (300-599)",
                        "Fair (600-659)",
                        "Good (660-724)",
                        "Very Good (725-759)",
                        "Excellent (760-900)",
                        "No Credit / Unsure",
                      ].map((rating) => (
                        <BudgetRadioOption
                          key={rating}
                          value={rating}
                          id={rating}
                          label={rating}
                          selectedValue={watch("creditRating")}
                        />
                      ))}
                    </RadioGroup>
                  )}
                  {currentStep === 5 && (
                    <RadioGroup
                      onValueChange={(value) => {
                        setValue("employmentStatus", value);
                        nextStep();
                      }}
                    >
                      {[
                        "Employed",
                        "Self Employed",
                        "Student",
                        "Retired/Pension",
                        "Other",
                      ].map((status) => (
                        <BudgetRadioOption
                          key={status}
                          value={status}
                          id={status}
                          label={status}
                          selectedValue={watch("employmentStatus")}
                        />
                      ))}
                    </RadioGroup>
                  )}
                  {currentStep === 6 && (
                    <RadioGroup
                      onValueChange={(value) => {
                        setValue("incomeType", value);
                        nextStep();
                      }}
                    >
                      {[
                        "I know My Annual Salary",
                        "I know My Hourly Wage",
                        "I know My Monthly Income",
                        "Other",
                      ].map((type) => (
                        <BudgetRadioOption
                          key={type}
                          value={type}
                          id={type}
                          label={type}
                          selectedValue={watch("incomeType")}
                        />
                      ))}
                    </RadioGroup>
                  )}
                  {currentStep === 7 && (
                    <div className="space-y-4">
                      <Input
                        placeholder="$ Hourly Wage"
                        {...register("hourlyWage")}
                      />
                      <div>
                        <Label>Round to Nearest Hour</Label>
                        <Input
                          placeholder="Average Hours Per week"
                          {...register("averageHours")}
                        />
                      </div>
                    </div>
                  )}
                  {currentStep === 8 && (
                    <div>
                      <Label>Round to Nearest Dollar</Label>
                      <Input
                        placeholder="$ Annual Salary"
                        {...register("annualIncome")}
                      />
                    </div>
                  )}
                  {currentStep === 9 && (
                    <div className="space-y-4">
                      <Input
                        placeholder="Company Name"
                        {...register("companyName")}
                      />
                      <Input
                        placeholder="Job Title"
                        {...register("jobTitle")}
                      />
                    </div>
                  )}
                  {currentStep === 10 && (
                    <div>
                      <RadioGroup
                        className="flex"
                        onValueChange={(value) => {
                          setValue("homeOwnership", value);
                        }}
                      >
                        <BudgetRadioOption
                          value="rent"
                          id="rent"
                          label="Rent"
                          selectedValue={watch("homeOwnership")}
                        />
                        <BudgetRadioOption
                          value="own"
                          id="own"
                          label="Own"
                          selectedValue={watch("homeOwnership")}
                        />
                      </RadioGroup>
                      <div className="mt-4">
                        <Label>Round to Nearest Dollar</Label>
                        <Input
                          placeholder="$ Monthly Payment"
                          {...register("monthlyPayment")}
                        />
                      </div>
                    </div>
                  )}
                  {currentStep === 11 && (
                    <div>
                      <p>{steps[currentStep].description1}</p>
                      <RadioGroup
                        className="flex "
                        onValueChange={(value) => {
                          setValue("isCanadianCitizen", value);
                        }}
                      >
                        <BudgetRadioOption
                          value="yes"
                          id="citizen-yes"
                          label="Yes"
                          selectedValue={watch("isCanadianCitizen")}
                        />
                        <BudgetRadioOption
                          value="no"
                          id="citizen-no"
                          label="No"
                          selectedValue={watch("isCanadianCitizen")}
                        />
                      </RadioGroup>
                      <p className="mt-4">{steps[currentStep].description2}</p>
                      <RadioGroup
                        className="flex"
                        onValueChange={(value) => {
                          setValue("hasDriversLicense", value);
                        }}
                      >
                        <BudgetRadioOption
                          value="yes"
                          id="license-yes"
                          label="Yes"
                          selectedValue={watch("hasDriversLicense")}
                        />
                        <BudgetRadioOption
                          value="no"
                          id="license-no"
                          label="No"
                          selectedValue={watch("hasDriversLicense")}
                        />
                      </RadioGroup>
                    </div>
                  )}

                  {currentStep === 12 && (
                    <div className="space-y-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !watch("dob") && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {watch("dob") ? (
                              format(watch("dob"), "PPP")
                            ) : (
                              <span>DD / MM / YYYY</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={watch("dob")}
                            onSelect={(date) => setValue("dob", date as Date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.dob && (
                        <p className="text-sm text-red-500">
                          {errors.dob.message}
                        </p>
                      )}
                      <p>{steps[currentStep].description2}</p>
                      <Input
                        placeholder="First Name"
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                      <Input
                        placeholder="Last Name"
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                      <Input
                        placeholder="Email Address"
                        type="email"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          onCheckedChange={(checked: boolean) =>
                            setValue("agreeToTerms", checked)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Never miss a deal from Autobon
                          </label>
                          <p className="text-sm text-muted-foreground">
                            Sign up for exclusive offers and updates sent to
                            your inbox or phone. Unsubscribe anytime. See our
                            Privacy Policy and Terms for details
                          </p>
                        </div>
                      </div>
                      {errors.agreeToTerms && (
                        <p className="text-sm text-red-500">
                          {errors.agreeToTerms.message}
                        </p>
                      )}
                    </div>
                  )}
                  {currentStep === 13 && (
                    <div className="space-y-4">
                      <p className="mb-2 font-medium">{steps[currentStep].description1}</p>
                      <p className="mb-4 text-sm text-gray-500">
                        {steps[currentStep].description2}
                      </p>

                      {/* Phone Number Input */}
                      <div>
                        <Label className="text-xs uppercase font-bold text-gray-400 mb-1.5 block">Phone Number</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="+1 (XXX) XXX-XXXX"
                            {...register("phoneNumber")}
                            className="flex-1"
                          />
                          <button
                            type="button"
                            onClick={sendOtp}
                            disabled={otpSending || otpSent}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-none hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                          >
                            {otpSending ? "Sending..." : otpSent ? "Code Sent" : "Send Code"}
                          </button>
                        </div>
                        {errors.phoneNumber && (
                          <p className="text-sm text-red-500 mt-1">{errors.phoneNumber.message}</p>
                        )}
                        {otpError && (
                          <p className="text-sm text-red-500 mt-1">{otpError}</p>
                        )}
                        {otpSent && (
                          <p className="text-sm text-green-600 mt-1">Verification code sent to your phone!</p>
                        )}
                      </div>

                      {/* Verification Code Input - shows after OTP sent */}
                      {otpSent && (
                        <div>
                          <Label className="text-xs uppercase font-bold text-gray-400 mb-1.5 block">Verification Code</Label>
                          <Input
                            placeholder="Enter 6-digit code"
                            maxLength={6}
                            {...register("verificationCode")}
                          />
                          {errors.verificationCode && (
                            <p className="text-sm text-red-500 mt-1">{errors.verificationCode.message}</p>
                          )}
                          {otpVerifyError && (
                            <p className="text-sm text-red-500 mt-1">{otpVerifyError}</p>
                          )}
                          <button
                            type="button"
                            onClick={() => { setOtpSent(false); setOtpError(""); }}
                            className="text-blue-600 text-xs mt-2 underline hover:text-blue-800"
                          >
                            Resend code
                          </button>
                        </div>
                      )}

                      <p className="mt-4 text-xs text-gray-500">
                        By clicking &ldquo;Submit&rdquo; I agree to Autobon&apos;s Membership
                        Rules, General Terms of Service and Privacy Policy. I
                        give my consent to Autobon, car dealers and
                        lenders obtaining credit reports about me to facilitate
                        my application for a car loan.
                      </p>
                    </div>
                  )}

                  <div className="mt-8 flex justify-between">
                    {currentStep > 0 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="py-2.5 w-1/3 rounded-none bg-gray-100 text-gray-600 border border-gray-500 cursor-pointer"
                      >
                        Back
                      </button>
                    )}
                    {currentStep === steps.length - 1 ? (
                      <button
                        type="submit"
                        className="py-2.5 bg-blue-500 rounded-none cursor-pointer"
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={nextStep}
                        className={`py-2.5 ${
                          currentStep > 0 ? "max-w-3/5" : "max-w-full"
                        } w-full bg-blue-500 rounded-none text-white cursor-pointer`}
                      >
                        Continue
                      </button>
                    )}
                  </div>
                </CardContent>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BudgetRadioOption({
  value,
  id,
  label,
  selectedValue,
}: {
  value: string;
  id: string;
  label: string;
  selectedValue?: string;
}) {
  return (
    <Label
      htmlFor={id}
      className={cn(
        "flex items-center space-x-2 border px-3.5 py-4.5 w-full",
        selectedValue === value && "border-blue-600 bg-blue-100"
      )}
    >
      <RadioGroupItem value={value} id={id} />
      <span>{label}</span>
    </Label>
  );
}

function CustomRadio({
  value,
  id,
  label,
  selectedValue,
}: {
  value: string;
  id: string;
  label: string;
  selectedValue?: string;
}) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation="horizontal"
      className="cn-field group/field flex w-full cn-field-orientation-horizontal flex-row items-center [&amp;>[data-slot=field-label]]:flex-auto has-[&amp;>[data-slot=field-content]]:items-start has-[&amp;>[data-slot=field-content]]:[&amp;>[role=checkbox],[role=radio]]:mt-px"
    >
      <RadioGroupItem
        value={value}
        id={id}
        className="cn-radio-group-item group/radio-group-item peer relative aspect-square shrink-0 border outline-none after:absolute after:-inset-x-3 after:-inset-y-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <Label htmlFor={id} className="font-medium">
        {label}
      </Label>
    </div>
  );
}