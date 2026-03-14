"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const FormContext = React.createContext({});
const FormFieldContext = React.createContext({});
const FormItemContext = React.createContext({});

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  return {
    id: itemContext.id,
    name: fieldContext.name,
    formItemId: `${itemContext.id}-form-item`,
    formDescriptionId: `${itemContext.id}-form-item-description`,
    formMessageId: `${itemContext.id}-form-item-message`,
  };
};

const Form = ({ children, ...props }) => {
  return <FormContext.Provider value={props}>{children}</FormContext.Provider>;
};

const FormField = ({ name, control, render, ...props }) => {
  // Simple field implementation that works with react-hook-form
  const formContext = React.useContext(FormContext);
  const form = control ? { control } : formContext;

  if (form && form.control) {
    const { Controller } = require("react-hook-form");
    return (
      <FormFieldContext.Provider value={{ name }}>
        <Controller name={name} control={form.control} render={render} {...props} />
      </FormFieldContext.Provider>
    );
  }

  return (
    <FormFieldContext.Provider value={{ name }}>
      {render({ field: { name, value: "", onChange: () => {} } })}
    </FormFieldContext.Provider>
  );
};

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();
  return (
    <label
      ref={ref}
      className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { formItemId, formDescriptionId, formMessageId } = useFormField();
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={`${formDescriptionId} ${formMessageId}`}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { formMessageId } = useFormField();
  // Try to get error from field state via react-hook-form
  const fieldContext = React.useContext(FormFieldContext);
  const body = children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive text-red-500", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField, useFormField };
